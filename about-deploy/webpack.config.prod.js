const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'share-place': './src/SharePlace.js',
    'my-place': './src/MyPlace.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
    publicPath: '/assets/scripts/',
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
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(),
    // those lines load the file names automatically in the index.html file
    // they weren't added in the webpack.config.js file
    new HtmlWebpackPlugin({
      template: './src/share-place.html',
      filename: '../../index.html',
      chunks: ['share-place'],
      inject: 'head',
    }),
    new HtmlWebpackPlugin({
      template: './src/my-place.html',
      filename: '../../my-place/index.html',
      chunks: ['my-place'],
      inject: 'head',
    }),
  ],
};
