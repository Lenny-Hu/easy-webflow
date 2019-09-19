/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 13:33:32
 * @LastEditTime: 2019-09-19 10:19:08
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const { sftp } = require('../lib/sftp');
const config = require('../default-config');

// sftp
gulp.task('sftp', () => {
  console.log('使用的配置', config.sftp);
  return sftp(`${config._dest.root}/**/*`, config.sftp);
});
