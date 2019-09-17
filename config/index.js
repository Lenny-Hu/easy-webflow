/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:22:34
 * @LastEditTime: 2019-09-17 17:14:38
 * @LastEditors: Please set LastEditors
 */
const path = require('path');
const serverConfig = require('../app/config');

module.exports = {
  development: {
    debug: true,
    host: 'localhost',
    prot: serverConfig.development.prot,
    sftp: {
      host: '10.21.132.50',
      user: 'root',
      pass: '123456',
      port: 22,
      remotePath: '/gulp-demo'
    }
  },
  production: {
    debug: false,
    host: 'localhost',
    prot: serverConfig.production.prot,
    sftp: {
      host: '10.21.132.50',
      user: 'root',
      port: 22,
      pass: '123456',
      remotePath: '/gulp-demo'
    }
  }
};
