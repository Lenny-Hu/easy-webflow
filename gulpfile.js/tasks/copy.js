/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 11:31:48
 * @LastEditTime: 2019-09-17 16:42:20
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
    `${config._src.lib}/**/*`,
    `${config._src.font}/**/*`,
    `!${config._src.lib}/README.md`
  ], {
    base: config._src.public
  })
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', postcss([cssnano()])))
    .pipe(gulp.dest(`${config._dest.public}`));
});

// 拷贝后端资源文件(生产环境)
gulp.task('copy-server', () => {
  return gulp.src([
    `${config._src.root}/**/*`,
    `!${config._src.root}/public`,
    `!${config._src.root}/public/**/*`,
    `!${config._src.root}/views`,
    `!${config._src.root}/views/**/*`,
    `!${config._src.root}/node_modules`,
    `!${config._src.root}/node_modules/**/*`
  ], {
    base: config._src.root
  })
    .pipe(gulp.dest(`${config._dest.root}`));
});
