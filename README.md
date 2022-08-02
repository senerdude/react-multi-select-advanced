# react-multi-select-advanced

## Description   

High performance react component which can handle huge data and provides multi select functionality with various features.

## Getting Started 

## 1. Installation
```
npm install react-multi-select-advanced
```
----

----
## 2. Basic Usage
```js
import MultiSelectAdvanced from 'react-multi-select-advanced'

this.state = {
    options: [
		{ label: 'Option 1', value: 1 },
		{ label: 'Option 2', value: 2 },
		{ label: 'Option 3', value: 3 }
	],
	selectedValues: [
		{ label: 'Option 2', value: 2 }
	]
}

<MultiSelectAdvanced options={this.state.options} selectedValues={this.state.selectedValues} />

onChange(selectedItems) {
    ...
}
```

----

## 3. Props

| Prop  | Type  | Default | Description |
|:--------- | :---- | :----   |:----  |
| `options` | `array` | `[]` | Options data
| `selectedValues` | `array` | `[]` | Pre-selected options
| `onChange` | `function` | `func` | Callback function will invoked on selected options are changed.
----

## 4. License

MIT

### Happy Building ♡
