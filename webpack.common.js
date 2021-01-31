const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './js/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        new CleanWebpackPlugin(),
    ]
}

// module.exports = {
//     context: path.resolve(__dirname, 'src'),
//     entry: {
//         main: path.resolve(__dirname, './src/index.js'),
//     },
//     output: {
//         filename: '[name].bundle.js',
//         path: path.resolve(__dirname, './dist'),
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js/,
//                 exclude: /node_modules/,
//                 use: ['babel-loader'],
//             },
//             {
//                 test: /\.(scss|css)$/,
//                 use: ['style-loader', 'css-loader', 'sass-loader'],
//             },
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             title: 'Webpack App',
//             template: path.resolve(__dirname, './src/index.html'),
//             filename: 'index.html'
//         }),
//         new CleanWebpackPlugin(),
//     ]
// }
