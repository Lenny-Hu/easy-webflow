/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 11:10:32
 * @LastEditTime: 2019-09-18 15:28:03
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const _ = require('lodash');
const { Logger } = require('../lib/logger');
const config = require('../default-config');

const logger = new Logger(config);

gulp.task('before', (cb) => {
  if (_.isFunction(config.before)) {
    logger.info('[before default]', '...');
    config.before(config, cb);
  } else {
    cb();
  }
});

gulp.task('after', (cb) => {
  logger.log(_.isFunction(config.after));
  if (_.isFunction(config.after)) {
    logger.info('[after default]', '...');
    config.after(config, cb);
  } else {
    cb();
  }
});
