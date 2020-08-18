import axios from 'axios'
import Vue from 'vue'

// 进行一些全局配置
// 1.配置默认的请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// axios.defaults.baseURL = 'http://192.168.137.1:3000/'

// 2.设置请求的超时时间
axios.defaults.timeout = 3000

let count = 0
// 每次请求数据前,要显示加载器;每次请求完成后,要隐藏加载器;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么:每次请求数据前,要显示加载器;
  count++
  Vue.showLoading()
  return config
}, function (error) {
  // 对请求错误做些什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么:每次请求完成后,要隐藏加载器;
  count--
  // 当所有的发出的请求都响应以后,说明所有请求的数据都获取到了,加载器才隐藏
  if (count === 0) {
    Vue.hiddenLoading()
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})

// 3.axios的二次封装(封装自己的get/post方法)
export default {
  // 第一个参数path：发送get/post请求时，需要告诉根路径baseURL后面需要加上什么内容
  // 第二个参数data：发送get/post请求时，可能会传递一些参数
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
        params: data // 将参数data通过params传递给服务器
      })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, data)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  // 执行对个并发请求
  all: function (list) { // list:要发送哪些请求
    return new Promise(function (resolve, reject) {
      axios.all(list)
        .then(axios.spread(function (...result) { // ...result:将所有的结果都解构出来放在一个数组中
          resolve(result)
        }))
        .catch(function (err) {
          reject(err)
        })
    })
  }
}
