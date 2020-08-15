import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_LIST_PLAYER,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
} from './mutations-type'
// mutations:用于保存修改全局共享数据的方法
export default {
  /*
  changeFullScreen (state, flag) { // flag 传递的值
    state.isFullScreen = flag
  }
  */
  [SET_FULL_SCREEN] (state, flag) { // 该方法用于修改state全局保存的“全屏播放器--隐藏”数据
    state.isFullScreen = flag
    if (flag) {
      state.isShowMiniPlayer = false
      state.isShowListPlayer = false
    }
  },
  [SET_MINI_PLAYER] (state, flag) {
    state.isShowMiniPlayer = flag
    if (flag) {
      state.isFullScreen = false
      state.isShowListPlayer = false
    }
  },
  [SET_IS_PLAYING] (state, flag) {
    state.isPlaying = flag
  },
  [SET_MODE_TYPE] (state, flag) {
    state.modeType = flag
  },
  [SET_LIST_PLAYER] (state, flag) {
    state.isShowListPlayer = flag
  },
  [SET_SONG_DETAIL] (state, list) { // list 是所有获取到的歌曲详细信息
    state.songs = list // 将所有获取到的歌曲详细信息(list)保存到state中songs数组
  },
  [SET_SONG_LYRIC] (state, lyric) {
    state.currentLyric = lyric
  },
  [SET_DEL_SONG] (state, index) { // 删除播放器列表歌单中的歌曲
    if (index !== undefined) {
      state.songs.splice(index, 1)
    } else {
      state.songs = []
    }
    // 当删除列表播放器歌单中 ‘正在播放歌曲’ 之前的歌曲，需要给 ‘正在播放歌曲’ 的索引 +1
    if (index < state.currentIndex) {
      state.currentIndex = state.currentIndex - 1
    }
    // 当删除所有的歌曲以后，需要关闭全屏、迷你和列表播放器
    if (state.songs.length === 0) {
      state.isFullScreen = false
      state.isShowListPlayer = false
      state.isShowMiniPlayer = false
    }
  },
  [SET_CURRENT_INDEX] (state, index) {
    // console.log(index)
    if (index < 0) {
      index = state.songs.length - 1
      // console.log(state.songs.length)
    } else if (index > state.songs.length - 1) {
      index = 0
    }
    state.currentIndex = index
  },
  [SET_CURRENT_TIME] (state, time) {
    state.curTime = time
  },
  [SET_FAVORITE_SONG] (state, song) {
    // find()函数用来查找目标元素，找到就返回该元素，找不到返回undefined
    const result = state.favoriteList.find(function (currentValue) {
      return currentValue.id === song.id
    })
    // console.log(result)
    if (result === undefined) {
      state.favoriteList.push(song)
    }
  },
  [SET_FAVORITE_LIST] (state, list) {
    state.favoriteList = list
  },
  [SET_HISTORY_SONG] (state, song) {
    // find()函数用来查找目标元素，找到就返回该元素，找不到返回undefined
    const result = state.historyList.find(function (currentValue) {
      return currentValue.id === song.id
    })
    // console.log(result)
    if (result === undefined) {
      if (state.historyList.length > 30) {
        state.historyList.splice(0, 1)
      }
      state.historyList.push(song)
    }
  },
  [SET_HISTORY_LIST] (state, list) {
    state.historyList = list
  }

}
