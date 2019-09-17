/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 16:46:57
 * @LastEditTime: 2019-09-17 14:59:46
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

app.use(views(path.resolve('./views'), { extension: 'pug' }));
app.use(static(path.resolve('./public')));

app.use(router.routes());
app.listen(config.prot, (e) => {
  console.log('[启动监听完成]', config.prot);
});

