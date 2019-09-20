/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 11:24:53
 * @LastEditTime: 2019-09-20 17:30:25
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const path = require('path');
const utils = require('../lib/utils');
const config = require('../default-config');
const { es6 } = require('../lib/webpack');

// es6编译 => ie9+
gulp.task('webpack', (cb) => {
  es6(`${config._src.script}/**/*.*(ts|tsx|js)`, path.resolve(config._src.js), {
    webpack: config.webpack,
    base: config._src.script
  }, () => {
    // 生产环境下，将输出的js拷贝到生产环境目录
    if (config.isProd) {
      utils.copy(
        `${config._src.js}/**/*.js`,
        `${config._dest.js}`,
        {
          base: config._src.js
        }
      ).on('end', cb);
    } else {
      cb();
    }
  });
});
