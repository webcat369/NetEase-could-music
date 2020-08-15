import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'
// 导入插件:VConsole可以在真机上打开调试工具
import VConsole from 'vconsole'

Vue.use(VueLazyload, {
  /* 可以通过loading来设置图片还未加载好之前的占位图片 */
  loading: require('./assets/images/loading.png')
})

fastclick.attach(document.body)

Vue.config.productionTip = false

var vConsole = new VConsole()
Vue.use(vConsole)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
