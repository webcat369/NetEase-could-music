<template>
    <div class="player-bottom">
        <div class="bottom-progress">
            <span ref="eleCurrentTime">00:00</span>
            <div class="progress-bar" @click="progressClick" ref="progressBar">
                <div class="progress-line" ref="progressLine">
                    <div class="progress-dot"></div>
                </div>
            </div>
            <span ref="eleTotalTime">00:00</span>
        </div>
        <div class="bottom-controll">
            <div class="mode loop" @click.stop="mode" ref="mode"></div>
            <div class="prev" @click.stop="prev"></div>
            <div class="play" @click.stop="play" ref="play"></div>
            <div class="next" @click.stop="next"></div>
            <div class="favorite" @click="favorite" :class="{'active': isFavorite(currentSong)}"></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// 导入 保存播放模式的文件
import modeType from '../../store/mode-Type'
// 导入格式化歌曲时间的formatTime方法
import { formatTime } from '../../tools/tools'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurrentTime',
      'setFavoriteSong'
    ]),
    // 控制播放按钮“状态”的切换 -- 更改的是 vuex 的 state 的保存到“控制播放按钮状态改变”的共享数据
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    // 控制播放模式“状态”的切换 -- 更改的是 vuex 的 state 的保存到“控制播放模式状态改变”的共享数据
    mode () {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    },
    // 切换到上一首歌曲
    prev () {
      // this.setCurrentIndex(this.currentIndex - 1)
      if (this.modeType === modeType.loop) {
        this.setCurrentIndex(this.currentIndex - 1)
      } else if (this.modeType === modeType.one) {
        this.setCurrentIndex(this.currentIndex - 1)
      } else if (this.modeType === modeType.random) {
        // 生成歌单中等待播放歌曲的随机索引数
        const index = this.getRandomIntInclusive(0, this.songs.length - 1)
        // console.log(index)
        this.setCurrentIndex(index)
      }
    },
    // 切换到下一首歌曲
    next () {
      // this.setCurrentIndex(this.currentIndex + 1)
      if (this.modeType === modeType.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === modeType.one) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === modeType.random) {
        // 生成歌单中等待播放歌曲的随机索引数
        const index = this.getRandomIntInclusive(0, this.songs.length - 1)
        // console.log(index)
        this.setCurrentIndex(index)
      }
    },
    // 生成随机数的方法
    getRandomIntInclusive (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min // 含最大值，含最小值
    },
    // 拖拽进度条的方法
    progressClick (e) { // e:事件对象
      // 1.拿到进度条‘背景’的宽度
      /*
        在没有播放进度的时候这句代码可行:const progressLeft = e.target.offsetWidth
        但是在已经有一定的播放进度时,在拖拽进度条到有播放进度的地方,此时点击到的就是'前景',
        所以不能用e.target来获取进度条宽度
       */
      const progressLeft = this.$refs.progressBar.offsetWidth
      // 2.拿到点击的位置在进度条中的位置
      // 2.1拿到进度条距离左边的宽度
      /* const normalLeft = e.target.offsetLeft */
      const normalLeft = this.$refs.progressBar.offsetLeft
      // 2.2拿到点击位置距离左边的宽度
      const eventLeft = e.pageX
      // 2.3用 ‘点击位置距离左边的宽度’ - ‘进度条距离左边的宽度’ = ‘点击的位置在进度条中的位置’
      const clickLeft = eventLeft - normalLeft
      // 3.用‘点击的位置’在进度条中的位置 / 进度条‘进度条’的宽度 = 进度比例
      const value = clickLeft / progressLeft
      // 4.将进度比例赋值给进度条‘前景’
      this.$refs.progressLine.style.width = value * 100 + '%'
      // console.log(this.$refs.progressLine.style.width)

      // 5.进度条被拖拽到什么地方 歌曲就在什么相应时间播放
      // 5.1 歌曲播放的相应时间 = 歌曲总时长 * 进度比例
      const currentTime = this.totalTime * value
      // console.log(currentTime)
      // 将歌曲播放的相应时间 传递到 state中作为共享数据保存
      this.setCurrentTime(currentTime)
    },
    // 收藏当前喜欢的歌曲
    favorite () {
      this.setFavoriteSong(this.currentSong)
    },
    // 判断传入的这首歌是否被收藏,如果被收藏就通过该方法 给标签'动态绑定类名'来切换收藏图标
    isFavorite (song) {
      const result = this.favoriteList.find(function (currentValue) {
        // console.log(currentValue) //返回一个对象,保存当前被收藏歌曲的信息
        // console.log(currentValue.id) // 已经被收藏歌曲的id
        // console.log(song.id) // 当前歌曲的id
        return currentValue.id === song.id
      })
      return result !== undefined
    }

  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex',
      'songs',
      'currentSong',
      'favoriteList'
    ])
  },
  // watch: 监听数据的变化或者监听路由地址的变化，只要数据/路由地址发生了变化，就会自动调用对应数据的回调方法
  watch: {
    // 控制播放按钮“图标”的切换 -- CSS中类名的变化
    isPlaying (newValue, oldValue) {
      if (newValue) { // newValue 为 true，播放状态'.active'图标会覆盖原来的 暂停状态'.play'图标
        // console.log(this.$refs.play)
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    // 控制播放按钮“图标”的切换 -- CSS中类名的变化
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
    totalTime (newValue, oldValue) {
      // 1.格式化歌曲播放总时长
      const time = formatTime(newValue)
      // console.log(time)  返回对象：{day: "00", hour: "00", minute: "03", second: 53}
      // console.log(this.$refs.eleTotalTime.innerHTML) 00:00
      this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
      // console.log(this.$refs.eleTotalTime.innerHTML) 03:53
    },
    currentTime (newValue, oldValue) {
      // 1.格式化歌曲当前播放时间
      const time = formatTime(newValue)
      // console.log(time) 返回对象{day: "00", hour: "00", minute: "00", second: "00"}
      // console.log(this.$refs.eleCurrentTime.innerHTML)  00:00
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second
      // console.log(this.$refs.eleCurrentTime.innerHTML)  00:01

      // 2.根据当前播放时间计算比例，并且将比例赋值给进度条的前景
      const value = newValue / this.totalTime * 100
      this.$refs.progressLine.style.width = value + '%'
    }
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
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
         .progress-bar{ // 背景
             width: 100%;
             margin: 0 10px;
             height: 10px;
             background: #fff;
             .progress-line{ // 前景
                 width: 0%;
                 height: 100%;
                 background: #ccc;
                 position: relative;
                 .progress-dot{ // 小圆点
                     width: 20px;
                     height: 20px;
                     background: #fff;
                     border-radius: 50%;
                     position: absolute;
                     /*让进度条的小圆点相对于前景定位，这样做的好处：只要修改前景的宽度，小圆点就会随着宽度的改变而改变*/
                     left: 100%;
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
             &.active{
                 @include bg-img('../../assets/images/favorite');
             }
         }
     }
 }
</style>
