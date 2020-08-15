import axios from 'axios'

// 进行一些全局配置
// 1.配置默认的请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// 2.设置请求的超时时间
axios.defaults.timeout = 3000

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
