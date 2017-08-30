import babel from 'rollup-plugin-babel';
import { main } from './package.json';

export default [{
  input: 'src/index.js',
  external: [
    'color',
    'styled-components'
  ],
  output: [
    { file: main, format: 'cjs' }
  ],
  plugins: [
    babel({
      exclude: ['node_modules/**']
    })
  ]
}];
