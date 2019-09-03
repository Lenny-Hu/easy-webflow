/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:22:34
 * @LastEditTime: 2019-09-03 17:03:07
 * @LastEditors: Please set LastEditors
 */
const path = require('path');

module.exports = {
  development: {
    static: path.join(__dirname, '../app'),
    view: path.join(__dirname, '../server/views/')
  },
  production: {
    static: path.join(__dirname, '../dist/app/'),
    view: path.join(__dirname, '../dist/server/views/')
  }
};
