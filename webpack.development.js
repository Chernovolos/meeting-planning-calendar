const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        // hot: true,
        // port: 8080,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
})
