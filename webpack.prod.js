const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name]-[contenthash].bundle.js',
    assetModuleFilename: 'assets/[name]-[hash][ext]',
  },
  plugins: [new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css' })],
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
});
