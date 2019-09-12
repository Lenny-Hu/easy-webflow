/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 16:52:10
 * @LastEditTime: 2019-09-12 17:20:36
 * @LastEditors: Please set LastEditors
 */
const del = require('del'); // 文件删除
const { Logger } = require('./logger');

class Clean {
  constructor (config) {
    this.config = config;
    this.logger = new Logger(config);
    console.log('及阿娇阿娇', this, config);
  }

  async del (globs) {
    console.log('this', this);
    let deletedPaths = await del(globs);
    this.logger.info('[清理临时文件]', deletedPaths);
  }

  async delTask (cb) {
    console.log('???this???', this);
    let globs = this.config.isProd ? ['dist/**/*'] : ['app/css/**/*', 'app/js/**/*'];
    await this.del(globs);
    return cb;
  }
}

module.exports = {
  Clean
}
