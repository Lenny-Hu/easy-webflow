/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:17:41
 * @LastEditTime: 2019-09-19 13:35:24
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const _ = require('lodash');
const config = require('../default-config');
let tasks = ['before'];

if (config.isProd) {

  // 默认任务
  if (config.useDefault) {
    tasks = tasks.concat([
      'clean', 'image', 'sprite',
      gulp.parallel('sass', 'webpack', 'copy', 'copy-server'),
      'view', 'cache-query', 'sftp'
    ]);      
  }

} else {

  // 默认任务
  if (config.useDefault) {
    tasks = tasks.concat([
      'clean', 'sprite',
      gulp.parallel('sass', 'webpack', 'server')
    ]);

    // 文件监听
    gulp.watch(`${config._src.style}/**/*.scss`, gulp.series('sass'));
    gulp.watch(`${config._src.image}/sprites/**/*.png`, gulp.series('sprite'));
  }

  // 监听文件事件
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

tasks.push('after');

gulp.task('default', gulp.series(...tasks));
