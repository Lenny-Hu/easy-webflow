<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 16:03:24
 * @LastEditTime: 2019-09-05 11:21:58
 * @LastEditors: Please set LastEditors
 -->
 
# gulp-demo
使用gulp构建以vue为主，不使用前端路由的项目

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
|-- server nodejs后端根目录
|-- app
    |-- css 开发环境输出的css目录，其中sprite.css、sprite.png为生成的雪碧图相关资源
    |-- js 开发环境输出的js目录，内部目录结构同scripts目录
    |-- styles sass源代码，不以'_'开头的文件会被编译为独立css文件，以'_'开头文件表示为公共样式文件
    |-- scripts es6源代码，一个文件一份输出
    |-- images 图片资源目录
        |-- sprites 雪碧图资源目录，会打包输出一张png和一个css文件到css目录下
    |-- lib 第三方不能使用npm管理的资源目录，比如css\js\综合库
|-- dist 生产环境使用的静态资源和nodejs view视图目录
    |-- app 前端相关css\js\img等打包压缩后的资源
    |-- server
        |-- views 替换过静态资源链接的视图
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

`npm run dev`

> 将所有资源编译或复制到.tmp目录中，同时启动开发服

### css


## 生产环境
---

`npm run prod`

> 将所有资源打包压缩优化后到dist目录中，dist目录作为发布在生产环境的根目录


