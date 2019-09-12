/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 10:47:55
 * @LastEditTime: 2019-09-12 14:19:43
 * @LastEditors: Please set LastEditors
 */
// 日志打印
const dayjs = require('dayjs');
const c = require('ansi-colors');
// const chalk = require('chalk');

class Logger {
  constructor (config) {
    this.config = config;
    this.debug = config.debug;
    this.map = {
      log: 'green',
      info: 'cyan',
      warn: 'yellow',
      error: 'red'
    };

    this.init();
  }

  now (format = 'HH:mm:ss') {
    return `[${c.gray(dayjs().format(format))}] `;
  }

  init () {
    const _this = this;
    Object.keys(this.map).forEach((k) => {
      _this[k] = (...args) => {
        if (k === 'log' && !_this.debug) {
          return false;
        }

        let arr = args.map((v) => {
          return typeof v === 'string' ? c[_this.map[k]](v) : v;
        });

        arr.unshift(_this.now());
        console[k](...arr);
      }
    });
  }
}

module.exports = {
  Logger,
  c
};
