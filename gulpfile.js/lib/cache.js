/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 10:55:07
 * @LastEditTime: 2019-09-19 11:19:59
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const replace = require('gulp-replace');
const rev = require('gulp-rev'); // 添加hash后缀
const revCollector = require('gulp-rev-collector'); // 根据rev生成的manifest.json文件中的映射, 去替换文件名称, 也可以替换路径
const override = require('gulp-rev-css-url'); // 替换html\css文件中的url路径为资源被hash后的新路径
const revdel = require('gulp-rev-delete-original'); // 删除rev使用的原始资源
const dayjs = require('dayjs');
const nowTime = dayjs().format('YYYYMMDDHHmmss');

module.exports = {
  cssByQuery (src, dest, options = {}) {
    return gulp.src(src, options)
      .pipe(replace(new RegExp('(url\\(["\']?\\S+\\.)(jpg|gif|png)(["\']?\\))', 'ig'), `$1$2?v=${nowTime}$3`))
      .pipe(gulp.dest(dest));
  },
  viewByQuery (src, dest, options = {}) {
    return gulp.src(src, options)
      .pipe(replace(new RegExp('(href|src=["\'])(\\S+\\.)(css|js|jpg|png|gif)(["\'])', 'gi'), `$1$2$3?v=${nowTime}$4`))
      .pipe(gulp.dest(dest));
  },
  rev (src, dest, options = { src: {}, manifest: '' }) {
    return gulp.src(src, options.src)
      .pipe(rev())
      .pipe(override()) // 替换html\css文件中的url路径为资源被hash后的新路径
      .pipe(revdel()) // 删除生成缓存的原始资源
      .pipe(gulp.dest(dest))
      .pipe(rev.manifest()) // 生成文件映射
      .pipe(gulp.dest(options.manifest)); // 将映射文件导出
  },
  revReplace (src, dest, options = {}) {
    return gulp.src(src, options).pipe(revCollector({
      replaceReved: true
    })).pipe(gulp.dest(dest));
  }
};