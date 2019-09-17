/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 15:50:28
 * @LastEditTime: 2019-09-17 13:29:36
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const replace = require('gulp-replace');
const rev = require('gulp-rev'); // 添加hash后缀
const revCollector = require('gulp-rev-collector'); // 根据rev生成的manifest.json文件中的映射, 去替换文件名称, 也可以替换路径
const override = require('gulp-rev-css-url'); // 替换html\css文件中的url路径为资源被hash后的新路径
const revdel = require('gulp-rev-delete-original'); // 删除rev使用的原始资源
const config = require('../default-config');

// 缓存处理方式1：文件名称添加哈希
gulp.task('cache-hash-rev', () => {
  return gulp.src([
    `${config.dest}/${config.src.app}/**/*`
    // `./dist/app/**/*.css`,
    // `./dist/app/**/*.js`,
    // `./dist/app/**/*.png`,
    // `./dist/app/**/*.jpg`,
    // `./dist/app/**/*.jpeg`,
    // `./dist/app/**/*.gif`,
    // `./dist/app/fonts/**/*`
  ], {
    base: `${config.dest}/${config.src.app}`
  })
    .pipe(rev())
    .pipe(override()) // 替换html\css文件中的url路径为资源被hash后的新路径
    .pipe(revdel()) // 删除生成缓存的原始资源
    .pipe(gulp.dest(`${config.dest}/${config.src.app}`))
    .pipe(rev.manifest()) // 生成文件映射
    .pipe(gulp.dest(`${config.dest}/rev`)); // 将映射文件导出
});

gulp.task('cache-hash-replace', () => {
  return gulp.src([`${config.dest}/rev/**/*.json`, `${config.dest}/${config.src.server}/views/**/*.pug`], {
  }).pipe(revCollector({
    replaceReved: true
  })).pipe(gulp.dest(`${config.dest}/${config.src.server}/views`));
});

gulp.task('cache-hash', gulp.series('cache-hash-rev', 'cache-hash-replace'));

// 缓存处理方式2：添加时间戳查询参数，基于gulp-replace，暂不能替换css中字体图标的引用
gulp.task('cache-query-css', () => {
  return gulp.src([
    `${config.dest}/${config.src.app}/**/*.css`
  ], {
    base: `${config.dest}/${config.src.app}`
  })
    .pipe(replace(new RegExp('(url\\(["\']?\\S+\\.)(jpg|gif|png)(["\']?\\))', 'ig'), `$1$2?v=${Date.now()}$3`))
    .pipe(gulp.dest(`${config.dest}/${config.src.app}`));
});

gulp.task('cache-query-view', () => {
  return gulp.src([
    `${config.dest}/${config.src.server}/views/**/*.pug`
  ], {
    base: `${config.dest}/${config.src.server}/views`
  })
    .pipe(replace(new RegExp('(href|src=["\'])(\\S+\\.)(css|js|jpg|png|gif)(["\'])', 'gi'), `$1$2$3?v=${Date.now()}$4`))
    .pipe(gulp.dest(`${config.dest}/${config.src.server}/views`));
});

gulp.task('cache-query', gulp.parallel('cache-query-view', 'cache-query-css'));
