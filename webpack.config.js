const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const extend = require('extend')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const baseConfig = {
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chucks: false
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        include: /shared/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]_[hash:base64:5]!postcss-loader'
        )
      },
      {
        test: /\.css$/,
        exclude: /shared/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { compact: false }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        include: /shared\/resources\/fonts/,
        loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
      },
      {
        test: /\.(ico|png|jpg|svg)$/,
        include: /shared\/resources\/images/,
        loader: 'url-loader?limit=10240&name=images/[name].[ext]?v=[hash:base64:5]'
      },
      {
        test: /\.svg$/,
        include: /shared\/resources\/icons/,
        loaders: [
          'babel-loader',
          'svg-react-loader'
        ]
      }
    ]
  }
}

const nodeModules = {}

fs.readdirSync('node_modules')
.filter(file => !file.includes('.bin'))
.forEach((module) => {
  nodeModules[module] = `commonjs ${ module }`
})

delete nodeModules['normalize.css']

const devConfig = extend(true, {}, baseConfig, {
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

const prodConfig = [
  extend(true, {}, baseConfig, {
    context: path.join(__dirname, './client'),
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
      path: path.join(__dirname, './static'),
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
      new ExtractTextPlugin('bundle.css?v=[hash]', { allChunks: true }),
    ]
  }),
  extend(true, {}, baseConfig, {
    context: path.join(__dirname, './server'),
    entry: './index.js',
    output: {
      path: path.join(__dirname, './static'),
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

module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig
