/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:22:34
 * @LastEditTime: 2019-09-23 13:45:00
 * @LastEditors: Please set LastEditors
 */
const serverConfig = require('../app/config');

module.exports = {
  development: {
    useDefault: true,
    debug: true,
    host: 'localhost',
    port: serverConfig.development.port,
    sftp: { // https://www.npmjs.com/package/gulp-sftp
      host: '127.0.0.1',
      user: 'root',
      pass: '123456',
      port: 9001,
      remotePath: '/gulp-demo'
    },
    before (config, cb) {
      setTimeout(() => {
        console.log('默认任务之前执行');
        cb();
      }, 1000);
    },
    after (config, cb) {
      setTimeout(() => {
        console.log('默认任务之后执行');
        cb();
      }, 1000);
    },
    watch: {
      // globs: [], // 数组，可选参数，监听的文件路径，默认src.root目录
      cb (watcher, config) {
        // 注册监听项目根目录(src.root)下所有文件（除了node_modules）
        // 可直接调用gulpfile.js/lib目录下所有的对外工具函数来实现各种操作
        watcher.on('add', (path) => {
          console.log('添加文件', path);
        });
  
        watcher.on('unlink', (path) => {
          console.log('删除文件', path);
        });
  
        watcher.on('change', (path) => {
          console.log('更改文件', path);
        });
      }
    } 
  },
  production: {
    useDufault: true,
    debug: false,
    host: 'localhost',
    port: serverConfig.production.port,
    // sftp: {
    //   host: '127.0.0.1',
    //   user: 'root',
    //   pass: '123456',
    //   port: 9001,
    //   remotePath: '/gulp-demo'
    // },
    before (config, cb) {
      setTimeout(() => {
        console.log('默认任务之前-----------');
        cb();
      }, 5000);
    },
    after (config, cb) {
      setTimeout(() => {
        // 开发模式下该任务不会执行
        console.log('默认任务之后---------------');
        cb();
      }, 5000);
    }
  }
};
