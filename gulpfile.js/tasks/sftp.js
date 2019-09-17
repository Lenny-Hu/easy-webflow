/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 13:33:32
 * @LastEditTime: 2019-09-17 17:30:25
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const sftp = require('gulp-sftp');
const config = require('../default-config');

// sftp
gulp.task('sftp', () => {
  console.log(config.sftp);
  return gulp.src(`${config._dest.root}/**/*`)
    .pipe(sftp(config.sftp));
});
