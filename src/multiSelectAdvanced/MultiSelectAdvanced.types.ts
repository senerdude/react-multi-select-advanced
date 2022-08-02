
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
