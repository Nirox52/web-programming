const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Отримання всіх HTML-файлів із директорії
const htmlPages = fs.readdirSync(path.resolve(__dirname, 'src/pages')).filter(file => file.endsWith('.html'));

const htmlPlugins = htmlPages.map(file => {
    return new HtmlWebpackPlugin({
        template: `./src/pages/${file}`,
        filename: file, // Зберігаємо з тим самим ім'ям у dist
        // Видаліть `chunks: []`, якщо потрібно включити JS-файли
    });
});

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].bundle.js', // Використовуємо хеші для кешування
        clean: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...htmlPlugins,
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css', 
        }),

    ],
    devServer: {
        static: './dist',
        historyApiFallback: true,
        open: true,
        port: 8080,
    },
    module: {
        rules: [
            // Лоадери для CSS файлів
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            // Лоадери для SCSS файлів
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            // Заміна file-loader на asset/resource для зображень
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[hash][ext]', // Директория для зображень
                },
            },
        ],
    },
    mode: 'development', // Для production бажано зробити окрему конфігурацію
};
