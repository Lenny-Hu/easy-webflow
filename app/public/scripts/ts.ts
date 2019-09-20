/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-20 16:58:51
 * @LastEditTime: 2019-09-20 17:06:15
 * @LastEditors: Please set LastEditors
 */

class Student {
  fullName: string;
  constructor(public firstName:string, public middleInitial:string, public lastName:string) {
      this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person : Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

let user = new Student('Jane', 'M.', 'User');

document.body.innerHTML = greeter(user);
