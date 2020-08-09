<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
    <!--指定路由出口:渲染Recommend.Vue中的内容-->
    <router-view></router-view>
    <Player></Player>
  </div>
</template>

<script>
/* 网易云音乐头部组件 */
import Header from './components/Header'
/* 网易云音乐导航栏组件 */
import Tabbar from './components/Tabbar'
/* 网易云音乐播放器组件 */
import Player from './views/Player'
export default {
  name: 'App',
  components: {
    Header,
    Tabbar,
    Player
  }
}
</script>

<style scoped lang="scss">

</style>
