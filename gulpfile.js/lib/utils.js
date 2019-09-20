/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 15:59:06
 * @LastEditTime: 2019-09-20 10:50:44
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const del = require('del');

module.exports = {
  joinPath (...args) {
    return args.join('/');
  },
  copy (src, dest, options = {}) {
    return gulp.src(src, options).pipe(gulp.dest(dest));
  },
  async del (globs, options = {}) {
    let deletedPaths = await del(globs, options);
    return Promise.resolve(deletedPaths);
  }
};
