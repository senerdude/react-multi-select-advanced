import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import sass from 'rollup-plugin-sass'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  plugins: [
    sass({ insert: true }),
    typescript(),
    terser()
  ],
  output: [
    {
      file: pkg.main,
      format: 'esm',
      exports: 'named',
      sourcemap: false,
      strict: true
    }
  ],
  external: ['react', 'react-dom']
}
