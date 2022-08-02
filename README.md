# react-multi-select-advanced

## Description   

React multi select component can handle huge data easily with various functionality.

## Getting Started 

## 1. Installation
```
npm install react-multi-select-advanced
```

----

## 2. Basic Usage
```js
import { useState } from 'react'
import MultiSelectAdvanced from 'react-multi-select-advanced'
import { MultiSelectAdvancedOption } from 'react-multi-select-advanced/dist/multiSelectAdvanced/MultiSelectAdvanced.types'

const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 }
]

const selectedValues = [
  { label: 'Option 2', value: 2 }
]

function App() {

  // Pre-select or not
  const [selectedItems, setSelectedItems] = useState(selectedValues as MultiSelectAdvancedOption[])

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
|:--------- | :---- | :----   |:----  |
| `className` | `string` |  | Options data
| `options` | `array` | `[]` | Options data
| `selectedValues` | `array` | `[]` | Pre-selected options
| Input
| `disabled` | `boolean` |  | Disables search input
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
| `LoadingComponent` | `JSX Element` | | Custom loading indicator
| `ClearButtonComponent` | `JSX Element` | | Custom clear all button
| `DeleteButtonComponent` | `JSX Element` | | Custom delete button
| `MoreItemsComponent` | `JSX Element` | | Custom more items
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

### Happy Building ♡
