// import Vue from 'vue'
import Loading from './Loading.vue'

// 这种方式就可以把组件包装成插件
export default {
  /* 注意点:如果要将个组件封装成一 个插件，那么 必须提供个install方法
  那么必须在install方法中注册当前的这个组件
  */
  install: function (Vue, options) {
    // 注册组件
    // Vue.component(Loading.name, Loading)

    // 1.根据我们的组件生产一个构成函数
    const LoadingContructor = Vue.extend(Loading)
    // 2.根据我们的构造函数创建实例对象
    const LoadingInstance = new LoadingContructor()
    // 3.随便创建一个标签(元素)
    const oDiv = document.createElement('div')
    // 4.将创建好的标签添加到界面上
    document.body.appendChild(oDiv)
    // 5.将创建好点实例对象挂载到创建好的元素上
    LoadingInstance.$mount(oDiv)

    // console.log(options)  object:title: '你真是个小天才'
    // console.log(LoadingInstance.title); 正在加载...

    // 添加初始化值
    if (options && options.title !== null && options.title !== undefined) {
      LoadingInstance.title = options.title
    }

    // 添加全局方法
    // 控制加载器的显示
    Vue.showLoading = function () {
      LoadingInstance.isShow = true
    }
    // 控制加载器的隐藏
    Vue.hiddenLoading = function () {
      LoadingInstance.isShow = false
    }
    // 添加实例方法
    Vue.prototype.$showLoading = function () {
      LoadingInstance.isShow = true
    }
    Vue.prototype.$hiddenLoading = function () {
      LoadingInstance.isShow = false
    }
  }
}
