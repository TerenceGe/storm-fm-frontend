const webpack = require('webpack')
const path = require('path')
const extend = require('extend')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const config = require('./webpack.config.base')

module.exports = extend(true, {}, config, {
  context: path.join(__dirname, './client'),
  entry: {
    jsx: './index.js',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-actions',
      'intl',
      'intl/locale-data/jsonp/en.js',
      'intl/locale-data/jsonp/zh.js',
      'react-intl',
      'react-cookie'
    ]
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new CleanWebpackPlugin(['static'], {
      root: path.join(__dirname, './'),
      verbose: true,
      compress: { warnings: false },
      output: { comments: false }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'index.html',
      title: 'Storm FM',
      appMountId: 'app',
      mobile: true
    }),
    new ExtractTextPlugin('bundle.css', { allChunks: true })
  ],
  devServer: {
    contentBase: './client',
    hot: true
  }
})
