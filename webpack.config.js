const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin' );

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = !IS_DEV;

const optimize = () => {
    return {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
}

const getFileName = (ext) => IS_DEV ? `[name].${ext}` : `[name].[hash].${ext}`;

const setCssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader'
    ]

    if(extra){
        loaders.push(extra)
    }

    return loaders
}

const setPlugins = () => {
    const plugins = [
        new htmlWebpackPlugin({
            template: './index.html',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname, 'src/logo.png'),
                    to: path.resolve(__dirname, 'dist'),
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: getFileName('css')
        })
    ]

    if(IS_DEV){

    }
    if(IS_PROD){
        
    }

    return plugins
}

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.js',
        stat: './statistics.ts'
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: getFileName('js'),
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx', '.jsx'],
        alias:{
            '@': path.resolve(__dirname, 'src'),
            '@model': path.resolve(__dirname, 'src/model'),
            '@css': path.resolve(__dirname, 'src/css'),
            '@assets': path.resolve(__dirname, 'src/assets')
        }
    },
    optimization: optimize(),
    devServer: {
        port: 4200,
        hot: false
    },
    plugins: setPlugins(),
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: setCssLoaders()
            },
            {
                test: /\.less$/i,
                use: setCssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/i,
                use: setCssLoaders('sass-loader')
            },
            {
                test: /\.(png|svg|jpe?g|gif|webp)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf||woff|woff2|eot)$/i,
                type: 'asset/resource'
            }
        ]
    }
};