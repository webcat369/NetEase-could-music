import Vue from 'vue'
import VueRouter from 'vue-router'
// 注意点：通过import xxx from xxx的方式来加载组件，无论组件有没有被用到，都会被加载进来
// import Recommend from '../views/Recommend'
// import Singer from '../views/Singer'
// import Rank from '../views/Rank'
// import Search from '../views/Search'

// 如何实现Vue组件的按需加载(异步加载)
/* 推荐界面 */
const Recommend = (resolve) => { // resolve是一个回调函数
  // 通过import异步加载组件，加载成功就调用.then()的方法
  import('../views/Recommend').then((module) => { // method是加载成功后的组件
    // 通过resolve把加载成功的组件返回回去
    resolve(module)
  })
}
/* 详细歌曲信息界面 */
const Detail = (resolve) => {
  import('../views/Detail').then((module) => {
    resolve(module)
  })
}
/* 歌手界面 */
const Singer = (resolve) => {
  import('../views/Singer').then((module) => {
    resolve(module)
  })
}
/* 排行界面 */
const Rank = (resolve) => {
  import('../views/Rank').then((module) => {
    resolve(module)
  })
}
/* 搜索界面 */
const Search = (resolve) => {
  import('../views/Search').then((module) => {
    resolve(module)
  })
}
/* 个人中心界面 */
const Account = (resolve) => {
  import('../views/Account').then((module) => {
    resolve(module)
  })
}

Vue.use(VueRouter)
// Vue.use(Recommend)
// Vue.use(Singer)
// Vue.use(Rank)
// Vue.use(Search)

const routes = [
  /* 指定默认路由 */
  { path: '/', redirect: '/recommend' },
  /* 制定路由规则 */
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  { path: '/singer', component: Singer },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search },
  { path: '/account', component: Account }
]

const router = new VueRouter({
  /*
  注意点: 如果Router中使用的是history模式, 那么打包之后的项目不能刷新, 刷新就会出现404
  解决方案: 1.Router这两个不要使用history模式, 使用hash模式
            2.在服务端上面进行一些额外的配置
  * */
  // 注意点: 如果需要使用预渲染的插件, 那么Router的模式必须是history模式
  mode: 'history',
  // mode:  'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
