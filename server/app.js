/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 16:46:57
 * @LastEditTime: 2019-09-10 16:41:28
 * @LastEditors: Please set LastEditors
 */

const Koa = require('koa');

const path = require('path');
const views = require('koa-views');
const static = require('koa-static');

const app = new Koa();

const config = require('../config')[process.env.NODE_ENV];
const router = require('./router');

console.log('[环境和配置]', process.env.NODE_ENV, config);

app.use(views(config.view, { extension: 'pug' }));
app.use(static(config.static));

app.use(router.routes());
app.listen(config.prot, (e) => {
  console.log('[启动监听完成]', config.prot);
});

