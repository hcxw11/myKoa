const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let assetsPath = path.join(__dirname, 'public', 'assets');
// var serverPath = path.join(__dirname, 'server');

module.exports = {
  name: 'browser',
  entry: './client/entry.js',
  output: {
    path: assetsPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/assets/',
    // 使用entry.generator.js的是nodejs，所以需要将
    // webpack模块转化为CMD模块
    // library: 'entry',
    // libraryTarget: 'commonjs',
  },
  mode: 'production',
  module: {
    rules: [
      { test: /\.js/, loader: 'jsx-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './index.html',
    }),
    new CleanWebpackPlugin([assetsPath]),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
