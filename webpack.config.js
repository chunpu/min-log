var webpack = require('webpack')
var pkg = require('./package.json')
var path = require('path')

var banner = `${pkg.name}@${pkg.version} by ${pkg.author}`

var config = {
  entry: pkg.main,
  output: {
    path: path.join(__dirname, 'browser'),
    filename: 'log.js',
    library: 'log',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin(banner),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  devtool: 'source-map'
}

module.exports = config
