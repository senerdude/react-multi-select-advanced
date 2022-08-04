import React, { useState } from 'react'
import './App.scss'

import MultiSelectAdvanced, { MultiSelectAdvancedOption } from './multiSelectAdvanced/MultiSelectAdvanced'

// Mock cities
import options from './mock/mockData.json'

const selectedCities = [
	{ label: 'Istanbul', value: 'Istanbul' },
	{ label: 'Paris', value: 'Paris' },
	{ label: 'London', value: 'London' },
	{ label: 'Buenos Aires', value: 'Buenos Aires' },
	{ label: 'Canberra', value: 'Canberra' },
	{ label: 'Havana', value: 'Havana' },
	{ label: 'Helsinki', value: 'Helsinki' },
	{ label: 'Tokyo', value: 'Tokyo' },
	{ label: 'Amsterdam', value: 'Amsterdam' },
	{ label: 'Moscow', value: 'Moscow' },
	{ label: 'Stockholm', value: 'Stockholm' },
	{ label: 'Singapore', value: 'Singapore' },
	{ label: 'Lisbon', value: 'Lisbon' },
	{ label: 'Oslo', value: 'Oslo' },
	{ label: 'Reykjavík', value: 'Reykjavík' }
]

function App() {
	// Pre-select or not
	const [selectedItems, setSelectedItems] = useState(
		selectedCities as MultiSelectAdvancedOption[]
	)

	const handleChange = (selectedItems: MultiSelectAdvancedOption[]) => {
		setSelectedItems(selectedItems)
		// eslint-disable-next-line no-console
		console.log(selectedItems)
	}

	return (
		<div className="App">
			<div className="MultiSelectContainer">

				<h1>React Multi Select Advanced</h1>

				<MultiSelectAdvanced label="Select cities from 42802 cities all around the world" options={options.cities} selectedValues={selectedItems} onChange={handleChange} />

			</div>
		</div>
	)
}

export default App
