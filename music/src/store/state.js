import mode from './mode-Type'
// state:用于保存全局共享数据
export default {
  isFullScreen: false, // 全屏播放器--隐藏
  isShowMiniPlayer: false, // 迷你播放器-- 隐藏
  isPlaying: false, // 播放按钮--暂停
  modeType: mode.loop, // 播放模式的切换
  isShowListPlayer: false, // 列表播放器 -- 隐藏
  songs: [], // 储存‘所有需要播放歌曲’的详细信息
  currentSong: {}, // 储存‘当前播放歌曲’的详细信息
  currentIndex: 0, // ‘当前播放歌曲’在数组中的索引
  currentLyric: {}, // 获取歌词详情信息
  curTime: 0, // 当前歌曲在播放状态下的播放时间
  favoriteList: [], // 保存喜爱的歌曲
  historyList: [] // 保存歌曲的播放记录
}
