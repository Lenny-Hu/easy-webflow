/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 11:12:57
 * @LastEditTime: 2019-09-03 11:39:02
 * @LastEditors: Please set LastEditors
 */
const Router = require('koa-router');
const router = new Router();

const config = require('./config');

config.forEach((v, i) => {
  router[v.type](v.path, ...v.middlewares);
});

module.exports = router;
