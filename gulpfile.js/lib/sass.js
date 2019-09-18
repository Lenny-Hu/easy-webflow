/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 16:57:10
 * @LastEditTime: 2019-09-18 17:25:48
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano'); // 优化css
const gulpCache = require('gulp-cached'); // 只传递更改过的文件，减少编译时间

module.exports = {
  sass (src, dest, options = {}) {
    let plugins = [
      autoprefixer({ overrideBrowserslist: ['cover 99.5%'] })
    ];
    global.IS_PROD && plugins.push(cssnano());

    return gulp.src(src, options)
      .pipe(gulpCache('sass'))
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // 输出标准格式，方便后处理
      .pipe(postcss(plugins))
      .pipe(gulp.dest(dest));
  }
};
