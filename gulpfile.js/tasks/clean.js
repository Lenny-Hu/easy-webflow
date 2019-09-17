/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 16:52:10
 * @LastEditTime: 2019-09-17 10:20:54
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const { del } = require('../lib/del'); // 文件删除
const { Logger } = require('../lib/logger');
const config = require('../default-config');

const logger = new Logger(config);

gulp.task('clean', async (cb) => {
  let globs = [
    `${config.src.app}/${config.temp.css}/**/*`,
    `${config.src.app}/${config.temp.js}/**/*`
  ];
  if (config.isProd) {
    globs.push(`${config.dest}/**/*`);
  }

  let res = await del(globs);
  logger.info('[清理文件]', res);
  cb();
});
