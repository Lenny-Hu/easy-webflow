/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:22:34
 * @LastEditTime: 2019-09-11 17:10:37
 * @LastEditors: Please set LastEditors
 */
const path = require('path');

module.exports = {
  development: {
    prot: 9000,
    static: path.join(__dirname, '../app'),
    view: path.join(__dirname, '../server/views/'),
    sftp: {
      host: '10.21.132.50',
      user: 'root',
      pass: '123456',
      port: 22,
      remotePath: '/gulp-demo'
    }
  },
  production: {
    prot: 9000,
    static: path.join(__dirname, '../dist/app/'),
    view: path.join(__dirname, '../dist/server/views/'),
    sftp: {
      host: '10.21.132.50',
      user: 'root',
      port: 22,
      pass: '123456',
      remotePath: '/gulp-demo'
    }
  }
};
