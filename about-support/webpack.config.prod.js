const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
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
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
