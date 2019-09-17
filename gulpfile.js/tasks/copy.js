/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 11:31:48
 * @LastEditTime: 2019-09-17 11:36:10
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const gulpif = require('gulp-if');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano'); // 优化css
const uglify = require('gulp-uglify');
const config = require('../default-config');

// 资源拷贝(生产环境)
gulp.task('copy', () => {
  return gulp.src([
    `${config.src.app}/${config.src.lib}/**/*`,
    `${config.src.app}/${config.src.font}/**/*`,
    `!${config.src.app}/${config.src.lib}/README.md`
  ], {
    base: config.src.app
  })
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', postcss([cssnano()])))
    .pipe(gulp.dest(`${config.dest}/${config.src.app}`));
});
