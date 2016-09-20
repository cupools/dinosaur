'use strict'

var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:3000',
        'webpack/hot/dev-server',
        './src/index.js'
    ],
    output: {
        path: path.resolve('build/asserts/'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel',
            exclude: /node_modules|bower_components/
        }, {
            test: /\.(css)$/,
            loader: 'style!css'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        )
    ],
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        alias: {
            'createjs': path.resolve('src/createjs.js'),
            'src': path.resolve('src')
        }
    },
    devtool: 'eval'
}
