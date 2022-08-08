# react-multi-select-advanced

[![Open Source](https://badgen.net/badge/open-source/❤%EF%B8%8F/green?icon=github)](https://github.com/senerdude/react-multi-select-advanced) [![Top Language](https://img.shields.io/github/languages/top/senerdude/react-multi-select-advanced)](https://github.com/senerdude/react-multi-select-advanced) [![MIT License](https://img.shields.io/github/license/senerdude/react-multi-select-advanced)](https://github.com/senerdude/react-multi-select-advanced) [![Issues](https://img.shields.io/github/issues-raw/senerdude/react-multi-select-advanced)](https://github.com/senerdude/react-multi-select-advanced/issues) [![Minified Size](https://img.shields.io/bundlephobia/min/react-multi-select-advanced)](https://www.npmjs.com/package/react-multi-select-advanced) [![Downloads](https://img.shields.io/npm/dt/react-multi-select-advanced)](https://www.npmjs.com/package/react-multi-select-advanced) [![Storybook](https://img.shields.io/badge/Storybok-Playground-ff69b4)](https://lifetoweb.com/react-multi-select-advanced/)

## Description

The React Multi-select Advanced component is a powerful tool that can handle massive data sets without any struggle.
It comes with various customizable features that make it very easy to use, so you can tailor it to your specific needs.

Like Beyoncé said, If you liked it, then you should a put a ⭐ on it. ➽ [![Stars](https://img.shields.io/github/stars/senerdude/react-multi-select-advanced?style=social)](https://github.com/senerdude/react-multi-select-advanced)

## Features

<div style="font-size: 16px">

- **Typescript**: Types included, ensuring compatibility with your project.
- **Zero dependency**: No need to worry about other libraries.
- **Powerful**: Handles massive data sets without problem.
- **Responsive**: Ensures that the component fit all device resolutions depending on parent component.
- **Customizable**: Allow you to add custom class and change button, icons as components.
- **Auto direction**: Ensures that list items open in the correct direction based on their placement on the page.
- **Localization**: Easy to integrate any language.
- **Keyboard navigation**: Supports keyboard arrows and tab.
- **Highlight keywords**: Highlights entered text on list results.
- **Match priority**: If label starts with keyword, shows first.
- **[Storybook](https://lifetoweb.com/react-multi-select-advanced/)** : Document and test playground.

</div>

## Getting Started

## 1. Installation

##### npm
```
npm install react-multi-select-advanced
```

##### yarn
```
yarn add react-multi-select-advanced
```

----

## 2. Basic Usage

<table style="font-size: 14px">

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

</table>

----

## 3. Props

<table style="font-size: 14px">


| Prop  | Type  | Default | Description |
|:--------- | :---: | :---:   |:----  |
| `className` | `string` |  | Options data.
| `options` | `array` | `[]` | Options data.
| `selectedValues` | `array` | `[]` | Pre-selected options.
| **Input**
| `name` | `string` | auto | input name.
| `id` | `string` | auto | input id.
| `label` | `string` |  | Add label to top of input.
| `disabled` | `boolean` |  | Disables search input.
| `invalid` | `boolean` |  | If true border color turns to red.
| `inputDelay` | `number` | `1000` | Input delay (ms).
| `placeholder` | `string` |  | Input placeholder.
| **Filter**
| `filterShowLoading` | `boolean` | `true` | Show/hide loading indicator or component.
| `filterLimit` | `number` | | Maximum dropdown display limit.
| `filterHighlightKeyword` | `boolean` | `false` | Highlights matching keyword. Suggested to use with filterLimit because of performance.
| `filterOrderByMatchRank` | `boolean` | `false` | Gives match score if label starts with search keyword. Suggested to use with filterLimit because of performance.
| **Selected Items**
| `selectionLimit` | `number` |  | Limits selected items.
| `selectionMaxVisibleItems` | `number` |  | Limits selected display items and adds 'x more..' or MoreItemsComponent after items.
| `selectionLabelMaxWidth` | `number` | `100` | Limits max width (px) of display label and wrap with ellipsis.
| `selectionShowClear` | `boolean` | `false` | Shows clear all button after selected items if selected count more than 2.
| `selectionShowDeleteButton` | `boolean` | `true` | Shows remove button inside the selected items.
| **Language**
| `languageOverwrite` | `object` | | Please see 4. Localization.
| **Custom components**
| `LoadingComponent` | `JSX.Element` | | Custom loading indicator.
| `ClearButtonComponent` | `JSX.Element` | | Custom clear all button.
| `DeleteButtonComponent` | `JSX.Element` | | Custom delete button.
| `MoreItemsComponent` | `JSX.Element` | | Custom more items.
| **Callback**
| `onChange` | `function` |  | Callback function will invoked on selected options are changed.


</table>

----

## 4. Localization

Easy to localize component by passing object to prop `languageOverwrite`. Default values are as below.

```js
{
 selectionLimitReached : 'Max selection limit reached.',
 selectionShowClearTitle: 'Clear All',
 selectionDeleteTitle: 'Remove',
 moreItemsText: '{{count}} more items...'
}
```

----

## 5. License

MIT Licensed. Copyright © Lifetoweb 2022.

----

## Happy coding 😊



