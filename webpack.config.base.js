const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
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
