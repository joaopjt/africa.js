import babel from '@rollup/plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import resolve from '@rollup/plugin-node-resolve';
import json from 'rollup-plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

const babelConfig = { babelrc: false, babelHelpers: 'inline', exclude: 'node_modules/**' };
const minifyConfig = { comments: false };

export default {
  input: 'resources/index.js',
  output: {
    name: 'index',
    file: 'dist/index.min.js',
    format: 'umd'
  },
  interop: false,
  plugins: [
    // replace({
    //   preventAssignment: true,
    //   "process.env.NODE_ENV": JSON.stringify("development")
    // }),
    babel(babelConfig),
    // commonjs(),
    // commonjs({
    //   include: '/node_modules/'
    // }),
    // json(),
    minify(minifyConfig),
    uglify()
  ]
}