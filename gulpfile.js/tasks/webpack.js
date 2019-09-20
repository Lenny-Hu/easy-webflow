/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 11:24:53
 * @LastEditTime: 2019-09-20 10:54:15
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const webpack = require('webpack');
const _ = require('lodash');
const glob = require('glob');
const gulpif = require('gulp-if');
const path = require('path');
const { Logger } = require('../lib/logger');
const utils = require('../lib/utils');
const webpackConfig = require('../../webpack.config'); 
const config = require('../default-config');
const { es6 } = require('../lib/webpack');

const logger = new Logger(config);

// es6编译 => ie9+
// gulp.task('webpack', () => {
//   return es6(
//     `${config._src.script}/**/*.js`,
//     `${config._src.js}`,
//     {
//       src: {
//         base: `${config._src.script}`
//       }
//     })
//     // 由于存在页面中直接引用css js资源，所以编译css\js时。必定要输出资源到app目录下，避免useref时出现问题
//     .pipe(gulpif(
//       config.isProd,
//       gulp.dest(`${config._dest.js}`)
//     ));
// });

gulp.task('webpack', (cb) => {
  glob(`${config._src.script}/**/*.js`, (err, files) => {
    if (err) {
      logger.info('[webpack]', '读取js源码目录时发生错误', err);
    }

    let entry = {};
    files.forEach((v, i) => {
      let { root, dir, base, name, ext } = path.parse(v);
      // 私有文件不编译，由其他文件require使用的
      if (!name.startsWith('_')) {
        let output = `${dir}/${name}`.slice(config._src.script.length + 1);
        entry[output] = `./${v}`;
      }
    });

    const _webpackConfig = _.merge(webpackConfig, {
      entry,
      output: {
        path: path.resolve(config._src.js)
      }
    });

    const hander = (err, stats) => {
      if (err) {
        logger.error('[webpack]', err.stack || err);
        if (err.details) {
          logger.error('[webpack]', err.details);
        }
        return false;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        logger.error('[webpack]', info.errors);
      }

      if (stats.hasWarnings()) {
        logger.warn('[webpack]', info.warnings);
      }

      // 打印webpack输出信息
      console.log(stats.toString({
        chunks: false, // 使构建过程更静默无输出
        colors: true // 在控制台展示颜色
      }));

      // 生产环境下，将输出的js拷贝到生产环境目录
      if (config.isProd) {
        utils.copy(
          `${config._src.js}/**/*.js`,
          `${config._dest.js}`,
          {
            base: config._src.js
          }
        ).on('end', cb);
      } else {
        cb();
      }
    }

    const compiler = webpack(_webpackConfig);
    if (_webpackConfig.watch) {
      logger.info('[webpack]', '启动监听模式');
      compiler.watch({}, hander);
    } else {
      compiler.run(hander);
    }
  });
});
