/**
 * webpack/webpack.dev.js — Development configuration
 * Extends webpack.common.js - adds HMR + React Fast Refresh.
 * 
 * NOTE: Does NOT override module.rules — common.js already has all rules.
 * React Fast Refresh is applied via the plugin, not via a rule override.
 */
const path    = require('path');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common  = require('./webpack.common');

/** @type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode:    'development',
  devtool: 'eval-source-map',

  devServer: {
    port:               3000,
    hot:                true,
    open:               true,
    historyApiFallback: true,
    compress:           true,
    client: {
      overlay: { errors: true, warnings: false },
    },
  },

  // React Fast Refresh — no module.rules override needed
  plugins: [new ReactRefreshWebpackPlugin()],

  optimization: {
    runtimeChunk: 'single',
  },
});
