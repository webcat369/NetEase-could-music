// getters:获取全局共享的数据
export default {
  isFullScreen (state) {
    return state.isFullScreen
  },
  isShowMiniPlayer (state) {
    return state.isShowMiniPlayer
  },
  isPlaying (state) {
    return state.isPlaying
  },
  modeType (state) {
    return state.modeType
  },
  isShowListPlayer (state) {
    return state.isShowListPlayer
  },
  // 获取 state 中储存‘所有需要播放歌曲’的详细信息
  songs (state) {
    return state.songs
  },
  // 获取 state 中储存‘当前播放歌曲’的详细信息
  currentSong (state) {
    // 当 state 中的 songs数组 没有获取到播放当前歌曲时，需要自己定义当前歌曲的信息
    let obj = {
      name: '',
      singer: '',
      picUrl: null
    }
    // 当 state 中的 songs数组 长度不等于0时，获取到了播放当前歌曲
    if (state.songs.length !== 0) {
      obj = state.songs[state.currentIndex]
    }
    return obj
  },
  currentLyric  (state) {
    return state.currentLyric
  },
  currentIndex  (state) {
    return state.currentIndex
  },
  curTime (state) {
    return state.curTime
  },
  favoriteList (state) {
    return state.favoriteList
  },
  historyList (state) {
    return state.historyList
  }
}
