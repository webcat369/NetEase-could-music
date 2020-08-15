<template>
    <div class="player">
        <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
        <MiniPlayer></MiniPlayer>
        <ListPlayer ref="listPlayer"></ListPlayer>
        <!--
        <audio>标签的端事件处理程序:
        @timeupdate="XXX"
        1.timeupdate 用来监听音频的播放位置改变时，触发该事件中的XXX方法
        @ended="XXX"
        2.ended 用于监听音频播放完成时，触发该事件中的XXX方法
        -->
        <audio preload="auto" :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
    </div>
</template>

<script>
/* 全屏的播放器组件 */
import NormalPlayer from '../components/Player/NormalPlayer'
/* 迷你的播放器组件 */
import MiniPlayer from '../components/Player/MiniPlayer'
/* 列表播放器组件 */
import ListPlayer from '../components/Player/ListPlayer'
/*
    导入生成随机数的getRandomIntInclusive方法
    导入保存数据的setLocalStorage方法
    导入获取数据的getLocalStorage方法
 */
import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from './../tools/tools'
import { mapGetters, mapActions } from 'vuex'
import mode from '../store/mode-Type'
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentIndex',
      'currentSong',
      'curTime',
      'modeType',
      'songs',
      'favoriteList',
      'historyList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        // console.log('执行播放歌曲')
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    // 只有currentIndex 发生变化 就说明 切换了歌曲
    currentIndex () {
      /*
        注意点:在IOS系统中不会自动加载歌曲,所以oncanplay不会自动执行
              在PC和安卓系统中,系统会自动加载歌曲,所以oncanplay会执行
        解决方案:如何监听IOS中<audio>的歌曲是否准备好了?
        利用ondurationchange监听:当指定音频/视频的时长数据发生变化时，
        发生ondurationchange 事件。
        ondurationchange什么时候执行: 当歌曲加载完成之后执行,因为歌曲加载完成后才能拿到歌曲总时间

      */
      // oncanplay 事件在用户可以开始播放视频/音频（audio/video）时触发。
      // this.$refs.audio.oncanplay = () => {
      this.$refs.audio.ondurationchange = () => {
        // console.log('执行了歌曲切换')
        // 切换歌曲以后。就需要重新获取歌曲总时长
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) { // 判断当前'播放按钮'是否是播放状态
          // console.log(this.isPlaying)
          // console.log('执行切换歌曲')
          this.setHistorySong(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, oldValue) {
      // console.log(newValue)
      this.$refs.audio.currentTime = newValue
    },
    // 持久保存:只要收藏数组改变,就利用localStorage重新储存到本地
    favoriteList (newValue, oldValue) {
      // console.log(newValue)
      // JSON.stringify()将一个 JavaScript 对象或值转换为 JSON 字符串
      // setItem保存数据到favoriteList
      // window.localStorage.setItem('favoriteList', JSON.stringify(newValue))
      setLocalStorage('favoriteList', newValue)
    },
    // 持久保存:只要歌曲记录数组改变,就利用localStorage重新储存到本地
    historyList (newValue, oldValue) {
      // window.localStorage.setItem('historyList', JSON.stringify(newValue))
      setLocalStorage('historyList', newValue)
    }
  },
  created () {
    // JSON.parse():用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
    // getItem从favoriteList数组中获取数据
    // const favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'))
    const favoriteList = getLocalStorage('favoriteList')
    if (favoriteList === null) { return }
    this.setFavoriteList(favoriteList)

    // const historyList = JSON.parse(window.localStorage.getItem('historyList'))
    const historyList = getLocalStorage('historyList')
    if (historyList === null) { return }
    this.setHistoryList(historyList)
  },
  // mounted生命周期函数 -- 此时已经能拿到组件中的方法
  mounted () {
    // oncanplay 事件在用户可以开始播放视频/音频（audio/video）时触发
    // this.$refs.audio.oncanplay = () => {
    this.$refs.audio.ondurationchange = () => {
      // duration 属性返回当前音频/视频的长度，以秒计。如果未设置音频/视频，则返回 NaN
      this.totalTime = this.$refs.audio.duration
    }
  },
  data: function () {
    return {
      // 当前歌曲总时长
      totalTime: 0,
      // 当前歌曲播放时长
      currentTime: 0
    }
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setFavoriteList',
      'setHistoryList',
      'setHistorySong'
    ]),
    /* timeupdate 事件在音频/视频（audio/video）的播放位置发生改变时触发 */
    timeupdate (e) { // e: 事件对象
      /*
      target 事件属性可返回事件的目标节点（触发该事件的节点）。
      MDN中对target的解释为，一个触发事件的对象的引用， 当事件处理程序在事件的冒泡或捕获阶段被调用时。
      e.target可以用来实现事件委托，该原理是通过事件冒泡（或者事件捕获）给父元素添加事件监听
      */
      /* currentTime 属性设置或返回音频/视频播放的当前位置（以秒计）。当设置该属性时，播放会跳跃到指定的位置 */

      // console.log(e.target.currentTime) 监听当前歌曲的播放时长
      // 将监听当前歌曲的播放时长 赋值给 data中保存的当前歌曲播放时长
      this.currentTime = e.target.currentTime
    },
    // 监听一首歌曲是否被播放完成
    end () {
      // console.log('end')
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play()
      } else if (this.modeType === mode.random) {
        // 生成歌单中等待播放歌曲的随机索引数
        const index = getRandomIntInclusive(0, this.songs.length - 1)
        // console.log(index)
        this.setCurrentIndex(index)
      }
    }

  }
}
</script>

<style scoped>
.player{

    background: plum;
}
</style>
