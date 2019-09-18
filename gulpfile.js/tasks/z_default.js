/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:17:41
 * @LastEditTime: 2019-09-18 17:16:36
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const _ = require('lodash');
const config = require('../default-config');
let tasks = null;

if (config.isProd) {
  tasks = gulp.series(
    'before', 'clean', 'image', 'sprite',
    gulp.parallel('sass', 'webpack', 'copy', 'copy-server'),
    'view', 'cache-hash',
    // 'sftp'
    'after'
  );
} else {
  tasks = gulp.series(
    'before', 'clean', 'sprite',
    gulp.parallel('sass', 'webpack', 'server'),
    'after'
  );

  // 文件监听
  gulp.watch(`${config._src.style}/**/*.scss`, gulp.series('sass'));
  gulp.watch(`${config._src.image}/sprites/**/*.png`, gulp.series('sprite'));

  // 监听文件事件
  // 压缩图片、压缩样式、压缩js、编译js、sftp、sass、拷贝、删除、
  // 缓存
  if (config.watch && _.isFunction(config.watch.cb)) {
    let globs = [
      `!${config._src.public}/node_modules/**/*`,
      `!${config._src.root}/node_modules/**/*`
    ];

    if (_.isArray(config.watch.globs) && config.watch.globs.length) {
      globs = config.watch.globs.concat(globs);
    } else {
      globs.unshift(`${config._src.root}/**/*`);
    }

    const watcher = gulp.watch(globs, { delay: 500 });
    config.watch.cb(watcher, config);
  }
}

gulp.task('default', tasks);
