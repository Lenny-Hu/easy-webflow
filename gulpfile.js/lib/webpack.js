/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 09:43:15
 * @LastEditTime: 2019-09-20 13:53:56
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
// const named = require('vinyl-named');
// const webpack = require('webpack-stream');
const glob = require('glob');
const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const uglify = require('gulp-uglify');
const webpackConfig = require('../../webpack.config');
const { Logger } = require('./logger');
const logger = new Logger();

module.exports = {
  // es6 (src, dest, options = { src: {}, webpack: {} }) {
  //   const _webpackConfig = _.merge(webpackConfig, options.webpack);

  //   return gulp.src(src, options.src)
  //     .pipe(named((file) => {
  //       // 让scripts目录下的每个js文件单独输出到对应的js目录下
  //       let [ filePath ] = file.history;
  //       let dir = path.join(file._cwd, file._base);
  //       let extname = path.extname(filePath);
  //       filePath = filePath.replace(dir, '').slice(1, -(extname.length));
  //       return filePath;
  //     }))
  //     .pipe(webpack(_webpackConfig))
  //     .pipe(gulp.dest(dest));
  // },
  jsmin (src, dest, options = { src: {}, uglify: {} }) {
    return gulp.src(src, options.src)
      .pipe(uglify(options.uglify))
      .pipe(gulp.dest(dest));
  },
  /**
   *
   *
   * @param {globs} src es6源文件
   * @param {string} dest 输出目录，必须是绝对路径
   * @param {object} options.webpack webpack配置选项 
   * @param {string} options.base es6源文件的base路径，用于输出时进行替换，类似gulp.src的base参数
   * @param {funciton} cb 运行后的回调函数
   */
  es6 (src, dest, options = { base: '', webpack: {} }, cb) {
    glob(src, (err, files) => {
      if (err) {
        logger.info('[webpack]', '读取js源码目录时发生错误', err);
        return cb(err);
      }

      let entry = {};
      files.forEach((v, i) => {
        let { root, dir, base, name, ext } = path.parse(v);
        // 私有文件不编译，由其他文件require使用的
        if (!name.startsWith('_')) {
          let output = `${dir}/${name}`.slice(options.base.length + 1);
          entry[output] = `./${v}`;
        }
      });

      const _webpackConfig = _.merge(webpackConfig, options.webpack, {
        entry,
        output: {
          path: dest
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

        // const info = stats.toJson();

        // if (stats.hasErrors()) {
        //   logger.error('[webpack]', info.errors);
        // }

        // if (stats.hasWarnings()) {
        //   logger.warn('[webpack]', info.warnings);
        // }

        // 打印webpack输出信息
        console.log(stats.toString({
          chunks: false, // 使构建过程更静默无输出
          colors: true // 在控制台展示颜色
        }));

        cb(null);
      }

      const compiler = webpack(_webpackConfig);
      if (_webpackConfig.watch) {
        logger.info('[webpack]', '启动监听模式');
        compiler.watch({}, hander);
      } else {
        compiler.run(hander);
      }
    });
  },
}
