const path = require('path');
let webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const buildPath = path.resolve(__dirname, 'build');

var config = {
   entry: './src/scripts/index.js',
   output: {
      path:'/',
      filename: './build/bundle.js',
   },
   watch: true,
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['stage-2','react']
            }
         }
      ]
   },
    plugins: [
        new cleanWebpackPlugin([buildPath]),
        new copyWebpackPlugin([
            { from: path.join(__dirname, '/src/stylesheets/main.css'), to: path.join(buildPath, '/css') },
            { from: path.join(__dirname, '/src/index.html'), to: buildPath }
        ]),
        
    ]
}
module.exports = config;