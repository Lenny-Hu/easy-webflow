/*
 * @Description: 默认配置文件
 * @Author: your name
 * @Date: 2019-09-12 14:43:03
 * @LastEditTime: 2019-09-18 15:03:01
 * @LastEditors: Please set LastEditors
 */
const _ = require('lodash');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

if (typeof argv.config !== 'string') {
  console.error('[配置文件错误] --config 参数为必传参数');
  process.exit(1);
}

const config = require(path.resolve(process.cwd(), argv.config));
// const config = require('../config/index');
const userConfig = config[process.env.NODE_ENV];
const { Logger } = require('./lib/logger');
const utils = require('./lib/utils');

const base = {
  src: {
    root: 'app',
    public: 'public',
    view: 'views',
    style: 'styles',
    script: 'scripts',
    lib: 'lib',
    image: 'images',
    font: 'fonts',
    css: 'css',
    js: 'js'
  },
  dest: 'dist',
  isProd: global.IS_PROD,
  debug: false
};

let res = _.merge(base, userConfig);
// 合并得到常用路径 - 源代码目录
Object.keys(res.src).forEach((k) => {
  if (!res._src) {
    res._src = {};
  }

  switch (k) {
    case 'root':
      res._src[k] = res.src.root;
      break;

    case 'public':
      res._src[k] = utils.joinPath(res.src.root, res.src.public);
      break;

    case 'view':
      res._src[k] = utils.joinPath(res.src.root, res.src.view);
      break;

    default:
      res._src[k] = utils.joinPath(res.src.root, res.src.public, res.src[k]);
      break;
  }
});
// 打包后的目录
Object.keys(res._src).forEach((k) => {
  if (!res._dest) {
    res._dest = {};
  }
  res._dest[k] = res._src[k].replace(res.src.root, res.dest);
})

const server = {
  browsersync: { // http://www.browsersync.cn/docs/options/
    open: true,
    files: [
      `${res._src.public}/**/*`,
      `${res._src.view}/**/*`
    ],
    server: {
      baseDir: res._src.public
    },
    notProxyUrls: [ // 不代理的静态资源路径
      `/${res.src.css}`,
      `/${res.src.js}`,
      `/${res.src.image}`,
      '/node_modules',
      `/${res.src.lib}`,
      `/${res.src.font}`
    ]
  }
};

res = _.merge(res, server, _.pick(userConfig, 'browsersync'));

const logger = new Logger(res);
logger.info(`[环境]`, process.env.NODE_ENV);
logger.info('[配置]', res);

module.exports = res;
