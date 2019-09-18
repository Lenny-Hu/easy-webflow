/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 10:50:37
 * @LastEditTime: 2019-09-18 17:43:08
 * @LastEditors: Please set LastEditors
 */
const gulp = require('gulp');
const { imagemin } = require('../lib/image');
const config = require('../default-config');

// 图片优化(仅生产环境)
gulp.task('image', () => {
  return imagemin([
    `${config._src.image}/**/*`,
    `!${config._src.image}/sprite.png`,
    `!${config._src.image}/sprites/*`
  ],
  `${config._dest.public}`,
  {
    src: {
      base: config._src.public
    }
  }
  );
});
