/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 17:36:05
 * @LastEditTime: 2019-09-18 17:59:32
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const image = require('gulp-image'); // 图片压缩
const spritesmith = require('gulp.spritesmith'); // 生成雪碧图
const buffer = require('vinyl-buffer');
const merge = require('merge-stream');
const postcss = require('gulp-postcss');
const gulpif = require('gulp-if');
const cssnano = require('cssnano');

module.exports = {
  imagemin (src, dest, options = { src: {}, image: {} }) {
    return gulp.src(src, options.src)
      .pipe(image(options.image))
      .pipe(gulp.dest(dest));
  },
  sprite (src, dest, options = { src: {}, image: {}, sprite: {} }) {
    let spriteData = gulp.src(src).pipe(spritesmith(options.sprite));

    let imgStream = spriteData.img
      .pipe(buffer())
      .pipe(gulpif(global.IS_PROD, image(options.image))) // 生产环境压缩
      .pipe(gulp.dest(dest));

    let cssStream = spriteData.css
      .pipe(postcss([cssnano()]))
      .pipe(gulp.dest(dest));

    return merge(imgStream, cssStream);
  }
};