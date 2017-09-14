var path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const url = require('url')
const publicPath = ''

module.exports = (options = {}) => ({
    entry: {
        vendor: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'wx'),
        filename: options.dev ? 'bundle.js' : 'bundle.js?[chunkhash]',
        chunkFilename: '[id].js?[chunkhash]',
    },
    externals: [
        'vue',
        'vuex',
        'vue-resource',
        'vue-router',
        'moment',
        'lodash',
        'jquery'
    ],
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    root: path.resolve(__dirname, 'src'),
                    attrs: ['img:src', 'link:href']
                }
            }]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }, {
            test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
            exclude: /favicon\.png$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            LUBANDEV: JSON.stringify(options.dev)
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin('styles.css'),
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: 8050,
        proxy: {
            '/api/': {
                target: 'http://127.0.0.1:8050',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        historyApiFallback: {
            index: url.parse(options.dev ? '/assets/' : publicPath).pathname
        }
    },
    devtool: options.dev ? 'module-source-map' : '#source-map'
})