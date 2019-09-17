/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 11:24:53
 * @LastEditTime: 2019-09-17 11:30:21
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const gulpif = require('gulp-if');
const named = require('vinyl-named');
const webpack = require('webpack-stream');
const path = require('path');
const config = require('../default-config');

// es6编译 => ie9+
gulp.task('webpack', () => {
  return gulp.src(`${config.src.app}/${config.src.script}/**/*.js`, {
    base: `${config.src.app}/${config.src.script}`
  })
    .pipe(named((file) => {
      // 让scripts目录下的每个js文件单独输出到对应的js目录下
      let [ filePath ] = file.history;
      let dir = path.join(file._cwd, file._base);
      let extname = path.extname(filePath);
      filePath = filePath.replace(dir, '').slice(1, -(extname.length));
      return filePath;
    }))
    .pipe(webpack({
      mode: process.env.NODE_ENV,
      devtool: config.isProd ? false : 'cheap-module-source-map',
      watch: !config.isProd,
      // output: {
      //   // filename: '[name].[contenthash].js'
      // },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader' // babel有单独的配置文件 babel.config.js
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(`${config.src.app}/${config.temp.js}`))
    // 由于存在页面中直接引用css js资源，所以编译css\js时。必定要输出资源到app目录下，避免useref时出现问题
    .pipe(gulpif(
      config.isProd,
      gulp.dest(`${config.dest}/${config.src.app}/${config.temp.js}`)
    ));
});
