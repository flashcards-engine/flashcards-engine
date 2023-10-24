import * as path from 'path';
import * as url from 'url';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export default {
    entry: {
        'ui': './src/html/ui/ui.js',
        'preload': './src/preload/preload.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/html/'),
    },
    mode,
    plugins: [
        new MiniCSSExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'Flashcards',
            template: path.resolve(__dirname, 'src/html/index.html'),
            excludeChunks: ['preload']
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        fallback: {
            fs: false,
            path: false,
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/i,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.(tsx|ts)$/i,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig-html.json'),
                            onlyCompileBundledFiles: true
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
        ]
    },
    devtool: 'eval-source-map',
}
