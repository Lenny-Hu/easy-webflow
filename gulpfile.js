/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:17:41
 * @LastEditTime: 2019-09-03 16:19:39
 * @LastEditors: Please set LastEditors
 */
const fs = require('fs');

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const spritesmith = require('gulp.spritesmith');
const image = require('gulp-image');
const del = require('del');

const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

const config = require('./config');

// 清理
gulp.task('clean', function () {
  return del([
    'dist/**/*',
    'app/css/**/*',
    'app/js/**/*'
  ]);
});

// 图片优化(仅生产环境)
gulp.task('image', function () {
  return gulp.src(['./app/images/**/*', '!./app/images/sprite/*'], {
    base: './app'
  })
    .pipe(image())
    .pipe(gulp.dest('./dist/'));
});

// 雪碧图
gulp.task('sprite', function () {
  var spriteData = gulp.src('./app/images/sprites/*.png').pipe(image()).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('./dist/styles/'));
});

// sass编译

// es6编译

// 资源拷贝(生产环境)
gulp.task('copy', () => {

});

// sftp

// 文件监听

// 缓存

gulp.task('default', gulp.series('clean'));
