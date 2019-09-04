/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:17:41
 * @LastEditTime: 2019-09-04 17:59:13
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
const IS_PROD = NODE_ENV === 'prodaction';

const config = require('./config')[NODE_ENV];

// 清理
gulp.task('clean', () => {
  let globs = IS_PROD ? ['dist/**/*'] : ['app/css/**/*', 'app/js/**/*'];
  return del(globs);
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
    // .pipe(babel())
    .pipe(named())
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

gulp.task('default', gulp.series('clean'));
