/**
 * webpack/webpack.common.js — Shared Webpack 5 configuration
 */
const path               = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ROOT   = path.resolve(__dirname, '..');
const SRC    = path.resolve(ROOT, 'src');
const PUBLIC = path.resolve(ROOT, 'public');
const DIST   = path.resolve(ROOT, 'dist');
const isDev  = process.env.NODE_ENV !== 'production';

module.exports = {
  entry:  path.resolve(SRC, 'index.tsx'),

  output: {
    path:               DIST,
    filename:           '[name].[contenthash:8].js',
    chunkFilename:      '[name].[contenthash:8].chunk.js',
    assetModuleFilename:'assets/[hash][ext]',
    clean:              true,
    publicPath:         '/',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@app':        path.resolve(SRC, 'app'),
      '@components': path.resolve(SRC, 'components'),
      '@features':   path.resolve(SRC, 'features'),
      '@hooks':      path.resolve(SRC, 'hooks'),
      '@hocs':       path.resolve(SRC, 'hocs'),
      '@utils':      path.resolve(SRC, 'utils'),
      '@constants':  path.resolve(SRC, 'constants'),
      '@appTypes':   path.resolve(SRC, 'types'),
      '@panels':     path.resolve(SRC, 'panels'),
      '@assets':     path.resolve(SRC, 'assets'),
    },
  },

  module: {
    rules: [
      // ── TypeScript / JS — Babel transpiler ───────────────────────────
      {
        test:    /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults', modules: false }],
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
            // React Fast Refresh babel plugin — only active in dev
            plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
            cacheDirectory: true,
          },
        },
      },

      // ── CSS ─────────────────────────────────────────────────────────
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: false } },
        ],
      },

      // ── Images ──────────────────────────────────────────────────────
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },

      // ── Fonts ───────────────────────────────────────────────────────
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PUBLIC, 'index.html'),
      title:    'Frontend Architecture Hub',
    }),
    // Only extract CSS in production
    ...(!isDev ? [new MiniCssExtractPlugin({
      filename:      '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].chunk.css',
    })] : []),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        reactVendor: {
          test:     /[\\/]node_modules[\\/](react|react-dom|react-redux|@reduxjs)[\\/]/,
          name:     'vendor.react',
          priority: 20,
        },
        libs: {
          test:     /[\\/]node_modules[\\/]/,
          name:     'vendor.libs',
          priority: 10,
        },
      },
    },
    runtimeChunk: 'single',
  },

  // Relax size warnings — bridge.js is intentionally large
  performance: {
    hints:             false,
  },
};
