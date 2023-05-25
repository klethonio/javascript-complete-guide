const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  // mode: 'development',
  mode: 'production', // temporary
  entry: {
    shop: './src/optimized/shop.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
    // the slash at the start below is need so it could auto update
    publicPath: '/assets/scripts/',
  },
  // devtool: 'eval-cheap-module-source-map',
  devtool: 'source-map', // temporary
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    // deprecated
    // contentBase: path.resolve(__dirname, 'dist'),
  },
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
