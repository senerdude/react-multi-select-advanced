module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true // Fix for test or expect is not defined
	},
	extends: [
		'plugin:import/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'standard',
		'prettier',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true // JSX support.
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['react', 'prettier', '@typescript-eslint'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		// No need to import React after v17
		indent: [2, 'tab'],
		// This rule enforces a consistent indentation style.
		'no-tabs': 0,
		// Allow Tabs
		'quote-props': 0,
		// No need to force this rule
		'react/prop-types': 0,
		// We are not using prop-types.
		'object-property-newline': 'off',
		// Do not force for new line.
		'no-console': [
			2,
			{
				allow: ['warn', 'error']
			}
		],
		// Except warn and error, don't allow console.log
		'jsx-quotes': ['error', 'prefer-double'],
		// JSX attributes need to be double-quoted.
		quotes: [
			'error',
			'single',
			{
				allowTemplateLiterals: true
			}
		],
		// Use single quotes in javascript and allow template strings
		'eol-last': ['error', 'always'],
		// Newline required at end of file
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1,
				maxEOF: 1
			}
		],
		// No multiple empty lines
		'arrow-parens': ['error', 'as-needed'],
		// No parentheses around single function argument
		'arrow-spacing': 'error',
		// Missing space before/after =>
		'object-curly-spacing': ['error', 'always'],
		// Enforces consistent spacing inside braces.
		semi: ['error', 'never'],
		// No semi-colons after
		'keyword-spacing': [
			'error',
			{
				after: true
			}
		],
		// Enforce consistency of spacing after the keywords if, else, for, while, do, switch, try, catch, finally, and with.
		'object-shorthand': 0 // Disable object-shorthand rule
	},
	settings: {
		react: {
			version: 'detect'
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx']
			}
		}
	}
}
