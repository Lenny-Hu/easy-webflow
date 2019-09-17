/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 11:15:39
 * @LastEditTime: 2019-09-17 16:17:26
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano'); // 优化css
const gulpCache = require('gulp-cached'); // 只传递更改过的文件，减少编译时间
const gulpif = require('gulp-if');
const config = require('../default-config');

// sass编译
gulp.task('sass', () => {
  let plugins = [
    autoprefixer({ overrideBrowserslist: ['cover 99.5%'] })
  ];
  config.isProd && plugins.push(cssnano());

  return gulp.src([
    `${config._src.style}/**/*.scss`
  ], {
    base: `${config._src.style}`
  })
    .pipe(gulpCache('sass'))
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // 输出标准格式，方便后处理
    .pipe(postcss(plugins))
    .pipe(gulp.dest(`${config._src.css}`))
    // 页面内会引用相关css，生产环境打包时，需要输出两份
    .pipe(gulpif(
      config.isProd,
      gulp.dest(`${config._dest.css}`)
    ));
});
