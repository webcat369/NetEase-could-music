<template>
  <div id="app">
    <MainHeader></MainHeader>
    <Tabbar></Tabbar>
    <!--指定路由出口:渲染Recommend.Vue/Singer.vue/Rank.vue/Search.vue中的内容-->
    <!--keep-alive:保存被渲染组件第一次渲染完成后的状态
              include :"需要被缓存的组件名"
             exclude :"排除不需要缓存的组件名"-->
    <keep-alive include="Singer,Search">
      <router-view></router-view>
    </keep-alive>
    <!--播放器组件-->
    <Player></Player>
  </div>
</template>

<script>
/* 网易云音乐头部组件 */
import MainHeader from './components/MainHeader'
/* 网易云音乐导航栏组件 */
import Tabbar from './components/Tabbar'
/* 网易云音乐播放器组件 */
import Player from './views/Player'
export default {
  name: 'App',
  components: {
    MainHeader,
    Tabbar,
    Player
  }
}
</script>

<style scoped lang="scss">

</style>
