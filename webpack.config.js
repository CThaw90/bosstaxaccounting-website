/* global require, __dirname, module */
const path = require('path');
const packageJSON = require('./package.json');

const APP_DIR = path.resolve(__dirname, 'src/main');
const DIST_DIR = path.resolve(__dirname, 'docker/dist');
const BUILD_DIR = path.resolve(DIST_DIR, packageJSON.version + '/js');
const HTML_FILE = path.resolve(DIST_DIR, 'index.html');
const APP_FILENAME = 'index.js';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    title: 'Boss Tax and Accounting',
    filename: HTML_FILE
});
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
    filename: '../css/main.css'
});
const TerserWebpackPlugin = require('terser-webpack-plugin');
const TerserWebpackPluginConfig = new TerserWebpackPlugin({
    extractComments: false,
    terserOptions: {
        output: {
            comments: false
        }
    }
});

module.exports = function () {
    let plugins = [HtmlWebpackPluginConfig, MiniCssExtractPluginConfig, TerserWebpackPluginConfig];

    return {
        entry: [APP_DIR, APP_FILENAME].join('/'),
        devtool: 'eval-source-map',
        output: {
            path: BUILD_DIR,
            filename: APP_FILENAME
        },
        module: {
            rules: [{
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: {
                            collapseWhitespace: true,
                            removeComments: false
                        }
                    }
                }
            }, {
                test: /\.(css|scss)$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            }, {
                test: /\.woff|\.woff2|\.ttf|\.eot|\.svg/,
                use: {loader: 'url-loader'}
            }]
        },
        plugins: plugins
    }
};
