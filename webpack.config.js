const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = require('./node_modules/html-webpack-template');

module.exports = {
  devtool: process.env.NODE_ENV !== 'production' && 'eval',
  entry: (process.env.NODE_ENV !== 'production' ? [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
  ] : []).concat('./lib/index'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'dist/[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new HtmlWebpackPlugin({
      template,
      title: 'Code test',
      appMountId: 'mount',
      inject: false,
      mobile: true,
      minify: {
        collapseWhitespace: true,
      },
    }),
  ].concat(
    process.env.NODE_ENV !== 'production' ? [
      new webpack.HotModuleReplacementPlugin(),
    ] : [
      new webpack.optimize.UglifyJsPlugin(),
    ]
  ),
  postcss() {
    return [autoprefixer, precss];
  },
};
