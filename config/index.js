/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:22:34
 * @LastEditTime: 2019-09-05 15:21:09
 * @LastEditors: Please set LastEditors
 */
const path = require('path');

module.exports = {
  development: {
    prot: 9000,
    static: path.join(__dirname, '../app'),
    view: path.join(__dirname, '../server/views/')
  },
  production: {
    prot: 9000,
    static: path.join(__dirname, '../dist/app/'),
    view: path.join(__dirname, '../dist/server/views/')
  }
};
