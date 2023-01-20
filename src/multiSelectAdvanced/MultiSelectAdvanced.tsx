import React, { MutableRefObject, useLayoutEffect, useRef, useState, KeyboardEvent, useEffect, forwardRef, useImperativeHandle } from 'react'
import './MultiSelectAdvanced.scss'

// Options interface
export interface MultiSelectAdvancedOption {
	label: string
	value: string | number
	disabled?: boolean | string
	matchRank?: number
}

// Component Interface
export interface MultiSelectAdvancedProps {
	// Component
	className?: string
	options?: MultiSelectAdvancedOption[]
	selectedValues?: MultiSelectAdvancedOption[]
	// Input
	label?: string,
	name?: string,
	id?: string,
	disabled?: boolean
	invalid?: boolean
	inputDelay?: number
	placeholder?: string
	// Filter
	filterShowLoading?: boolean
	filterLimit?: number
	filterHighlightKeyword?: boolean
	filterOrderByMatchRank?: boolean
	// Selected Items
	selectionLimit?: number
	hideInputOnSelectionLimit?: boolean
	selectionMaxVisibleItems?: number
	selectionLabelMaxWidth?: number
	selectionShowClear?: boolean
	selectionShowDeleteButton?: boolean
	// Language
	languageOverwrite?: object
	// Custom components
	LoadingComponent?: React.ElementType 
	DeleteButtonComponent?: React.ElementType 
	ClearButtonComponent?: React.ElementType 
	MoreItemsComponent?: React.ElementType
	// Callback Type
	isServerSide?: boolean
	// Callback
	onChange?: (value: MultiSelectAdvancedOption[]) => void
	onKeywordChange?: (keyword: string) => Promise<MultiSelectAdvancedOption[]>
}

let handleInputDelayTimeout: NodeJS.Timeout
const MultiSelectAdvanced = forwardRef<HTMLInputElement, MultiSelectAdvancedProps>((props, ref) => {

	// Generates unique id in case name or id not provided.
	const uniqueId = () => {
		return 'id' + parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(5).toString().replace('.', ''))
	}

	// Destruct Props and set default values
	const {
		// Component
		className,
		options= [], 
		selectedValues= [],
		// Input
		label,
		name= uniqueId(),
		id= name || uniqueId(),
		disabled,
		invalid,
		inputDelay= 1000,
		placeholder,
		// Filter
		filterShowLoading= true,
		filterLimit,
		filterHighlightKeyword = false, // Suggested only use with low filter limit value for performance concerns
		filterOrderByMatchRank = false, // Suggested only use with less then 1000 records
		// Selected Items
		selectionLimit,
		selectionMaxVisibleItems,
		hideInputOnSelectionLimit= false,
		selectionLabelMaxWidth= 100,
		selectionShowClear= false,
		selectionShowDeleteButton= true,
		// Language
		languageOverwrite,
		// Custom components
		LoadingComponent,
		ClearButtonComponent,
		DeleteButtonComponent,
		MoreItemsComponent,
		// Callback Type
		isServerSide= false,
		// Callback
		onChange,
		onKeywordChange
	} = props

	// Local State
	const [selectedItems, setSelectedItems] = useState(selectedValues) // Selected value(s)
	const [filteredList, setFilteredList] = useState([] as MultiSelectAdvancedOption[]) // Filtered options
	const [filterKeyword, setFilterKeyword] = useState('') // Filtered options
	const [filterLoading, setFilterLoading] = useState(false) // Filtered options
	const [isInputDisabled, setIsInputDisabled] = useState(false) // Input state
	const [verticalDirection, setVerticalDirection] = useState('bottom') // Default: bottom
	const [horizontalDirection, setHorizontalDirection] = useState('left') // Default: left
	const [placeholderText, setPlaceholderText] = useState(placeholder)

	// References
	const selectionRef = useRef() as MutableRefObject<HTMLDivElement>
	const suggestionsRef = useRef() as MutableRefObject<HTMLDivElement>
	const suggestionsListRef = useRef() as MutableRefObject<HTMLUListElement>
	const inputContainerRef = useRef() as MutableRefObject<HTMLDivElement>
	const inputRef = useRef() as MutableRefObject<HTMLInputElement>

	useImperativeHandle(ref, () => inputRef.current)

	// Classes
	const classNames = 'Msa' +
	`${' Msa--' + verticalDirection}` +
	`${' Msa--' + horizontalDirection}` +
	`${filterLoading? ' Msa--loading' : ''}` +
	`${disabled? ' Msa--disabled' : ''}` +
	`${filteredList.length > 0 ? ' Msa--open' : ''}` +
	`${className !== undefined ? ' ' + className : ''}`

	// Default Translation
	let languageDefaults = {
		selectionLimitReached : 'Max selection limit reached.',
		selectionShowClearTitle: 'Clear All',
		selectionDeleteTitle: 'Remove',
		moreItemsText: '{{count}} more items...'
	}

	// Merge language translation
	useEffect(() => {
		if (languageOverwrite) languageDefaults = { ...languageDefaults,  ...languageOverwrite }
	}, [languageOverwrite])

	// Calculate correct direction and position of suggestions list
	useLayoutEffect(() => {
		if (selectionRef.current && suggestionsRef.current) {
			// Wrapper position
			const { top: wrapperTop, left: wrapperLeft, height: wrapperHeight } = selectionRef.current.getBoundingClientRect()

			// Menu width, height
			const { width: menuWidth, height: menuHeight } = suggestionsRef.current.getBoundingClientRect()

			// Inner window position
			const { innerWidth, innerHeight } = window

			// Vertical Direction
			const tmpVerticalDirection = wrapperTop <= menuHeight ? 'bottom' : ((innerHeight - menuHeight) >= (wrapperTop + wrapperHeight) ? 'bottom' : 'top')
			setVerticalDirection(tmpVerticalDirection)

			// Horizontal Direction
			const tmpHorizontalDirection = innerWidth <= menuWidth ? 'left' : (innerWidth - menuWidth) >= wrapperLeft ? 'left' : 'right'
			setHorizontalDirection(tmpHorizontalDirection)

			// Set Menu Position
			suggestionsRef.current.setAttribute('style', `${tmpVerticalDirection}: -${menuHeight + 2}px`)
		}
	})

	// Disable input if selection limit provided
	useEffect(() => {
		if (selectionLimit && selectionLimit <= selectedItems.length) {
			setIsInputDisabled(true)
			if (hideInputOnSelectionLimit) {
				inputContainerRef.current.style.display = 'none'
			} else {
				setPlaceholderText(languageDefaults.selectionLimitReached)
			}
		} else {
			setIsInputDisabled(false)
			if (hideInputOnSelectionLimit) {
				inputContainerRef.current.removeAttribute('style')
			} else {
				setPlaceholderText(placeholder)
			}
		}
	}, [selectionLimit, selectedItems])

	// If selected items changed and not same with default values trigger onChange
	useEffect(() => {
		if (onChange && JSON.stringify(selectedItems) !== JSON.stringify(selectedValues)) onChange(selectedItems)
	}, [selectedItems])

	// Add option as selected
	const addSelection = ( item : MultiSelectAdvancedOption ) => {

		// Don't add if item disabled
		if ((item?.disabled === 'false') !== Boolean(item?.disabled)) return false

		// Clear filtered items
		setFilteredList([])

		// Reset keyword input
		setFilterKeyword('')

		// Update selected items
		setSelectedItems([...selectedItems, item])

		// Set focus back to input
		inputRef.current.focus()
	}

	// Remove selected option
	const removeSelection = ( item : MultiSelectAdvancedOption ) => {

		if (disabled) return false

		// Remove item
		setSelectedItems(selectedItems.filter(option => JSON.stringify(option) !== JSON.stringify(item)))

		// Set focus back to input
		inputRef.current.focus()
	}

	const removeSelectionKey = (e: KeyboardEvent<HTMLLIElement>, item : MultiSelectAdvancedOption) => {
		if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Enter') removeSelection(item)
	}

	// Clear selected options, input and filter results
	const clearSelection = () => {

		if (disabled) return false

		// Clean selections
		setSelectedItems([])

		// Clear filtered items
		setFilteredList([])

		// Reset keyword input
		setFilterKeyword('')

		// Set focus back to input
		inputRef.current.focus()
	}

	const clearSelectionKey = (e: KeyboardEvent<HTMLLIElement>) => {
		if (e.key === 'Enter') clearSelection()
	}

	// Handle input keys
	const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {

		// Delete last item in the selection list if there is no character and user hit the backspace
		if (e.key === 'Backspace' && filterKeyword === '') setSelectedItems([...selectedItems.slice(0, -1)])

		// When user press key arrow down jump focus to first element
		if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && filteredList.length > 0 && suggestionsListRef.current) {
			const targetElement = suggestionsListRef.current.firstElementChild as HTMLLIElement
			targetElement.focus()
		}

		// Clear input if user press Escape button
		if (e.key === 'Escape' && filterKeyword !== '') {

			// Clear filtered items
			setFilteredList([])

			// Reset keyword input
			setFilterKeyword('')
		}
	}

	// Handle list keys
	const handleNavigate = (e: KeyboardEvent<HTMLLIElement>) => {

		// Prevent default browser behaviour
		e.preventDefault()

		const target = e.target as HTMLElement
		// const targetButton = e.target as HTMLElement
		
		if (e.key === 'ArrowDown' && filteredList.length > 0) {
			if (target?.nextSibling !== null) {
				const nextSibling = target?.nextElementSibling as HTMLLIElement	
				nextSibling && nextSibling?.focus()
			}
		}

		if (e.key === 'ArrowUp' && filteredList.length > 0) {
			if (target?.previousSibling !== null) {
				const prevSibling = target?.previousElementSibling as HTMLLIElement
				prevSibling && prevSibling?.focus()
			}
		}

		if (e.key === 'Enter' && filteredList.length > 0) {
			target.click()
		}
	}

	// Highlight keyword on results
	const highlightText = (text= '') => {
		if (!filterKeyword.trim()) return text
		const regex = new RegExp(`(${filterKeyword})`, 'gi')
		const parts = text.split(regex)
		return parts.filter(String).map((part, i) => <React.Fragment key={i}>{ regex.test(part)?<mark>{part}</mark>:part}</React.Fragment>)
	}

	// Handle keyword change
	const handleChange = (e: { target: HTMLInputElement }) => {

		// Clear timeout
		clearTimeout(handleInputDelayTimeout)

		// Keyword 
		const keyword = e?.target?.value || ''

		// Update Input
		setFilterKeyword(keyword)

		// If there is no keyword
		if (keyword.trim() === '') {
			// Clear list
			setFilteredList([])

			// Set Loading false
			setFilterLoading(false)

			return null
		}

		// Show loading state
		setFilterLoading(true)

		// Debounce keystrokes
		handleInputDelayTimeout = setTimeout(async () => {

			// If it's server side and onKeywordChange defined
			if (isServerSide && onKeywordChange) {

				const serverResponse = await onKeywordChange(keyword)

				if (Array.isArray(serverResponse) && serverResponse?.length) {

					handleFilter(serverResponse, keyword)

				} else {
					// Set Loading false
					setFilterLoading(false)
					console.warn('No results found.')
				}
			
			// If options provided by props
			} else if (options && options?.length > 0) {
				handleFilter(options, keyword)
			} else {
				// Set Loading false
				setFilterLoading(false)
				console.warn('No results found.')
			}

		}, inputDelay)

	}

	// Filter
	const handleFilter = (optionsList: MultiSelectAdvancedOption[], keyword:string) => {

		// Filter results by provided keywords
		const tmpList = []
		for (let i = 0; i < optionsList.length; i++) {

			// Item
			const option = optionsList[i] as MultiSelectAdvancedOption

			// Check data is properly structured
			if (!option?.value || !option.label) {
				
				console.warn('Data should have label and value attributes')

				break
			}

			// Break early if reach the result limit. 
			// If filterOrderByMatchRank true, filter limit will applied the end of search.
			// Therefore filterOrderByMatchRank would be slower depending on total records.
			if (!filterOrderByMatchRank && filterLimit && tmpList.length >= filterLimit) {

				// Push the results
				setFilteredList(keyword.length > 0 ? tmpList : [] as MultiSelectAdvancedOption[])
				
				// Set Loading false
				setFilterLoading(false)

				break
			}

			// Skip loop if item in selected items
			let isItemExist = false
			for (let s = 0; s < selectedItems.length; s++) {
				if (JSON.stringify(option.value) === JSON.stringify(selectedItems[s].value)) {
					isItemExist = true
					break
				}
			}
			if (isItemExist) continue

			// Match keyword and rank them
			if (filterOrderByMatchRank) {

				const startsWithRegex = new RegExp(`^${keyword}`, 'i') // Value starts with keyword
				const isStartsWith = option.label.match(startsWithRegex)
				if (isStartsWith) {
					option.matchRank = 1 
					tmpList.push(option)
				} else {
					const includeRegex = new RegExp(`${keyword}`, 'i') // Value includes keyword
					const isIncluded = option.label.match(includeRegex)
					if (isIncluded) {
						option.matchRank = 2
						tmpList.push(option)
					}
				}

			} else {

				if (option?.label?.toLowerCase().includes(keyword.toLowerCase())) tmpList.push(option)

			}

			// Finally, set data if limit reached or all records checked
			if (optionsList.length - 1 === i) {

				// Sort result by rank if enabled
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				if (filterOrderByMatchRank) tmpList.sort((a,b) => a.matchRank! - b.matchRank!)

				// Limit the output if filter limit defined
				if (filterLimit && tmpList.length >= filterLimit) tmpList.length = filterLimit

				// Push the results
				setFilteredList(keyword.length > 0 ? tmpList : [] as MultiSelectAdvancedOption[])

				// Set Loading false
				setFilterLoading(false)

				break
			}
		}
	}

	// Loading Indicator
	const LoadingIndicator = () =>  {
		// If filter loading
		if (filterShowLoading) {
			return <div className="Msa_Loading">
				{ LoadingComponent ? <LoadingComponent /> : <div className="Msa_LoadingSpinner" /> }
			</div>
		}

		return null
	}

	// Delete Button
	const DeleteButton = (props: { item: MultiSelectAdvancedOption }) => {
		if (selectionShowDeleteButton) {
			return <span role="button" className="Msa_SelectionList_DeleteButtonContainer" onClick={() => removeSelection(props.item)} title={languageDefaults.selectionDeleteTitle}>
				{ DeleteButtonComponent ? <DeleteButtonComponent /> : <span className="Msa_DeleteButton"></span> }
			</span>
		}

		return null
	}

	// X More item label
	const MoreItems = () => {

		if (selectionMaxVisibleItems && selectedItems.length > selectionMaxVisibleItems) {
			return <li className="Msa_SelectionList_More">
				{ MoreItemsComponent ?  <MoreItemsComponent>{ (selectedItems.length - selectionMaxVisibleItems).toString() }</MoreItemsComponent> : <span className="Msa_MoreItem">{languageDefaults.moreItemsText.replace('{{count}}', (selectedItems.length - selectionMaxVisibleItems).toString() )}</span> }
			</li>
		}

		return null
	}

	// Clear Button
	const ClearButton = () => {

		if (disabled) return null

		// IF button enabled and min 2 items selected
		if (selectionShowClear && selectedItems.length > 1) {
			return <li role="button" className="Msa_SelectionList_ClearAllButtonContainer" tabIndex={0} onKeyDown={e => clearSelectionKey(e)} onClick={clearSelection} title={languageDefaults.selectionShowClearTitle}>
				{ 
					ClearButtonComponent ? 
						<ClearButtonComponent /> : 
						<svg className="Msa_ClearAllButton" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M576 384C576 419.3 547.3 448 512 448H205.3C188.3 448 172 441.3 160 429.3L9.372 278.6C3.371 272.6 0 264.5 0 256C0 247.5 3.372 239.4 9.372 233.4L160 82.75C172 70.74 188.3 64 205.3 64H512C547.3 64 576 92.65 576 128V384zM271 208.1L318.1 256L271 303C261.7 312.4 261.7 327.6 271 336.1C280.4 346.3 295.6 346.3 304.1 336.1L352 289.9L399 336.1C408.4 346.3 423.6 346.3 432.1 336.1C442.3 327.6 442.3 312.4 432.1 303L385.9 256L432.1 208.1C442.3 199.6 442.3 184.4 432.1 175C423.6 165.7 408.4 165.7 399 175L352 222.1L304.1 175C295.6 165.7 280.4 165.7 271 175C261.7 184.4 261.7 199.6 271 208.1V208.1z"/></svg> } {/* Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
			</li>
		}

		return null
	}

	// Selection List
	const SelectionList = () => {
		if (selectedItems.length > 0) {

			const selectedItemsList = []

			for (let i = 0; i < selectedItems.length; i++) {

				const selectedItem = selectedItems[i]

				if (selectionMaxVisibleItems && selectionMaxVisibleItems <= i) break
				
				selectedItemsList.push(<li className={`Msa_SelectionList_Item${selectionShowDeleteButton && !disabled?' Msa_SelectionList_Item--showDelete':''}`} key={selectedItem.value} tabIndex={0} onKeyDown={e => removeSelectionKey(e, selectedItem)}>
					<span style={{ maxWidth: selectionLabelMaxWidth }}>{selectedItem.label}</span> { !disabled && <DeleteButton item={selectedItem} /> }
				</li>)

			}

			return 	<ul className="Msa_SelectionList">

				{ selectedItemsList }

				<MoreItems />

				<ClearButton />

			</ul>
		}

		return null
	}

	// Filtered List
	const FilterList = () => {
		if (!filterLoading) {
			return <div className="Msa_FilterList" ref={suggestionsRef}>

				{
					!filterLoading && <ul ref={suggestionsListRef}>
						
						{
							filteredList.map((filteredItem, i) => 
								<li role="button" className={`Msa_FilterList_Item${(filteredItem?.disabled === 'false') !== Boolean(filteredItem?.disabled) ? ' Msa_FilterList_Item--disabled':''}`} tabIndex={0} onKeyDown={handleNavigate} onClick={() => addSelection(filteredItem)} key={i.toString() + filteredItem.value}>
									{ filterHighlightKeyword ? highlightText(filteredItem.label) : filteredItem.label }
								</li>
							)
						}

					</ul>
				}
			</div>
		} 

		return null
	}

	// Render component
	return <div className={classNames}>

		<div className="Msa_Selection" ref={selectionRef}>

			{ label && <label className="Msa_Label" htmlFor={name}>{label}</label> }

			<div className={`Msa_FilterInput${invalid?' Msa_FilterInput--invalid':''}`} ref={inputContainerRef}>

				<input name={name} id={id} type="text" onChange={handleChange} onKeyDown={handleInputKeyDown} value={filterKeyword} placeholder={placeholderText} ref={inputRef} disabled={isInputDisabled || disabled} />

				<LoadingIndicator />

				<FilterList />

			</div>

		</div>

		<SelectionList />

	</div>
})

MultiSelectAdvanced.displayName = 'MultiSelectAdvanced'
export default MultiSelectAdvanced
