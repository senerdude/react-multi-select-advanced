import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import sass from 'rollup-plugin-sass'

export default {
	input: 'src/multiSelectAdvanced/MultiSelectAdvanced.tsx',
	plugins: [
		sass({ insert: true }),
		typescript({
			tsconfigOverride: {
				exclude: ['src'],
				include: ['src/multiSelectAdvanced']
			}
		}),
		terser()
	],
	output: [
		{
			file: 'dist/index.js',
			format: 'esm',
			exports: 'named',
			sourcemap: false,
			strict: true
		}
	],
	external: ['react', 'react-dom']
}
