import babel from '@rollup/plugin-babel';
import minify from 'rollup-plugin-babel-minify';
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
    babel(babelConfig),
    minify(minifyConfig),
    uglify()
  ]
}