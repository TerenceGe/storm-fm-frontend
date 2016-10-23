const webpack = require('webpack')
const path = require('path')
const extend = require('extend')
const fs = require('fs')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const config = require('./webpack.config.base')

const nodeModules = {}

fs.readdirSync('node_modules')
.filter(file => !file.includes('.bin'))
.forEach((module) => {
  nodeModules[module] = `commonjs ${ module }`
})

module.exports = [
  extend(true, {}, config, {
    context: path.join(__dirname, '../client'),
    entry: {
      bundle: './index.js',
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
      path: path.join(__dirname, '../static'),
      filename: 'bundle.js?v=[hash]',
      publicPath: '/'
    },
    target: 'web',
    plugins: [
      new webpack.ExtendedAPIPlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js?v=[hash]'),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production') }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false }
      }),
      new CleanWebpackPlugin(['static'], {
        root: path.join(__dirname, '../'),
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
      new ExtractTextPlugin('bundle.css?v=[hash]', { allChunks: true }),
    ]
  }),
  extend(true, {}, config, {
    context: path.join(__dirname, '../server'),
    entry: './index.js',
    output: {
      path: path.join(__dirname, '../static'),
      filename: 'app.js',
      libraryTarget: 'commonjs2',
      publicPath: '/'
    },
    externals: nodeModules,
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
    },
    plugins: [
      new webpack.ExtendedAPIPlugin(),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production') }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false }
      }),
      new ExtractTextPlugin('bundle.css', { allChunks: true })
    ]
  })
]
