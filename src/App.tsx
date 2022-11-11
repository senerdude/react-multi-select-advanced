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
] as MultiSelectAdvancedOption[]

function App() {
	
	const [localSelectedItems, setLocalSelectedItems] = useState(selectedCities) // Local filter selection state
	const [serverSelectedItems, setServerSelectedItems] = useState([] as MultiSelectAdvancedOption[]) // Server search selection state

	// Set locally selected values
	const handleLocalFilterChange = (selectedItems: MultiSelectAdvancedOption[]) => {
		setLocalSelectedItems(selectedItems)
	}

	// Set selected values by search result
	const handleSearchOnServerChange = (selectedItems: MultiSelectAdvancedOption[]) => {
		setServerSelectedItems(selectedItems)
	}

	// Search function
	const searchOnServer = async (keyword:string) => {
		try {
			return await search(keyword)
		} catch (error){
			return error
		}
	}

	// Mock server response
	const search = async (keyword:string) => {
		return new Promise(resolve => {
			const filteredData = options.cities.filter(city => city.label.toLowerCase().includes(keyword.toLowerCase()))
			return setTimeout(() => resolve(filteredData), 500)
		})
	}

	return (
		<div className="App">
			<div className="MultiSelectContainer">

				<h1>React Multi Select Advanced</h1>

				<h2>Using local state</h2>
				<MultiSelectAdvanced 
					name="localFilter"
					label="Select cities from all around the world" 
					placeholder="Type a city name" 
					selectionShowDeleteButton={true} 
					selectionMaxVisibleItems={10} 
					selectionShowClear={true} 
					options={options.cities} 
					selectedValues={localSelectedItems} 
					onChange={handleLocalFilterChange} 
				/>

				<h2>Search on server</h2>
				<MultiSelectAdvanced 
					name="searchOnServer"
					label="Search cities from all around the world" 
					placeholder="Type a city name" 
					selectionShowDeleteButton={true}
					selectionShowClear={true} 
					selectedValues={serverSelectedItems} 
					onChange={handleSearchOnServerChange}
					isServerSide={true}
					onKeywordChange={keyword => searchOnServer(keyword)}
				/>

			</div>
		</div>
	)
}

export default App
