const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const configureCopy = {
    patterns: [
        {
            from: 'src/img/',
            to: 'img/',
        },
    ],
};

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true,
                },
            },
        ],

    },
    plugins: [
        new HtmlWebpackPlugin({
            file: require('./dataset.json'),
            filename: 'index.html',
            template: './src/templates/index.pug'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new HtmlWebpackPugPlugin(),
        new CopyWebpackPlugin({ ...configureCopy }),
    ],
}