/**
 * babel.config.js — Used by Jest for transpiling TS/TSX in tests.
 * Webpack uses its own inline babel-loader config in webpack.common.js.
 */
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript', { allExtensions: true }],
  ],
};
