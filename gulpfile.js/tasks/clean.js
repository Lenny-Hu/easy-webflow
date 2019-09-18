/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 16:52:10
 * @LastEditTime: 2019-09-18 16:43:14
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const { del } = require('../lib/utils'); // 文件删除
const { Logger } = require('../lib/logger');
const config = require('../default-config');

const logger = new Logger(config);

gulp.task('clean', async (cb) => {
  let globs = [
    `${config._src.css}/**/*`,
    `${config._src.js}/**/*`
  ];
  if (config.isProd) {
    globs.push(`${config._dest.root}/**/*`);
  }
  let res = await del(globs);
  logger.info('[清理文件]', res);
  cb();
});
