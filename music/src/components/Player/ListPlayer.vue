<template>
    <transition
            @enter="enter"
            @leave="leave"
            v-bind:css="false">
        <div class="list-player" v-show="isShowListPlayer">
            <div class="player-warpper">
                <div class="player-top">
                    <div class="top-left">
                        <div class="mode loop" @click.stop="mode" ref="mode"></div>
                        <p v-if="this.modeType === 0">顺序播放</p>
                        <p v-else-if="this.modeType === 1">单曲播放</p>
                        <p v-else>随机播放</p>
                    </div>
                    <div class="top-right">
                        <div class="del"></div>
                    </div>
                </div>
                <div class="player-middle">
                    <ScrollView ref="scrollView">
                        <ul>
                            <li class="item" v-for="value in songs" :key="value.id">
                                <div class="item-left">
                                    <div class="item-play" @click.stop="play" ref="play"></div>
                                    <p>{{value.name}}</p>
                                </div>
                                <div class="item-right">
                                    <div class="item-favorite"></div>
                                    <div class="item-del"></div>
                                </div>
                            </li>
                        </ul>
                    </ScrollView>
                </div>
                <div class="player-bottom">
                    <p @click.stop="hidden">关闭</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import ScrollView from '../ScrollView'
// 使用钩子函数写过渡动画需要安装velocity-animate
import Velocity from 'velocity-animate'
// 安装好的velocity-animate中有已经封装好的velocity.ui.js插件来实现动画效果
import 'velocity-animate/velocity.ui'
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/mode-Type'

export default {
  name: 'ListPlayer',
  components: {
    ScrollView
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setShowListPlayer'
    ]),
    // 监听列表播放器点击关闭按钮后隐藏
    hidden () {
      this.setShowListPlayer(false)
    },
    // Vue 提供了 transition 的封装组件,可以给任何元素和组件添加进入/离开过渡
    // 使用钩子函数执行 开始动画
    enter (el, done) { // 执行动画的元素 动画完成后执行的回调
      Velocity(el, 'transition.perspectiveUpIn', { duration: 500 }, function () {
        done()
      })
    },
    // 使用钩子函数执行
    leave (el, done) {
      Velocity(el, 'transition.perspectiveUpOut', { duration: 500 }, function () {
        done()
      })
    },
    // 控制播放按钮“状态”的切换 -- 更改的是 vuex 的 state 的保存到“控制播放按钮状态改变”的共享数据
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    mode () {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'isShowListPlayer',
      'songs'
    ])
  },
  watch: {
    // 控制播放按钮“图标”的切换 -- CSS中类名的变化
    isPlaying (newValue, oldValue) {
      if (newValue) { // newValue如果为真，就播放按钮“图标”就切换到“播放模式”
        console.log(this.$refs.play, '=====')
        this.$refs.play[0].classList.add('item-active')
      } else {
        this.$refs.play[0].classList.remove('item-active')
      }
    },
    modeType (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    isShowListPlayer (newValue, oldValue) {
      // 监听ListPlayer显示后
      if (newValue) {
        // 在显示全部播放的歌曲后，重新计算ListPlayer的高度，有了高度就能计算出他的滚动范围
        this.$refs.scrollView.refresh() // 刷新
      }
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
.list-player{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    @include bg_sub_color();
    .player-warpper{
        .player-top{
            width: 100%;
            height: 100px;
            /* 伸缩布局 */
            display: flex;
            justify-content: space-between;  //主轴方向：水平方向上两端对齐
            align-items: center; //侧轴方向:垂直居中
            .top-left{
                /* 伸缩布局 */
                display: flex;
                align-items:center; //侧轴方向:垂直居中
                padding-left: 20px;
               .mode{
                   width: 56px;
                   height: 56px;
                   &.loop{
                       @include bg-img('../../assets/images/small_loop');
                   }
                   &.one {
                       @include bg-img('../../assets/images/small_one');
                   }
                   &.random{
                       @include bg-img('../../assets/images/small_shuffle');
                   }
                   margin-right: 20px;
               }
                p{
                    @include font_color();
                    @include font_size($font_medium_s);
                }
            }
            .top-right{
                .del{
                    width: 84px;
                    height: 84px;
                    @include bg_img('../../assets/images/small_del')
                }
            }
        }
        .player-middle{
            height: 700px;
            overflow: hidden;
           .item{
               height: 100px;
               border-top: 1px solid #ccc;
               /* 伸缩布局 */
               display: flex;
               justify-content: space-between; //主轴方向：水平方向上两端对齐
               align-items: center;  //侧轴方向:垂直居中
               padding: 0 20px;
               box-sizing: border-box;
               .item-left{
                   /* 伸缩布局 */
                   display: flex;
                   align-items: center; //侧轴方向:垂直居中
                   .item-play{
                       width: 84px;
                       height: 84px;
                       @include bg_img('../../assets/images/small_play');
                       margin-right: 20px;
                       &.active{    /*用此类名覆盖.play，使播放按钮图标改变*/
                           @include bg_img('../../assets/images/pause');
                       }
                   }
                   p{
                       @include font_size($font_medium_s);
                       @include font_color();
                   }
               }
               .item-right{
                   /* 伸缩布局 */
                   display: flex;
                   align-items: center; //侧轴方向:垂直居中
                   .item-favorite{
                       width: 56px;
                       height: 56px;
                       @include bg_img('../../assets/images/small_favorite');
                   }
                   .item-del{
                       width: 52px;
                       height: 52px;
                       margin-left: 20px;
                       @include bg_img('../../assets/images/small_close');
                   }
               }
           }
        }
        .player-bottom{
            width: 100%;
            height: 100%;
            line-height:100px ; //文字垂直居中
            @include bg_color();
            p{
               text-align: center;
                @include font_size($font_medium);
                color: #fff;
            }
        }
    }
}
</style>
