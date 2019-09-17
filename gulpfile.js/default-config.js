/*
 * @Description: 默认配置文件
 * @Author: your name
 * @Date: 2019-09-12 14:43:03
 * @LastEditTime: 2019-09-17 10:49:55
 * @LastEditors: Please set LastEditors
 */
const _ = require('lodash');
const config = require('../config/index');
const { Logger } = require('./lib/logger');

const base = {
  src: {
    app: 'app',
    server: 'server',
    view: 'views',
    css: 'styles',
    script: 'scripts',
    lib: 'lib',
    image: 'images',
    font: 'fonts'
  },
  temp: {
    css: 'css',
    js: 'js'
  },
  dest: 'dist',
  isProd: global.IS_PROD,
  debug: false
};

const server = {
  browsersync: { // http://www.browsersync.cn/docs/options/
    open: true,
    files: [
      `${base.src.app}/${base.temp.css}/**/*.css`,
      `${base.src.app}/${base.temp.js}/**/*.js`,
      `${base.src.app}/lib/**/*`,
      `${base.src.app}/images/**/*`,
      `${base.src.app}/fonts/**/*`,
      `${base.src.server}/views/**/*.pug`
    ],
    server: {
      baseDir: base.src.app
    },
    notProxyUrls: [ // 不代理的静态资源路径
      `/${base.temp.css}`,
      `/${base.temp.js}`,
      `/${base.src.image}`,
      '/node_modules',
      `/${base.src.lib}`,
      `/${base.src.font}`
    ]
  }
};

const res = _.merge(base, server, config[process.env.NODE_ENV]);
const logger = new Logger(res);

logger.info(`[环境]`, process.env.NODE_ENV);
logger.info('[配置]', res);

module.exports = res;
