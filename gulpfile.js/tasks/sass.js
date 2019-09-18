/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 11:15:39
 * @LastEditTime: 2019-09-18 17:21:54
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
// const sass = require('gulp-sass');
// sass.compiler = require('node-sass');
// const postcss = require('gulp-postcss');
// const autoprefixer = require('autoprefixer');
// const cssnano = require('cssnano'); // 优化css
// const gulpCache = require('gulp-cached'); // 只传递更改过的文件，减少编译时间
const gulpif = require('gulp-if');
const config = require('../default-config');

const { sass } = require('../lib/sass');

// sass编译
gulp.task('sass', () => {
  return sass(
    `${config._src.style}/**/*.scss`,
    `${config._src.css}`,
    {
      base: `${config._src.style}`
    }
  )
  // 页面内会引用相关css，生产环境打包时，需要输出两份
    .pipe(gulpif(
      config.isProd,
      gulp.dest(`${config._dest.css}`)
    ));
});
