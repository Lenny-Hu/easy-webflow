/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 11:15:39
 * @LastEditTime: 2019-09-19 15:33:21
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const gulpif = require('gulp-if');
const config = require('../default-config');

const { sass } = require('../lib/sass');

// sass编译
gulp.task('sass', () => {
  return sass(
    `${config._src.style}/**/*.scss`,
    `${config._src.css}`,
    {
      src: {
        base: `${config._src.style}`
      },
      stylelintConfig: config.stylelintConfig
    }
  )
  // 页面内会引用相关css，生产环境打包时，需要输出两份
    .pipe(gulpif(
      config.isProd,
      gulp.dest(`${config._dest.css}`)
    ));
});
