/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 16:46:57
 * @LastEditTime: 2019-09-03 17:04:16
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

app.use(views(path.join(__dirname, './views'), { extension: 'pug' }));
app.use(static(config.static));

app.use(router.routes());
app.listen(9000);
