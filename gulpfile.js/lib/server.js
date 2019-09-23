/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 10:30:23
 * @LastEditTime: 2019-09-23 14:01:28
 * @LastEditors: Please set LastEditors
 */
const browserSync = require('browser-sync').create();
const _ = require('lodash');
const request = require('request');
const { Logger } = require('../lib/logger');

class Server {
  constructor (config, options = {}) {
    this.options = _.merge(config.browsersync, options);
    this.logger = new Logger(config);
    this.baseUrl = `http://${config.host}:${config.port || 80}`;
    this.logger.info('[browsersync]', '代理服务地址', this.baseUrl);
  }

  proxy (req, res, next) {
    let notProxy = this.options.notProxyUrls.some(v => req.url.startsWith(v));

    this.logger.info('[browsersync]', req.method, req.url, '=>', notProxy ? '本地' : '代理');
    if (notProxy) {
      next();
    } else {
      req.pipe(request[req.method.toLowerCase()](`${this.baseUrl}${req.url}`)).pipe(res);
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
