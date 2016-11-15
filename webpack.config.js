const webpack = require('webpack')
const fs = require('fs')
const { resolve } = require('path')
const BabiliPlugin = require("babili-webpack-plugin")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV)
const nodeModules = {}

fs.readdirSync('node_modules')
  .filter(file => !file.includes('.bin'))
  .forEach((module) => {
    nodeModules[module] = `commonjs ${ module }`
  })

delete nodeModules['normalize.css']

const baseConfig = {
  output: {
    path: resolve('static'),
    publicPath: '/'
  },
  resolve: {
    modules: [
      resolve('client'),
      resolve('server'),
      resolve('shared'),
      'node_modules'
    ],
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
        loader: 'babel-loader'
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
        loader: [
          'babel-loader',
          'svg-react-loader'
        ]
      }
    ]
  },
  plugins: removeEmpty([
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.ExtendedAPIPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production') }
    }),
    ifProduction(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })),
    new ExtractTextPlugin({
      filename: ifProduction('bundle.css?v=[hash]', 'bundle.css'),
      disable: false,
      allChunks: true
    })
  ])
}

const clientConfig = Object.assign({}, baseConfig, {
  context: resolve('client'),
  entry: {
    jsx: './index.js'
  },
  output: Object.assign({}, baseConfig.output, {
    filename: ifProduction('bundle.js?v=[hash]', 'bundle.js')
  }),
  plugins: baseConfig.plugins.concat([
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
    })
  ]),
  devServer: {
    contentBase: './client',
    hot: true
  }
})

const serverConfig = Object.assign({}, baseConfig, {
  target: 'node',
  context: resolve('server'),
  devtool: false,
  entry: './index.js',
  output: Object.assign({}, baseConfig.output, {
    filename: 'app.js',
    libraryTarget: 'commonjs2'
  }),
  externals: nodeModules,
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },
  plugins: baseConfig.plugins
})

const prodConfig = [
  clientConfig,
  serverConfig
]

module.exports = process.env.NODE_ENV === 'development' ? clientConfig : prodConfig
