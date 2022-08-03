import React, { MutableRefObject, useLayoutEffect, useRef, useState, KeyboardEvent, useEffect } from 'react'
import './MultiSelectAdvanced.scss'

// Options interface
export interface MultiSelectAdvancedOption {
	label: string
	value: string | number
	matchRank?: number | undefined
}

// Component Interface
export interface MultiSelectAdvancedProps {
	// Component
	className?: string
	options?: MultiSelectAdvancedOption[]
	selectedValues?: MultiSelectAdvancedOption[]
	// Input
	disabled?: boolean
	inputDelay?: number
	placeholder?: string
	// Filter
	filterShowLoading?: boolean
	filterLimit?: number
	filterHighlightKeyword?: boolean
	filterOrderByMatchRank?: boolean
	// Selected Items
	selectionLimit?: number
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
	// Callback
	onChange?: (value: MultiSelectAdvancedOption[]) => void
}

let handleFilterTimeout: NodeJS.Timeout
const MultiSelectAdvanced = (props: MultiSelectAdvancedProps) => {

	// Destruct Props and set default values
	const {
		// Component
		className,
		options= [], 
		selectedValues= [],
		// Input
		disabled,
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
		selectionLabelMaxWidth= 100,
		selectionShowClear = false,
		selectionShowDeleteButton = true,
		// Language
		languageOverwrite,
		// Custom components
		LoadingComponent,
		ClearButtonComponent,
		DeleteButtonComponent,
		MoreItemsComponent,
		// Callback
		onChange
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

	// Classes
	const classNames = 'MultiSelectAdvanced' +
	`${' MultiSelectAdvanced--' + verticalDirection}` +
	`${' MultiSelectAdvanced--' + horizontalDirection}` +
	`${filterLoading ? ' MultiSelectAdvanced--loading' : ''}` +
	`${disabled ? ' MultiSelectAdvanced--disabled' : ''}` +
	`${filteredList.length > 0 ? ' MultiSelectAdvanced--open' : ''}` +
	`${className !== undefined ? ' ' + className : ''}`

	// Default Translation
	let languageDefaults = {
		selectionLimitReached : 'Max selection limit reached.',
		selectionShowClearText: 'Clear All',
		selectionDeleteTitle: 'Remove selection',
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
			const tmpVerticalDirection = innerHeight <= menuHeight ? 'bottom' : (innerHeight - menuHeight) >= (wrapperTop + wrapperHeight) ? 'bottom' : 'top'
			setVerticalDirection(tmpVerticalDirection)

			// Horizontal Direction
			const tmpHorizontalDirection = innerWidth <= menuWidth ? 'left' : (innerWidth - menuWidth) >= wrapperLeft ? 'left' : 'right'
			setHorizontalDirection(tmpHorizontalDirection)

			// Set Menu Position
			suggestionsRef.current.setAttribute('style', `${tmpVerticalDirection}: -${menuHeight + 1}px`)
		}
	})

	// Disable input if selection limit provided
	useEffect(() => {
		if (selectionLimit && selectionLimit <= selectedItems.length) {
			setIsInputDisabled(true)
			setPlaceholderText(languageDefaults.selectionLimitReached)
		} else {
			setIsInputDisabled(false)
			setPlaceholderText(placeholder)
		}
	}, [selectionLimit, selectedItems])

	// If selected items changed and not same with default values trigger onChange
	useEffect(() => {
		if (onChange && JSON.stringify(selectedItems) !== JSON.stringify(selectedValues)) onChange(selectedItems)
	}, [selectedItems])

	// Add option as selected
	const addSelection = ( item : MultiSelectAdvancedOption ) => {

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
		
		if (e.key === 'ArrowDown' && filteredList.length > 0) {
			if (e.target?.nextSibling !== null) {
				const nextSibling = e.target?.nextElementSibling as HTMLLIElement	
				nextSibling && nextSibling?.focus()
			}
		}

		if (e.key === 'ArrowUp' && filteredList.length > 0) {
			if (e.target?.previousSibling !== null) {
				const prevSibling = e.target?.previousElementSibling as HTMLLIElement
				prevSibling && prevSibling?.focus()
			}
		}

		if (e.key === 'Enter' && filteredList.length > 0) {
			e.target.click()
		}
	}

	// Highlight keyword on results
	const highlightText = (text= '') => {
		if (!filterKeyword.trim()) return text
		const regex = new RegExp(`(${filterKeyword})`, 'gi')
		const parts = text.split(regex)
		return parts.filter(String).map((part, i) => <React.Fragment key={i}>{ regex.test(part)?<mark>{part}</mark>:part}</React.Fragment>)
	}

	// Search
	const handleFilter = (e: { target: HTMLInputElement }) => {

		// Clear timeout
		clearTimeout(handleFilterTimeout) 

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

		// If there is no options provided
		if (options.length <= 0) return

		// Show loading state
		setFilterLoading(true)

		// Debounce
		// eslint-disable-next-line no-return-assign
		return handleFilterTimeout = setTimeout(() => {

			// Filter results by provided keywords
			const tmpList = []
			for (let i = 0; i < options.length; i++) {
				// Item
				const option = options[i] as MultiSelectAdvancedOption

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

					if (option.label.toLowerCase().includes(keyword.toLowerCase())) tmpList.push(option)

				}

				// Finally, set data if limit reached or all records checked
				if (options.length - 1 === i) {

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

		}, inputDelay)
	}

	// Loading Indicator
	const LoadingIndicator = () =>  {
		// If filter loading
		if (filterShowLoading) {
			return <div className="MultiSelectAdvanced_Loading">
				{ LoadingComponent ? <LoadingComponent /> : <div className="MultiSelectAdvanced_LoadingSpinner" /> }
			</div>
		}

		return null
	}

	// Delete Button
	const DeleteButton = (props: { item: MultiSelectAdvancedOption }) => {
		if (selectionShowDeleteButton) {
			return <span className="MultiSelectAdvanced_SelectionList_DeleteButtonContainer" onClick={() => removeSelection(props.item)} title={languageDefaults.selectionDeleteTitle}>
				{ DeleteButtonComponent ? <DeleteButtonComponent /> : <span className="MultiSelectAdvanced_DeleteButton"></span> }
			</span>
		}

		return null
	}

	// X More item label
	const MoreItems = () => {

		if (selectionMaxVisibleItems && selectedItems.length > selectionMaxVisibleItems) {
			return <li className="MultiSelectAdvanced_SelectionList_More">
				{ MoreItemsComponent ?  <MoreItemsComponent>{ (selectedItems.length - selectionMaxVisibleItems).toString() }</MoreItemsComponent> : <span className="MultiSelectAdvanced_MoreItem">{languageDefaults.moreItemsText.replace('{{count}}', (selectedItems.length - selectionMaxVisibleItems).toString() )}</span> }
			</li>
		}

		return null
	}

	// Clear Button
	const ClearButton = () => {
		// IF button enabled and min 2 items selected
		if (selectionShowClear && selectedItems.length > 1) {
			return <li className="MultiSelectAdvanced_SelectionList_ClearAllButtonContainer" tabIndex={0} onKeyDown={e => clearSelectionKey(e)} onClick={clearSelection}>
				{ ClearButtonComponent ? <ClearButtonComponent /> : <span className="MultiSelectAdvanced_ClearAllButton">{languageDefaults.selectionShowClearText}</span> }
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
				
				selectedItemsList.push(<li className="MultiSelectAdvanced_SelectionList_Item" key={selectedItem.value} tabIndex={0} onKeyDown={e => removeSelectionKey(e, selectedItem)}>
					<span style={{ maxWidth: selectionLabelMaxWidth }}>{selectedItem.label}</span> <DeleteButton item={selectedItem} />
				</li>)

			}

			return 	<ul className="MultiSelectAdvanced_SelectionList">
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
			return <div className="MultiSelectAdvanced_FilterList" ref={suggestionsRef}>

				{
					!filterLoading && <ul ref={suggestionsListRef}>
						
						{
							filteredList.map((filteredItem, i) => 
								<li tabIndex={0} onKeyDown={handleNavigate} onClick={() => addSelection(filteredItem)} key={i.toString() + filteredItem.value}>
									{ filterHighlightKeyword ? highlightText(filteredItem.label) : filteredItem.label }
								</li>)
						}

					</ul>
				}
			</div>
		} 

		return null
	}

	// Render component
	return <div className={classNames}>

		<div className="MultiSelectAdvanced_Selection" ref={selectionRef}>

			<div className="MultiSelectAdvanced_FilterInput" ref={inputContainerRef}>

				<input type="text" onChange={handleFilter} onKeyDown={handleInputKeyDown} value={filterKeyword} placeholder={placeholderText} ref={inputRef} disabled={isInputDisabled || disabled} />

				<LoadingIndicator />

				<FilterList />

			</div>

		</div>

		<SelectionList />

	</div>
}

export default MultiSelectAdvanced
