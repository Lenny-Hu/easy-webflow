/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:22:34
 * @LastEditTime: 2019-09-17 17:23:55
 * @LastEditors: Please set LastEditors
 */
const serverConfig = require('../app/config');

module.exports = {
  development: {
    debug: true,
    host: 'localhost',
    prot: serverConfig.development.prot,
    sftp: {
      host: '127.0.0.1',
      user: 'root',
      pass: '123456',
      port: 9001,
      remotePath: '/gulp-demo'
    }
  },
  production: {
    debug: false,
    host: 'localhost',
    prot: serverConfig.production.prot,
    sftp: {
      host: '127.0.0.1',
      user: 'root',
      pass: '123456',
      port: 9001,
      remotePath: '/gulp-demo'
    }
  }
};
