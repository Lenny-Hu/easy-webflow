/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 11:24:53
 * @LastEditTime: 2019-09-19 09:58:24
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const gulpif = require('gulp-if');
const config = require('../default-config');
const { es6 } = require('../lib/webpack');

// es6编译 => ie9+
gulp.task('webpack', () => {
  return es6(
    `${config._src.script}/**/*.js`,
    `${config._src.js}`,
    {
      src: {
        base: `${config._src.script}`
      }
    })
    // 由于存在页面中直接引用css js资源，所以编译css\js时。必定要输出资源到app目录下，避免useref时出现问题
    .pipe(gulpif(
      config.isProd,
      gulp.dest(`${config._dest.js}`)
    ));
});
