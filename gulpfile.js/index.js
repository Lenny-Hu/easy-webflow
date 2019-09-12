/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:17:41
 * @LastEditTime: 2019-09-12 17:17:56
 * @LastEditors: Please set LastEditors
 */
const path = require('path');

const gulp = require('gulp');

const { Server } = require('./server');
const { Cache } = require('./cache');
const { Clean } = require('./clean');

const spritesmith = require('gulp.spritesmith'); // 生成雪碧图
const image = require('gulp-image'); // 图片压缩

const buffer = require('vinyl-buffer');
const merge = require('merge-stream');

const del = require('del'); // 文件删除
const gulpCache = require('gulp-cached'); // 只传递更改过的文件，减少编译时间

const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano'); // 优化css

const webpack = require('webpack-stream');
const uglify = require('gulp-uglify');

const gulpif = require('gulp-if');
const named = require('vinyl-named');

const useref = require('gulp-useref');

const sftp = require('gulp-sftp');

const minimist = require('minimist'); // 命令行参数解析
const argv = minimist(process.argv.slice(2));

const { Logger } = require('./logger');

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PROD = NODE_ENV === 'production';

const config = require('../config')[NODE_ENV];

const logger = new Logger(config);

config.isProd = IS_PROD;

// console.log(`==当前环境为 [${NODE_ENV}][IS_PROD: ${IS_PROD}]==`);
// console.log('[使用的配置]', config);

logger.info(`[运行环境]`, NODE_ENV);
logger.info(`[配置]`, config);

// 清理
const clean = new Clean(config);
// clean.del(['dist/**/*']);
// gulp.task('clean', async (cb) => {
//   let globs = IS_PROD ? ['dist/**/*'] : ['app/css/**/*', 'app/js/**/*'];
//   let deletedPaths = await del(globs);
//   logger.info('[清理临时文件]', deletedPaths);
//   return cb;
// });

// 图片优化(仅生产环境)
gulp.task('image', () => {
  return gulp.src(['./app/images/**/*', '!./app/images/sprites/*'], {
    base: './app'
  })
    .pipe(image())
    .pipe(gulp.dest(config.static));
});

// 雪碧图
gulp.task('sprite', () => {
  let spriteData = gulp.src('./app/images/sprites/*.png').pipe(spritesmith({
    imgName: 'images/sprite.png',
    cssName: 'css/sprite.css',
    padding: 2
  }))

  let imgStream = spriteData.img
    .pipe(buffer())
    .pipe(gulpif(IS_PROD, image()))
    .pipe(gulp.dest(config.static));

  let cssStream = spriteData.css
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest(config.static))
    .pipe(gulpif(IS_PROD, gulp.dest('./app/')));
  
  return merge(imgStream, cssStream);
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
    .pipe(gulpCache('sass'))
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // 输出标准格式，方便后处理
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./app/css/'))
    .pipe(gulpif(IS_PROD, gulp.dest(path.join(config.static, '/css/'))));
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
      watch: !IS_PROD,
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
    .pipe(gulp.dest('./app/js/'))
    // 由于存在页面中直接引用css js资源，所以编译css\js时。必定要输出资源到app目录下，避免useref时出现问题
    .pipe(gulpif(IS_PROD, gulp.dest(path.join(config.static, '/js/'))));
});

// 资源拷贝(生产环境)
gulp.task('copy', () => {
  return gulp.src([
    './app/lib/**/*',
    './app/fonts/**/*',
    '!./app/lib/README.md'
  ], {
    base: './app'
  })
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', postcss([cssnano()])))
    .pipe(gulp.dest(path.join(config.static)));
});

// 处理视图（生产环境）
gulp.task('view-build', () => {
  // 将视图拷贝到dist目录
  return gulp.src([
    './server/views/**/*.pug'
  ], {
    base: './server/views/'
  })
    .pipe(useref({
      searchPath: './app'
    }))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', postcss([cssnano()])))
    .pipe(gulp.dest(config.view));
});

// 拷贝视图产生的静态资源到app目录（生产环境）
gulp.task('view-static', () => {
  let globs = [
    path.normalize(`${config.view}/css/**/*`),
    path.normalize(`${config.view}/js/**/*`)
  ];
  return gulp.src(globs, {
    base: config.view
  })
    .pipe(gulp.dest(config.static));
});

gulp.task('view-clean', async (cb) => {
  let globs = [
    './dist/server/views/css',
    './dist/server/views/js'
  ];

  await clean.del(globs);
  // let deletedPaths = await del(globs);
  // logger.info('[清理临时文件]', deletedPaths);
  return cb;
});

gulp.task('view', gulp.series('view-build', 'view-static', 'view-clean'));

// 缓存
const cache = new Cache(config);

// sftp
gulp.task('sftp', () => {
  return gulp.src('./dist/**/*')
    .pipe(sftp({ ...config.sftp }));
});

// 静态服务器
function browserSync (cb) {
  const server = new Server(config);
  server.init();
  cb();
}

// 文件监听
if (!IS_PROD) {
  gulp.watch('./app/styles/**/*.scss', gulp.series('sass'));
  gulp.watch('./app/images/sprites/**/*.png', gulp.series('sprite'));
}

if (IS_PROD) {
  exports.default = gulp.series(
    clean.delTask, 'image', 'sprite',
    gulp.parallel('sass', 'webpack', 'copy'),
    'view',
    // gulp.parallel(cache.viewByQuery, cache.cssByQuery),
    gulp.series(cache.byHash, cache.renameByHash),
    // 'sftp'
  );
} else {
  exports.default = gulp.series(
    clean.delTask, 'sprite',
    gulp.parallel('sass', 'webpack', browserSync)
  );
}
