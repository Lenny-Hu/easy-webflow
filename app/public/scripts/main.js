/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 17:13:28
 * @LastEditTime: 2019-09-20 10:24:36
 * @LastEditors: Please set LastEditors
 */
console.log('这里是全局的js1231234444');

let [a, b, c] = [1, 2, 3];
console.log('变量的解构赋值', a, b, c);

function seep (ms) {
  return new Promise((resolve) => {
    console.log('睡眠', ms, Date.now());
    setTimeout(resolve, ms);
  });
}

// Object.assign() 方法
const object1 = {
  a: 1,
  b: 2,
  c: 3
};
const object2 = Object.assign({ c: 4, d: 5 }, object1);  
console.log(object2.c, object2.d);

// ES6 字符串语法
let str1 = '12345';
let str = `口令aa${str1}`;
console.log(str);

// 字符串的遍历器接口
for (let codePoint of 'foo') {
  console.log(codePoint);
}

// 箭头函数
const fn = () => console.log('箭头函数');
fn();

(async () => {
  await seep(3000);
  console.log(Date.now());

  let arr = [1, 2, 3].map((n) => n + 1);
  console.log(arr);
})();

console.log('Number.isFinite ', Number.isFinite(15)); // true

function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello'); // Hello World

function fetch (url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}
fetch('http://example.com');

console.log(Object.is({}, {}));

console.log(Symbol());

const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}

const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false

function timeout (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});

function timeout2 (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint (value, ms) {
  await timeout2(ms);
  console.log(value);
}

asyncPrint('asyncPrint', 50);


class Point {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  toString () {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
var p = new Point(1, 2);
console.log(p.toString());


class ColorPoint extends Point {
  constructor (x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString () {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}

var p2 = new Point(3, 4, '#333');
console.log(p2.toString());

// const _ = require('lodash');
import _ from 'lodash';
console.log('lodash----', _.isArray([]));

const message = {};
const firstName = message?.body?.user?.firstName || 'default';
const fooValue = document.querySelector('input[name=foo]')?.value;
console.log('链判断运算符', firstName);

let x = do {
  let t = 1;
  t * t + 1;
};
console.log('do---->', x);

const obj = {
  n: 0,
  a: null,
  b: undefined,
  c: false
};

const headerText1 = obj.n ?? 'n';
const headerText2 = obj.a ?? 'a';
const headerText3 = obj.b ?? 'b';
const headerText4 = obj.c ?? 'c';
console.log('Null 判断运算符', headerText1, headerText2, headerText3, headerText4);

console.log('测试下watch123456');

export default _;