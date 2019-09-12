/*
 * @Description: 本地静态资源服务器
 * @Author: your name
 * @Date: 2019-09-12 14:38:10
 * @LastEditTime: 2019-09-12 16:00:51
 * @LastEditors: Please set LastEditors
 */
const browserSync = require('browser-sync').create();
const _ = require('lodash');
const request = require('request');

const _default = require('./default');
const { Logger } = require('./logger');

class Server {
  constructor (config, options = {}) {
    this.options = _.merge(_default.browsersync, options);
    this.config = config;
    this.logger = new Logger(config);
  }

  middleware (req, res, next) {
    let notProxy = this.options.notProxyUrls.some(v => req.url.startsWith(v));

    this.logger.info('[browsersync]', req.method, req.url, '=>', notProxy ? '本地' : '代理');
    if (notProxy) {
      next();
    } else {
      req.pipe(request[req.method.toLowerCase()](`http://${this.config.host}:${this.config.prot}${req.url}`)).pipe(res);
    }
  }

  init () {
    this.options.server.middleware = [ this.middleware.bind(this) ];
    browserSync.init(this.options);
  }
}

module.exports = {
  Server,
  browserSync
};