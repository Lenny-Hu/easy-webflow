/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 09:43:15
 * @LastEditTime: 2019-09-19 10:02:33
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const named = require('vinyl-named');
const webpack = require('webpack-stream');
const path = require('path');
const _ = require('lodash');
const uglify = require('gulp-uglify');
const webpackConfig = require('../../webpack.config'); 

module.exports = {
  es6 (src, dest, options = { src: {}, webpack: {} }) {
    const _webpackConfig = _.merge(webpackConfig, options.webpack);

    return gulp.src(src, options.src)
      .pipe(named((file) => {
        // 让scripts目录下的每个js文件单独输出到对应的js目录下
        let [ filePath ] = file.history;
        let dir = path.join(file._cwd, file._base);
        let extname = path.extname(filePath);
        filePath = filePath.replace(dir, '').slice(1, -(extname.length));
        return filePath;
      }))
      .pipe(webpack(_webpackConfig))
      .pipe(gulp.dest(dest));
  },
  jsmin (src, dest, options = { src: {}, uglify: {} }) {
    return gulp.src(src, options.src)
      .pipe(uglify(options.uglify))
      .pipe(gulp.dest(dest));
  }
}
