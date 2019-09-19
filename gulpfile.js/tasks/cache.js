/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 15:50:28
 * @LastEditTime: 2019-09-19 11:11:49
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const cache = require('../lib/cache');
const config = require('../default-config');

// 缓存处理方式1：文件名称添加哈希
gulp.task('cache-hash-rev', () => {
  return cache.rev(
    `${config._dest.public}/**/*`,
    config._dest.public,
    {
      src: {
        base: config._dest.public
      },
      manifest: `${config._dest.root}/rev`
    }
  );
});

gulp.task('cache-hash-replace', () => {
  return cache.revReplace(
    [`${config._dest.root}/rev/**/*.json`, `${config._dest.view}/**/*.pug`],
    config._dest.view
  );
});

gulp.task('cache-hash', gulp.series('cache-hash-rev', 'cache-hash-replace'));

// 缓存处理方式2：添加时间戳查询参数，基于gulp-replace，暂不能替换css中字体图标的引用
gulp.task('cache-query-css', () => {
  return cache.cssByQuery(
    `${config._dest.public}/**/*.css`,
    config._dest.public,
    {
      base: config._dest.public
    }
  );
});

gulp.task('cache-query-view', () => {
  return cache.viewByQuery(
    `${config._dest.view}/**/*.pug`,
    config._dest.view,
    {
      base: config._dest.view
    }
  );
});

gulp.task('cache-query', gulp.parallel('cache-query-view', 'cache-query-css'));
