/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 09:47:22
 * @LastEditTime: 2019-09-20 10:57:00
 * @LastEditors: Please set LastEditors
 */
const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  mode: process.env.NODE_ENV,
  devtool: global.IS_PROD ? false : 'cheap-module-source-map',
  watch: !global.IS_PROD,
  watchOptions: {
    poll: 1000
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader' // babel有单独的配置文件 babel.config.js
        }
      }
      // {
      //   test: /\.(vue|js)$/,
      //   loader: 'eslint-loader', // js规则检查参考 https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
      //   exclude: /(node_modules|bower_components)/,
      //   // include: [resolve('app'), resolve('.tmp')],
      //   enforce: 'pre',
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // }
    ]
  }
};
