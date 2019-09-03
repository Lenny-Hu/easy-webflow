/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:13:28
 * @LastEditTime: 2019-09-03 17:50:44
 * @LastEditors: Please set LastEditors
 */
console.log('hello word');

function seep (ms) {
  return new Promise((resolve) => {
    console.log('睡眠', ms, Date.now());
    setTimeout(resolve, ms);
  });
}

(async () => {
  await seep(3000);
  console.log(Date.now());

  let arr = [1, 2, 3].map((n) => n + 1);
  console.log(arr);
})();
