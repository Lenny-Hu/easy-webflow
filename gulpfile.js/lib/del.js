/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 17:31:54
 * @LastEditTime: 2019-09-17 10:20:20
 * @LastEditors: Please set LastEditors
 */
const del = require('del');

module.exports = {
  async del (globs, options = {}) {
    let deletedPaths = await del(globs, options);
    return Promise.resolve(deletedPaths);
  }
};