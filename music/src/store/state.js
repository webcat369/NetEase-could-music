import mode from './mode-Type'
// state:用于保存全局共享数据
export default {
  isFullScreen: false, // 全屏播放器--隐藏
  isShowMiniPlayer: false, // 迷你播放器-- 隐藏
  isPlaying: false, // 播放按钮--暂停
  modeType: mode.loop,
  isShowListPlayer: false,
  songs: [],
  currentSong: {},
  currentIndex: 0,
  currentLyric: {}
}
