/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 16:48:19
 * @LastEditTime: 2019-09-18 14:59:12
 * @LastEditors: Please set LastEditors
 */
const requireDir = require('require-dir');

const NODE_ENV = process.env.NODE_ENV || 'development';
global.IS_PROD = NODE_ENV === 'production';

requireDir('./tasks', {
  recurse: true,
  noCache: true
});
