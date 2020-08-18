import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'
import Loading from './components/plugin/loaing/index'
// 导入插件:VConsole可以在真机上打开调试工具
import VConsole from 'vconsole'
// vue-meta-info插件统一管理SEO三大标签
import MetaInfo from './../vue-meta-info'

Vue.use(MetaInfo)
Vue.use(VueLazyload, {
  /* 可以通过loading来设置图片还未加载好之前的占位图片 */
  loading: require('./assets/images/loading.png')
})
// 注意点:如果想通过Vue的方式注册组件,就必须先把组件封装成插件
Vue.use(Loading, {
  title: '拼命加载中...'
})
fastclick.attach(document.body)

Vue.config.productionTip = false

var vConsole = new VConsole()
Vue.use(vConsole)
new Vue({
  router,
  store,
  render: h => h(App),

  // 下列代码是安装了预渲染插件vue-cli-plugin-prerender-spa以后自动添加的
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
