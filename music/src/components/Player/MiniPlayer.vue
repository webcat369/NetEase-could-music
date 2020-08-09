<template>
    <transition
            @enter="enter"
            @leave="leave"
            v-bind:css="false">
        <div class="mini-player" v-show="this.isShowMiniPlayer">
            <div class="player-wrapper">
                <div class="player-left" @click="showNormalPlayer">
                    <img :src="currentSong.picUrl" alt="" ref="cd">
                    <div class="player-title">
                        <h3>{{currentSong.name}}</h3>
                        <p>{{currentSong.singer}}</p>
                    </div>
                </div>
                <div class="player-right">
                    <div class="play" @click.stop="play" ref="play"></div>
                    <!--迷你播放器中三条杠图标，控制列表播放器的显示-->
                    <div class="list" @click.stop="showList"></div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// 使用钩子函数写过渡动画需要安装velocity-animate
import Velocity from 'velocity-animate'
// 安装好的velocity-animate中有已经封装好的velocity.ui.js插件来实现动画效果
import 'velocity-animate/velocity.ui'

export default {
  name: 'MiniPlayer',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setShowMiniPlayer',
      'setIsPlaying',
      'setShowListPlayer'
    ]),
    // 监听迷你播放器中点击三条杠图标显示列表播放器
    showList () {
      this.setShowListPlayer(true)
    },
    showNormalPlayer () {
      // NormalPlayer.vue界面显示
      this.setFullScreen(true)
      // MiniPlayer.vue界面隐藏
      this.setShowMiniPlayer(false)
    },
    // Vue 提供了 transition 的封装组件,可以给任何元素和组件添加进入/离开过渡
    // 使用钩子函数执行 开始动画
    enter (el, done) { // 执行动画的元素 动画完成后执行的回调
      Velocity(el, 'transition.bounceDownIn', { duration: 500 }, function () {
        done()
      })
    },
    // 使用钩子函数执行 结束动画
    leave (el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 500 }, function () {
        done()
      })
    },
    // 控制播放按钮“状态”的切换 -- 更改的是 vuex 的 state 的保存到“控制播放按钮状态改变”的共享数据
    play () {
      this.setIsPlaying(!this.isPlaying)
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying',
      'isShowListPlayer',
      'currentSong'
    ])
  },
  watch: {
    // 控制播放按钮“图标”的切换 -- CSS中类名的变化
    isPlaying (newValue, oldValue) {
      if (newValue) { // newValue如果为真，就播放按钮“图标”就切换到“播放模式”
        console.log(this.$refs.play)
        this.$refs.play.classList.add('active')
        this.$refs.cd.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.cd.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
.mini-player{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 150px;
   .player-wrapper{
       width: 100%;
       height: 100%;
       @include bg_color();
       display: flex;
       justify-content: space-between; // player-wrapper盒子中的左右两个盒子的主轴对齐方式：两端对齐
       align-items: center; // 侧轴对齐方式：垂直居中
       .player-left{
           /* 伸缩布局 */
           display: flex;  // player-left盒子设置为伸缩布局，让img盒子和player-title盒子按水平方向平铺
           img{
               width: 100px;
               height: 100px;
               border-radius: 50%;
               margin-right: 20px;
               margin-left: 30px;
               animation: sport 3s linear infinite;
               animation-play-state: paused;
               &.active{
                   animation-play-state: running;
               }
           }
           .player-title{
               /* 伸缩布局 */
               display: flex;
               flex-direction: column; // 改变主轴的方向：垂直方向
               justify-content: center; //主轴对齐方式：垂直居中
               align-items: center; //侧轴对齐方式：水平居中
               h3{
                   @include font_size($font_medium);
                   @include font_color();
               }
               p{
                   @include font_size($font_medium_s);
                   @include font_color();
               }
           }
       }
       .player-right{
           /* 水平排版 */
           display: flex;
          align-items: center;
           .play{
               width: 84px;
               height: 84px;
               @include bg_img('../../assets/images/play');
               &.active{    /*用此类名覆盖.play，使播放按钮图标改变*/
                   @include bg_img('../../assets/images/pause');
               }
           }
           .list{
               width: 120px;
               height: 120px;
               @include bg_img('../../assets/images/list');
           }
       }
   }
}
    @keyframes sport {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }
</style>
