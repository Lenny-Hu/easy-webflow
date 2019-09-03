/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 11:18:25
 * @LastEditTime: 2019-09-03 14:22:11
 * @LastEditors: Please set LastEditors
 */

const setViewData = (ctx, routes, data) => {
  return Object.assign(data, {
    routes,
    path: ctx.request.path
  });
}

const routes = [
  {
    type: 'get',
    title: '首页',
    path: '/',
    middlewares: [
      async (ctx, next) => {
        await ctx.render('index', setViewData(ctx, routes, { title: '首页' }));
      }
    ]
  },
  {
    type: 'get',
    title: '其它',
    path: '/other',
    middlewares: [
      async (ctx, next) => {
        await ctx.render('other', setViewData(ctx, routes, { title: '其它' }));
      }
    ]
  },
  {
    type: 'get',
    title: '关于',
    path: '/about',
    middlewares: [
      async (ctx, next) => {
        await ctx.render('about', setViewData(ctx, routes, { title: '关于' }));
      }
    ]
  }
];

module.exports = routes;
