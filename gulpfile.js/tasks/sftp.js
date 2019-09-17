/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 13:33:32
 * @LastEditTime: 2019-09-17 13:33:32
 * @LastEditors: your name
 */
const gulp = require('gulp');
const sftp = require('gulp-sftp');
const config = require('../default-config');

// sftp
gulp.task('sftp', () => {
  return gulp.src('./dist/**/*')
    .pipe(sftp({ ...config.sftp }));
});
