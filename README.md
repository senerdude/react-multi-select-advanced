# react-multi-select-advanced

## Description   

The React Multi-select Advanced component is a powerful tool that can handle massive data sets without any struggle.
It comes with various customizable features that make it very easy to use, so you can tailor it to your specific needs.

If you like it put a ⭐ on it. 👉 [GitHub](https://github.com/senerdude/react-multi-select-advanced).

## Features

- Typescript: Types included, ensuring compatibility with your project.
- Zero dependency: No need to worry about other libraries.
- Powerful: Handles massive data sets without problem.
- Responsive: Ensures that the component fit all device resolutions depending on parent component.
- Customizable: Allow you to add custom class and change button, icons as components.
- Auto direction: Ensures that list items open in the correct direction based on their placement on the page.
- Localization: Easy to integrate any language.
- Keyboard navigation: Supports keyboard arrows, tabs.
- Highlight keywords: Highlights entered text on list results.
- Match priority: If label starts with keyword, shows first.
- [Storybook](https://lifetoweb.com/react-multi-select-advanced/) : Document and test playground.

## Getting Started 

## 1. Installation

npm
```
npm install react-multi-select-advanced
```

yarn
```
yarn add react-multi-select-advanced
```

----

## 2. Basic Usage

```js
import { useState } from 'react'

// Import component / and types if need it.
import MultiSelectAdvanced, { MultiSelectAdvancedOption } from 'react-multi-select-advanced'

// Mock data
const options = [
	{ label: 'Istanbul', value: 'Istanbul' },
	{ label: 'Paris', value: 'Paris' },
	{ label: 'London', value: 'London' },
	{ label: 'Buenos Aires', value: 'Buenos Aires' },
	{ label: 'Canberra', value: 'Canberra' },
	{ label: 'Havana', value: 'Havana' },
	{ label: 'Helsinki', value: 'Helsinki', disabled: true },
	{ label: 'Tokyo', value: 'Tokyo' },
	{ label: 'Amsterdam', value: 'Amsterdam' },
	{ label: 'Moscow', value: 'Moscow' },
	{ label: 'Stockholm', value: 'Stockholm', disabled: true },
	{ label: 'Singapore', value: 'Singapore' },
	{ label: 'Lisbon', value: 'Lisbon' },
	{ label: 'Oslo', value: 'Oslo' },
	{ label: 'Reykjavík', value: 'Reykjavík' }
]

// Mock pre selected data
const selectedValues = [
	{ label: 'London', value: 'London' },
	{ label: 'Tokyo', value: 'Tokyo' }
]

// App
function App() {

	// Pre-select or not
	const [selectedItems, setSelectedItems] = useState(selectedValues as MultiSelectAdvancedOption[])

	// Onchange handler
	const handleChange = (selectedItems: MultiSelectAdvancedOption[]) => setSelectedItems(selectedItems)

	return (
		<div className="App">

			<MultiSelectAdvanced options={options} selectedValues={selectedItems} onChange={handleChange} />
		
		</div>
  	)
}

export default App
```

----

## 3. Props

| Prop  | Type  | Default | Description |
|:--------- | :---: | :---:   |:----  |
| `className` | `string` |  | Options data
| `options` | `array` | `[]` | Options data
| `selectedValues` | `array` | `[]` | Pre-selected options
| Input
| `name` | `string` | Unique Id | input name
| `id` | `string` | name or Unique Id | input id
| `label` | `string` |  | Add label to top of input
| `disabled` | `boolean` |  | Disables search input
| `invalid` | `boolean` |  | If true border color turns to red
| `inputDelay` | `number` | `1000` | Input delay (ms)
| `placeholder` | `string` |  | Input placeholder
| Filter
| `filterShowLoading` | `boolean` | `true` | Show/hide loading indicator or component
| `filterLimit` | `number` | | Maximum dropdown display limit
| `filterHighlightKeyword` | `boolean` | `false` | Highlights matching keyword. Suggested to use with filterLimit because of performance.
| `filterOrderByMatchRank` | `boolean` | `false` | Gives match score if label starts with search keyword. Suggested to use with filterLimit because of performance.
| Selected Items
| `selectionLimit` | `number` |  | Limits selected items
| `selectionMaxVisibleItems` | `number` |  | Limits selected display items and adds 'x more..' or MoreItemsComponent after items.
| `selectionLabelMaxWidth` | `number` | | Limits max width of display label and wrap with ellipsis
| `selectionShowClear` | `boolean` | `false` | Shows clear all button after selected items if selected count more than 2
| `selectionShowDeleteButton` | `boolean` | `true` | Shows remove button inside the selected items
| Language
| `languageOverwrite` | `object` | | Please see 4. Localization
| Custom components 
| `LoadingComponent` | `JSX.Element` | | Custom loading indicator
| `ClearButtonComponent` | `JSX.Element` | | Custom clear all button
| `DeleteButtonComponent` | `JSX.Element` | | Custom delete button
| `MoreItemsComponent` | `JSX.Element` | | Custom more items
| Callback
| `onChange` | `function` |  | Callback function will invoked on selected options are changed.
----

## 4. Localization

Easy to localize component by passing prop `languageOverwrite`. Default values are as below.

```json
{
	"selectionLimitReached" : "Max selection limit reached.", 
	"selectionShowClearText": "Clear All", 
	"selectionDeleteTitle": "Remove selection", 
	"moreItemsText": "{{count}} more items..." 
}
```

## 5. License

MIT

### Happy coding 😊
