const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './assets/images/favicon.png',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          ,
          'postcss-loader',
        ],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: {
          and: [/node_modules/],
          not: [/unfetch/, /d3-array|d3-scale/, /@hapi[\\/]joi-date/],
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    edge: '17',
                    firefox: '60',
                    chrome: '67',
                    safari: '11.1',
                  },
                  useBuiltIns: 'usage',
                  corejs: '3.6.5',
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
