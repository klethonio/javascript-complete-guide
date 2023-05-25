const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    shop: './src/optimized/shop.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
    // if you omit the starting slash or './[path]', the file will be relative to root folder
    // if you add a starting slash, the file will be relative to dist foldar
    publicPath: './assets/scripts/',
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // remove default to customize
              // ['@babel/preset-env', { targets: "defaults" }]
              [
                '@babel/preset-env',
                { useBuiltIns: 'usage', corejs: { version: 3.29 } },
                // with "entry" you need to keep the imports in app.js
                // { useBuiltIns: 'entry', corejs: { version: 3.29 } },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
