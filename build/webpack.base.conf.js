var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
// var vuxLoader = require('vux-loader')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // fallback: [path.join(__dirname, './node_modules')],
    modules: [
      resolve('src'),
      resolve('static'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, '../src'),
      'components': path.resolve(__dirname, '../src/components'),
      'static': path.resolve(__dirname, '../static'),
      'services': path.resolve(__dirname, '../src/services'),
      'views': path.resolve(__dirname, '../src/views'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /vue-scroller.src.*?js$/,
        loader: 'babel'
      }
    ]
  }
}
