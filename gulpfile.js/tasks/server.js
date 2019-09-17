/*
 * @Description: 本地静态资源服务器
 * @Author: your name
 * @Date: 2019-09-12 14:38:10
 * @LastEditTime: 2019-09-17 10:35:04
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const { Server } = require('../lib/server');
const config = require('../default-config');

gulp.task('server', (cb) => {
  const server = new Server(config);
  server.init();
  cb();
});
