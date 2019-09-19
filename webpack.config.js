/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 09:47:22
 * @LastEditTime: 2019-09-19 09:52:40
 * @LastEditors: Please set LastEditors
 */

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: global.IS_PROD ? false : 'cheap-module-source-map',
  watch: !global.IS_PROD,
  // output: {
  //   // filename: '[name].[contenthash].js'
  // },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader' // babel有单独的配置文件 babel.config.js
        }
      }
    ]
  }
};
