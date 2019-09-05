/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:17:41
 * @LastEditTime: 2019-09-05 11:05:51
 * @LastEditors: Please set LastEditors
 */
const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const spritesmith = require('gulp.spritesmith');
const image = require('gulp-image');

const del = require('del');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const named = require('vinyl-named');

const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PROD = NODE_ENV === 'production';

const config = require('./config')[NODE_ENV];

console.log(`==当前环境为 [${NODE_ENV}][IS_PROD: ${IS_PROD}]==`);
console.log('[使用的配置]', config);

// 清理
gulp.task('clean', async (cb) => {
  let globs = IS_PROD ? ['dist/**/*'] : ['app/css/**/*', 'app/js/**/*'];
  console.log(globs);
  let deletedPaths = await del(globs);
  console.log('----删除的文件----');
  console.log(deletedPaths.join('\n'));
  console.log('----删除的文件----');
  return cb;
});

// 图片优化(仅生产环境)
gulp.task('image', () => {
  return gulp.src(['./app/images/**/*', '!./app/images/sprite/*'], {
    base: './app'
  })
    .pipe(image())
    .pipe(gulp.dest('./dist/'));
});

// 雪碧图
gulp.task('sprite', () => {
  var spriteData = gulp.src('./app/images/sprites/*.png').pipe(image()).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest(path.join(config.static, '/css/')));
});

// sass编译
gulp.task('sass', () => {
  let plugins = [
    autoprefixer({ overrideBrowserslist: ['cover 99.5%'] })
  ];
  IS_PROD && plugins.push(cssnano());

  return gulp.src(['./app/styles/**/*.scss'], {
    base: './app/styles'
  })
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // 输出标准格式，方便后处理
    .pipe(postcss(plugins))
    .pipe(gulp.dest(path.join(config.static, '/css/')));
});

// es6编译 => ie9+
gulp.task('webpack', () => {
  return gulp.src('./app/scripts/**/*.js', {
    base: './app/scripts'
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
      mode: NODE_ENV,
      devtool: IS_PROD ? false : 'cheap-module-source-map',
      // watch: true,
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
    .pipe(gulp.dest(path.join(config.static, '/js/')));
});

// 资源拷贝(生产环境)
gulp.task('copy', () => {

});

// sftp

// 文件监听

// 缓存


//
const tasks = IS_PROD ? ['clean', 'image', gulp.parallel('sass', 'webpack', 'sprite')] : ['clean', gulp.parallel('sass', 'webpack', 'sprite')];
gulp.task('default', gulp.series(...tasks));
