const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const template = require('html-webpack-template');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
  entry: './lib/index.js',
  output: {
    path: path.join(__dirname, 'build/dist'),
    filename: '[name]-[hash].js',
    publicPath: 'dist/',
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
    new HtmlWebpackPlugin({
      template,
      inject: false,
      title: 'Code test',
      appMountId: 'app',
      filename: '../index.html',
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
  postcss() {
    return [autoprefixer, precss];
  },
  devServer: {
    proxy: {
      '/': 'http://localhost:8080/dist/',
    },
  },
};
