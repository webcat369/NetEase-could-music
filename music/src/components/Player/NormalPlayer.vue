<template>
    <transition
    @enter="enter"
    @leave="leave"
    v-bind:css="false">
        <!--
        优化前的getters全局调用：this.$store.getters.isFullScreen 非常冗余
        <div class="normal-player" v-show="this.$store.getters.isFullScreen">
         -->
        <!--利用getters的 “...mapGetters 辅助函数”优化后的本地调用：this.isFullScreen  更加简洁   -->
        <div class="normal-player" v-show="this.isFullScreen" >
            <div class="player-wrapper">
                <PlayerHeader></PlayerHeader>
                <PlayerMiddle></PlayerMiddle>
                <PlayerBottom></PlayerBottom>
            </div>
            <!--全屏播放器的背景图和蒙板-->
            <div class="player-bg">
                <img :src="currentSong.picUrl" alt="">
                <div class="mask"></div>
            </div>
        </div>
    </transition>
</template>

<script>
/* 全屏播放器头部组件 */
import PlayerHeader from './PlayerHeader'
/* 全屏播放器中部组件 */
import PlayerMiddle from './PlayerMiddle'
/* 全屏播放器底部部组件 */
import PlayerBottom from './PlayerBottom'
/* getters中的 mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性 */
/* actions中的 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用 */
import { mapGetters, mapActions } from 'vuex'
// 使用钩子函数写过渡动画需要安装velocity-animate
import Velocity from 'velocity-animate'
// 安装好的velocity-animate中有已经封装好的velocity.ui.js插件来实现动画效果
import 'velocity-animate/velocity.ui'

export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    /*
    * 通过mapGetters将 store 中的 getter 中的哪些属性和方法 “映射”到“局部计算属性”
    * 在通过mapGetters映射以后，要是想要获取这个“isFullScreen”全局的数据，
    * 就不用写一长串this.$store.getters.isFullScreen这个代码，
    * 直接this.isFullScreen就可以获取
    * */
    ...mapGetters([
      'isFullScreen', // 把 `this.isFullScreen` 映射为 `this.$store.getters.isFullScreen`
      'currentSong'
    ])
  },
  methods: {
    ...mapActions([
      'setSongLyric' // 将 `this.setSongLyric()` 映射为 `this.$store.dispatch('setSongLyric')`
    ]),
    // Vue 提供了 transition 的封装组件,可以给任何元素和组件添加进入/离开过渡
    // 使用钩子函数执行 开始动画
    enter (el, done) { // 执行动画的元素 动画完成的回调
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
        done() // 用来告诉动画已经执行完毕
      })
    },
    // 使用钩子函数 结束动画
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
        done()
      })
    }
  },
  watch: {
    currentSong (newValue, oldValue) {
      // console.log(newValue)
      this.setSongLyric(newValue.id)
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
.normal-player{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    @include bg_sub_color();
    .player-wrapper{
        position: relative;
        z-index: 999;
        width: 100%;
        height: 100%;
    }
    .player-bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .mask{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.3);
        }
        img{
            height: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            /* 高斯模糊效果：消耗性能严重，最好只设置一次 */
            filter: blur(50px);
        }
    }

}
</style>
