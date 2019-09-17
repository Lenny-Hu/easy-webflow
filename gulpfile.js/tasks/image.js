/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 10:50:37
 * @LastEditTime: 2019-09-17 14:26:56
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const image = require('gulp-image'); // 图片压缩
const config = require('../default-config');

// 图片优化(仅生产环境)
gulp.task('image', () => {
  return gulp.src([
    `${config.src.app}/${config.src.image}/**/*`,
    `!${config.src.app}/${config.src.image}/sprites/*`
  ], {
    base: config.src.app
  })
    .pipe(image())
    .pipe(gulp.dest(`${config.dest}/${config.src.app}`));
});
