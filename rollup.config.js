import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import scss from 'rollup-plugin-scss'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [scss({ processor: () => postcss([autoprefixer()]), outputStyle: "compressed" }), typescript(), terser()],
  external: ['react', 'react-dom']
}
