const webpack = require('webpack')
const fs = require('fs')
const { resolve } = require('path')
const extend = require('extend')
const BabiliPlugin = require("babili-webpack-plugin")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')

const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV)

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
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: /shared/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[local]_[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: /shared/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: {
            loader: 'css-loader'
          }
        })
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { compact: false }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        include: /shared\/resources\/fonts/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(ico|png|jpg|svg)$/,
        include: /shared\/resources\/images/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'images/[name].[ext]?v=[hash:base64:5]'
        }
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

const clientConfig = extend(true, {}, baseConfig, {
  context: resolve('client'),
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
    path: resolve('static'),
    filename: ifProduction('bundle.js?v=[hash]', 'bundle.js'),
    publicPath: '/'
  },
  plugins: removeEmpty([
    new BabiliPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: ifProduction('vendor.bundle.js?v=[hash]', 'vendor.bundle.js')
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production') }
    }),
    ifProduction(new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: false
    })),
    new CleanWebpackPlugin(['static'], {
      root: resolve('./'),
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
    new ExtractTextPlugin({
      filename: ifProduction('bundle.css?v=[hash]', 'bundle.css'),
      disable: false,
      allChunks: true
    })
  ]),
  devServer: {
    contentBase: './client',
    hot: true
  }
})

const nodeModules = {}

fs.readdirSync('node_modules')
      .filter(file => !file.includes('.bin'))
  .forEach((module) => {
    nodeModules[module] = `commonjs ${ module }`
  })

delete nodeModules['normalize.css']

const serverConfig = extend(true, {}, baseConfig, {
  context: resolve('server'),
  entry: './index.js',
  output: {
    path: resolve('static'),
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
    new BabiliPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.ExtendedAPIPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production') }
    }),
    ifProduction(new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: false
    })),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    })
  ]
})

const prodConfig = [
  clientConfig,
  serverConfig
]

module.exports = process.env.NODE_ENV === 'development' ? clientConfig : prodConfig
