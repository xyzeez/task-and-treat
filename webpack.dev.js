const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    watchFiles: ['./src'],
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
  },
  output: {
    filename: '[name].bundle.js',
    assetModuleFilename: '[name][ext]',
  },
  plugins: [new MiniCssExtractPlugin()],
});
