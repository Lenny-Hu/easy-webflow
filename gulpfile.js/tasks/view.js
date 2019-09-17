/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 11:37:43
 * @LastEditTime: 2019-09-17 11:48:03
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const gulpif = require('gulp-if');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify');
const cssnano = require('cssnano'); // 优化css
const useref = require('gulp-useref');
const path = require('path');
const config = require('../default-config');
const { del } = require('../lib/del');
const { Logger } = require('../lib/logger');
const logger = new Logger(config);

// 处理视图（生产环境）
gulp.task('view-build', () => {
  // 将视图拷贝到dist目录
  return gulp.src([
    `${config.src.server}/views/**/*.pug`
  ], {
    base: `${config.src.server}/views`
  })
    .pipe(useref({
      searchPath: config.src.app // 搜索页面引用资源的路径
    }))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', postcss([cssnano()])))
    .pipe(gulp.dest(`${config.dest}/${config.src.server}/views`));
});

// 拷贝视图产生的静态资源到app目录（生产环境）
gulp.task('view-static', () => {
  let globs = [
    path.normalize(`${config.dest}/${config.src.server}/views/css/**/*`),
    path.normalize(`${config.dest}/${config.src.server}/views/js/**/*`)
  ];
  return gulp.src(globs, {
    base: `${config.dest}/${config.src.server}/views`
  })
    .pipe(gulp.dest(`${config.dest}/${config.src.app}`));
});

gulp.task('view-clean', async (cb) => {
  let globs = [
    `${config.dest}/${config.src.server}/views/css`,
    `${config.dest}/${config.src.server}/views/js`
  ];

  let deletedPaths = await del(globs);
  logger.info('[清理临时文件]', deletedPaths);
  cb();
});

gulp.task('view', gulp.series('view-build', 'view-static', 'view-clean'));
