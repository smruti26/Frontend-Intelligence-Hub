/**
 * webpack/webpack.prod.js — Production configuration
 */
const { merge }          = require('webpack-merge');
const TerserPlugin       = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common             = require('./webpack.common');

module.exports = merge(common, {
  mode:    'production',
  devtool: 'hidden-source-map',

  optimization: {
    minimize:  true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: false, drop_debugger: true },
        },
        parallel:        true,
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },

  plugins: [
    ...(process.env.ANALYZE === 'true'
      ? [new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: true })]
      : []),
  ],
});
