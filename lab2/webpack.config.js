const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Імпортуємо плагін
const fs = require('fs');

// Функція для отримання всіх HTML-файлів із директорії
const htmlPages = fs.readdirSync(path.resolve(__dirname, 'src/pages')).filter(file => file.endsWith('.html'));

const htmlPlugins = htmlPages.map(file => {
    return new HtmlWebpackPlugin({
      template: `./src/pages/${file}`,
      filename: file, // Зберігаємо з тим самим ім'ям у dist
      chunks: [], // Відключаємо підключення JS-файлів, якщо не потрібно
    });
  });
  

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        clean:true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...htmlPlugins,
    ],
    devServer: {
        static: './dist',
        historyApiFallback: true, // Додає підтримку маршрутизації
        open: true, // Автоматично відкриває браузер після запуску сервера
        port: 8080, // Ви можете вказати інший порт, якщо потрібно
    },
    mode: 'development',
}
