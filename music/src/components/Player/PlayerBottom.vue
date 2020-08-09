<template>
    <div class="player-bottom">
        <div class="bottom-progress">
            <span>00:00</span>
            <div class="progress-bar">
                <div class="progress-line">
                    <div class="progress-dot"></div>
                </div>
            </div>
            <span>00:00</span>
        </div>
        <div class="bottom-controll">
            <div class="mode loop" @click.stop="mode" ref="mode"></div>
            <div class="prev"></div>
            <div class="play" @click.stop="play" ref="play"></div>
            <div class="next"></div>
            <div class="favorite"></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/mode-Type'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType'
    ]),
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
      'modeType'
    ])
  },
  // watch: 监听数据的变化或者监听路由地址的变化，只要数据/路由地址发生了变化，就会自动调用对应数据的回调方法
  watch: {
    // 控制播放按钮“图标”的切换 -- CSS中类名的变化
    isPlaying (newValue, oldValue) {
      if (newValue) {
        console.log(this.$refs.play)
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
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
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
 .player-bottom{
     position: fixed;
     left: 0;
     bottom: 0;
     width: 100%;
     .bottom-progress{
         width: 80%;
         margin: 0 auto;
         display: flex;
         justify-content: space-between;
         align-items: center;
         span{
             @include font_size($font_small);
             @include font_color();
         }
         .progress-bar{
             width: 100%;
             margin: 0 10px;
             height: 10px;
             background: #fff;
             position: relative;
             .progress-line{
                 width: 50%;
                 height: 100%;
                 background: #ccc;
                 .progress-dot{
                     width: 20px;
                     height: 20px;
                     background: #fff;
                     border-radius: 50%;
                     position: absolute;
                     left: 50%;
                     top: 50%;
                     transform: translateY(-50%);
                 }
             }
         }
     }
     .bottom-controll{
         width: 80%;
         margin: 0 auto;
         padding: 50px 0;
         display: flex;
         justify-content: space-between;
         align-items: center;
         div{
             width: 84px;
             height: 84px;
         }
         .mode{
             &.loop{
                 @include bg-img('../../assets/images/loop');
             }
             &.one {
                 @include bg-img('../../assets/images/one');
            }
            &.random{
                @include bg-img('../../assets/images/shuffle');
            }
         }
         .prev{
             @include bg-img('../../assets/images/prev');
         }
         .play{
             @include bg-img('../../assets/images/play');
             &.active{ /*用此类名覆盖.play，使播放按钮图标改变*/
                 @include bg-img('../../assets/images/pause');
             }
         }
         .next{
             @include bg-img('../../assets/images/next');
         }
         .favorite{
             @include bg-img('../../assets/images/un_favorite');
         }
     }
 }
</style>
