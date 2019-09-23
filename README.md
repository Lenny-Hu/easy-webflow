<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 16:03:24
 * @LastEditTime: 2019-09-23 16:03:20
 * @LastEditors: Please set LastEditors
 -->
 
# easy-webflow
> 使用gulp + webpack搭建前端工作流

## Install
```
npm install easy-webflow --save-dev
```

## Usage

创建`gulpfile.js`文件
```
// gulpfile.js
require('easy-webflow');
```

创建配置文件`webflow.config.js`，可配置项参考npm包内的`config/index.js` 和 `gulpfile.js/default-config.js` 
也可以选择不执行默认的任务，加载 `gulpfile.js/lib` 目录下的工具方法执行自定义任务，下面是一个自定义任务的例子（监听文件变动，执行编辑、上传ftp等任务）
```
// webflow.config.js
const path = require('path');
const _ = require('lodash');
const { Server, browserSync } = require('easy-webflow/gulpfile.js/lib/server');
const { sftp } = require('easy-webflow/gulpfile.js/lib/sftp');
const { sass } = require('easy-webflow/gulpfile.js/lib/sass');
const { jsmin } = require('easy-webflow/gulpfile.js/lib/webpack');

const handle = (_path, config) => {
  const exname = path.extname(_path);

  switch (exname) {
    case '.scss':
      sass(_path, 'www/css', {
        src: {
          base: 'www/sass'
        }
      });
      break;

    case '.js':
      jsmin(_path, 'www/dest', {
        src: {
          base: 'www/js'
        }
      });
      break;

    default:
      break;
  }

  sftp(_path, config.sftp);
};

const base = {
  useDefault: false,
  host: 'old.dev.21boya.cn',
  port: 80,
  sftp: {
    host: '127.0.0.1',
    user: 'root',
    pass: '123456',
    port: 22,
    remotePath: '/usr/local/code'
  },
  browsersync: {
    files: [
      'www/**/*',
      'application/**/*'
    ],
    server: {
      baseDir: './'
    },
    notProxyUrls: [
      '/www'
    ]
  },
  before (config, cb) {
    const server = new Server(config);
    server.init();
    cb();
  },
  watch: {
    globs: [
      'www/**/*',
      'application/**/*'
    ],
    cb (watcher, config) {
      watcher.on('add', (path) => {
        console.log('添加文件', path);
        handle(path, config);
      });

      watcher.on('unlink', (path) => {
        console.log('删除文件', path);
      });

      watcher.on('change', (path) => {
        console.log('更改文件', path);
        handle(path, config);
      });
    }
  } 
}

const config = {
  development: _.merge(base, {

  }),
  production: _.merge(base, {
    
  })
};

module.exports = config;
```

在`package.json`文件的`scripts`添加以下代码，使用`--config`指定自定义配置文件地址
```
"dev": "cross-env NODE_ENV=development gulp --config webflow.config.js",
"prod": "cross-env NODE_ENV=production gulp --config webflow.config.js"
```

**开发环境（默认任务行为）**

<!-- 启动后端服务
```
cd app & npm run dev
``` -->

启动开发服务，监听sass、es6并刷新浏览器

```
npm run dev
```

**生产环境（默认任务行为）**

将所有资源打包压缩优化后到dist目录，dist目录作为发布在生产环境资源
```
npm run prod
```

## 特点

- sass => css
- es6|7 => js
- typescript => js
- css stylelint
- js lint，不支持自定义配置（未测试包使用有没有问题）
- html lint(暂无)
- 开发服务器、自动重载、动态插入样式 Browsersync
- 根据配置文件启动开发服务或者构建生产环境资源
- 禁用默认任务，执行自定义任务，比如监控文件改变执行编译或者上传ftp

## 目录结构
```

|-- app 源代码目录
  |-- public 前端资源目录
    |-- css sass输出目录，sprite.css为雪碧图css
    |-- fonts 字体
    |-- images 图片资源
    |-- js es6+编译后输出目录
    |-- lib 第三方css\js等不能使用npm管理的包
    |-- scripts es6源码，每个文件对应输出一个js文件（存在重复模块包装代码）
    |-- styles 样式文件目录，不以下划线开头输出一个单独的文件
  |-- router 后端路由
  |-- views 后端视图（pug）
  |-- app.js 入口文件
  |-- config.js 后端配置文件
|-- config gulp自定义配置文件
|-- gulpfile.js gulp任务目录
  |-- lib gulp任务共用方法
  |-- tasks 具体任务（default.js默认任务依赖其他任务，故改名为z_开头以保证最后加载）
  |-- default-config.js 默认使用的配置，和config文件夹的配置合并传给任务
  |-- index.js gulp入口文件

|-- dist 构建后的代码目录，用于生产环境（前后端），目录结构同app一样
```

## 前端
- jquery
- bootstrap
- vue
- ...

## 后端

- nodejs8.0+
- pug
- koa2
- koa2-router
- koa2-views

## License
LGPL