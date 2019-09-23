/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 16:57:10
 * @LastEditTime: 2019-09-23 14:34:08
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano'); // 优化css
const gulpCache = require('gulp-cached'); // 只传递更改过的文件，减少编译时间
const postcssCssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');
const gulpif = require('gulp-if');
// const stylelint = require('stylelint');
const gulpStylelint = require('gulp-stylelint');

module.exports = {
  sass (src, dest, options = { src: {}, stylelintConfig: {} }) {
    let plugins = [
      postcssCssnext,
      postcssReporter({ clearReportedMessages: true })
    ];
    global.IS_PROD && plugins.push(cssnano());

    return gulp.src(src, options.src)
      .pipe(gulpCache('sass'))
      .pipe(gulpif(options.stylelintConfig, gulpStylelint({
        config: options.stylelintConfig,
        syntax: 'scss',
        reporters: [
          { formatter: 'string', console: true }
        ]
      })))
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // 输出标准格式，方便后处理
      .pipe(postcss(plugins))
      .pipe(gulp.dest(dest));
  },
  cssmin (src, dest, options = { src: {}, stylelintConfig: {} }) {
    return gulp.src(src, options.src)
      .pipe(gulpif(options.stylelintConfig, gulpStylelint({
        config: options.stylelintConfig,
        syntax: 'css',
        reporters: [
          { formatter: 'string', console: true }
        ]
      })))
      .pipe(postcss([
        postcssCssnext,
        postcssReporter({ clearReportedMessages: true }),
        cssnano()
      ]))
      .pipe(gulp.dest(dest));
  }
};
