import {request} from "./request";

export function getLunbo() {
  return request({
    url: '/getlunbo'
  })
}

export function getNews() {
  return request({
    url: '/getnewslist'
  })
}



// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)
// function test() {
//   const names = ['why', 'aaa']
// }
//
// test()
//
// test()
