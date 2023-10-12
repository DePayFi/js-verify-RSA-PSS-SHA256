import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import globals from './rollup.globals.js'
import pkg from './package.json'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import sucrase from '@rollup/plugin-sucrase'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'es',
      globals: globals,
      file: 'dist/esm/index.js'
    },
    {
      format: 'umd',
      name: pkg.moduleName,
      globals: globals,
      file: 'dist/umd/index.js'
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    copy({
      targets: [
        { src: 'src/index.d.ts', dest: 'dist/umd/' },
        { src: 'src/index.d.ts', dest: 'dist/esm/' },
      ]
    }),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['jsx']
    }),
    resolve({
      extensions: ['.js',  '.jsx']
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' ),
      preventAssignment: true
    })
  ]
}
