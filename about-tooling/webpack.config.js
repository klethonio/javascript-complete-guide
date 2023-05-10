const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    // the slash at the start below is need so it could auto update
    publicPath: '/assets/scripts/',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: {
      directory: __dirname,
    },
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
