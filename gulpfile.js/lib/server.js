/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 10:30:23
 * @LastEditTime: 2019-09-17 10:34:17
 * @LastEditors: Please set LastEditors
 */
const browserSync = require('browser-sync').create();
const _ = require('lodash');
const request = require('request');
const { Logger } = require('../lib/logger');

class Server {
  constructor (config, options = {}) {
    this.options = _.merge(config.browsersync, options);
    this.config = config;
    this.logger = new Logger(config);
  }

  proxy (req, res, next) {
    let notProxy = this.options.notProxyUrls.some(v => req.url.startsWith(v));

    this.logger.info('[browsersync]', req.method, req.url, '=>', notProxy ? '本地' : '代理');
    if (notProxy) {
      next();
    } else {
      req.pipe(request[req.method.toLowerCase()](`http://${this.config.host}:${this.config.prot}${req.url}`)).pipe(res);
    }
  }

  init () {
    this.options.server.middleware = [ this.proxy.bind(this) ];
    browserSync.init(this.options);
  }
}

module.exports = {
  Server,
  browserSync
};
