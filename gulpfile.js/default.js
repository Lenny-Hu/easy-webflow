/*
 * @Description: 默认配置文件
 * @Author: your name
 * @Date: 2019-09-12 14:43:03
 * @LastEditTime: 2019-09-12 15:24:26
 * @LastEditors: Please set LastEditors
 */

module.exports = {
  browsersync: { // http://www.browsersync.cn/docs/options/
    open: true,
    files: [
      './app/css/**/*.css',
      './app/js/**/*.js',
      './app/lib/**/*',
      './app/images/**/*',
      './app/fonts/**/*',
      './server/views/**/*.pug'
    ],
    server: {
      baseDir: './app'
    },
    notProxyUrls: [ // 不代理的静态资源路径
      '/css',
      '/js',
      '/images',
      '/node_modules',
      '/lib',
      '/fonts'
    ]
  }
};
