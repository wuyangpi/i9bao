var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

var entries =  utils.getMultiEntry('./src/'+config.moduleName+'/**/index.js'); // 获得入口js文件
// function resolve (dir) {
//   return path.join(__dirname, '..', dir)
// }
function resolve (dir) {
  return path.resolve(process.cwd(), dir)
}
module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // plugins: [
  //   new webpack.DllReferencePlugin({
  //     context: path.resolve(__dirname, '..'),
  //     manifest: require('./vendor-manifest.json')
  //   }),
  // ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('..'),
      // 'vue$': 'vue/dist/vue.esm.js',
      dist: resolve('dist'),
      src: resolve('src'),
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      utils: resolve('src/utils'),
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      // {
      //   test:/\.css$/,
      //   loaders: 'style-loader!css-loader'
      // },
      // {
      //   test: /\.styl$/,
      //   loader: 'style-loader!css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
      //   // loader: 'stylus-loader',
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('node_modules/vux/src'), resolve('node_modules/element-ui/src/mixins/emitter.js'),]
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
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
