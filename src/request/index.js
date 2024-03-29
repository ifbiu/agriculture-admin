import http from './http'
import axios from 'axios'

// 封装 get 请求 返回的是一个promise
export function get(url, params) {
  return new Promise((resolve, reject) => {
    http.get(url, { params }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 封装 post 请求 返回的是一个promise
export function post(url, params) {
  return new Promise((resolve, reject) => {
    http.post(url, JSON.stringify(params), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':localStorage.getItem('Authorization')
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 获取轮播图数据
export const login = data => post('/login', data)
export const getYearBooks = data => get('/getYearBooksAll', data)
export const postYearBooks = data => post('/getYearBooksAll', data)
export const getDiffCounty = data => get('/getDiffCounty', data)
