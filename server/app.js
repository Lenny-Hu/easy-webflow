/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 16:46:57
 * @LastEditTime: 2019-09-02 18:16:30
 * @LastEditors: Please set LastEditors
 */

const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const views = require('koa-views');
const static = require('koa-static');

const app = new Koa();
const router = new Router();

let config = process.env.NODE_ENV == 'production' ? {
  view: path.join(__dirname, './views'),
  static: path.join(__dirname, '../app/src')
} : {
  view: path.join(__dirname, './views'),
  static: path.join(__dirname, '../app/src')
};

app.use(views(config.view, { extension: 'pug' }));
app.use(static(config.static));

router.get('/', async (ctx, next) => {
  await ctx.render('index', { title: '首页' });
});

app.use(router.routes());
app.listen(9000);
