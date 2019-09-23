/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 13:33:32
 * @LastEditTime: 2019-09-23 10:21:29
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const { sftp } = require('../lib/sftp');
const config = require('../default-config');

// sftp
gulp.task('sftp', () => {
  if (config.sftp && config.sftp.user) {
    return sftp(`${config._dest.root}/**/*`, config.sftp);
  } else {
    return Promise.resolve();
  }
});
