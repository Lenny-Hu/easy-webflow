/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 10:05:47
 * @LastEditTime: 2019-09-19 10:09:31
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const sftp = require('gulp-sftp');

module.exports = {
  sftp (src, config) {
    return gulp.src(src)
      .pipe(sftp(config));
  }
};
