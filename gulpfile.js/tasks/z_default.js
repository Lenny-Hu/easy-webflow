/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:17:41
 * @LastEditTime: 2019-09-17 16:51:44
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const config = require('../default-config');
let tasks = null;

if (config.isProd) {
  tasks = gulp.series(
    'clean', 'image', 'sprite',
    gulp.parallel('sass', 'webpack', 'copy', 'copy-server'),
    'view', 'cache-hash'
    // 'sftp'
  );
} else {
  tasks = gulp.series(
    'clean', 'sprite',
    gulp.parallel('sass', 'webpack', 'server')
  );

  // 文件监听
  gulp.watch(`${config.src.app}/${config.src.css}/**/*.scss`, gulp.series('sass'));
  gulp.watch(`${config.src.app}/${config.src.image}/sprites/**/*.png`, gulp.series('sprite'));
}

gulp.task('default', tasks);
