/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/named */
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import MultiSelectAdvanced from '../multiSelectAdvanced/MultiSelectAdvanced'

// Mock cities
import options from '../mock/mockData.json'

// Mock selected cities
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

export default {
	title: 'Example/react-multi-select-advanced',
	component: MultiSelectAdvanced,
	parameters: {
		docs: {
		  description: {
			  component: `
	Warning : options parameter is disabled 
	because Storybok can't handle 42.803 cities... 
	And please don't press "Show code" under component 
	Your browser might freeze 🥶
			  `
		  }
		}
	},
	argTypes: {
		options: {
			table: {
				disable: true
			}
		},
		options_disabled: {

		}
	}
} as ComponentMeta<typeof MultiSelectAdvanced>

const Template: ComponentStory<typeof MultiSelectAdvanced> = args => <MultiSelectAdvanced {...args} />

export const Default = Template.bind({})
Default.args = {
	options: options.cities,
	selectedValues : selectedCities
}
