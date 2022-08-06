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
			  component: 'Warning: In this demo I used 42.802 city names around the world as options. To prevent Storybook from overload and crash, I had to disable the options parameter on Storybook. Also, clicking "Show code" under the component, might freeze your browser too. 🥶'
		  }
		}
	},
	argTypes: {
		options: {
			table: {
				disable: true
			}
		}
	}
} as ComponentMeta<typeof MultiSelectAdvanced>

const Template: ComponentStory<typeof MultiSelectAdvanced> = args => <div style={{ fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, sans-serif' }}><MultiSelectAdvanced {...args} /></div>

export const BasicUsage = Template.bind({})
BasicUsage.args = {
	options: options.cities,
	selectedValues : selectedCities
}
