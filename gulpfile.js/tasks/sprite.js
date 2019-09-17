/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 10:58:00
 * @LastEditTime: 2019-09-17 11:13:14
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
const config = require('../default-config');

// 雪碧图
gulp.task('sprite', () => {
  let spriteData = gulp.src(`${config.src.app}/${config.src.image}/sprites/*.png`).pipe(spritesmith({
    imgName: `${config.src.image}/sprite.png`,
    cssName: `${config.temp.css}/sprite.css`,
    padding: 2
  }))

  let imgStream = spriteData.img
    .pipe(buffer())
    .pipe(gulpif(config.isProd, image())) // 生产环境压缩
    .pipe(gulpif(
      config.isProd,
      gulp.dest(`${config.dest}/${config.src.app}`),
      gulp.dest(`${config.src.app}`)
    ));

  // 由于雪碧图css会被页面引用最后打包，所以生产模式下要同时输出到css和dist下的css目录中
  let cssStream = spriteData.css
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest(config.src.app))
    .pipe(gulpif(config.isProd, gulp.dest(`${config.dest}/${config.src.app}`)));
  
  return merge(imgStream, cssStream);
});

