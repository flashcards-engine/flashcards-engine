const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        ui: './src/html/ui.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Buzzer'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svelte$/i,
                use: ['svelte-loader'],
            }
        ]
    },
    mode: 'development',
    devtool: 'eval-source-map',
}