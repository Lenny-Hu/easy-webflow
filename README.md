<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 16:03:24
 * @LastEditTime: 2019-09-17 17:43:48
 * @LastEditors: Please set LastEditors
 -->
 
# gulp-demo
使用gulp + webpack搭建前端工作流

## 目标

- sass => css
- es6|7 => js
- typescript => js
- css lint
- js lint
- html lint
- 开发服务器、自动重载、动态插入样式 Browsersync
- 根据配置文件启动开发服务或者构建生产环境资源

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

## 后端

- nodejs8.0+
- pug
- koa2
- koa2-router
- koa2-views

## 开发环境
---

`cd app & npm run dev`

> 启动后端服务

`npm run dev`

> 启动开发服务，监听sass\es6并刷新浏览器

## 生产环境
---

`npm run prod`

> 将所有资源打包压缩优化后到dist目录，dist目录作为发布在生产环境资源


