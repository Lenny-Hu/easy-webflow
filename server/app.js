/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 16:46:57
 * @LastEditTime: 2019-09-03 11:18:12
 * @LastEditors: Please set LastEditors
 */

const Koa = require('koa');

const path = require('path');
const views = require('koa-views');
const static = require('koa-static');

const app = new Koa();

const router = require('./router');

let config = process.env.NODE_ENV == 'production' ? {
  view: path.join(__dirname, './views'),
  static: path.join(__dirname, '../app')
} : {
  view: path.join(__dirname, './views'),
  static: path.join(__dirname, '../app')
};

app.use(views(config.view, { extension: 'pug' }));
app.use(static(config.static));



app.use(router.routes());
app.listen(9000);
