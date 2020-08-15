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
// 导入获取数据对应的方法
import {
  getSongDetail,
  getSongLyric,
  getSongUrl
} from '../api/index'
// actions:用于保存触发mutations中保存到方法
export default {
  setFullScreen ({ commit }, flag) { // 该方法用于触发mutations中保存的修改“全屏播放器--隐藏”的方法
    // 通过commit来触发changeFullScreen方法
    // commit('changeFullScreen', flag)
    commit(SET_FULL_SCREEN, flag)
  },
  setShowMiniPlayer ({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setIsPlaying ({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModeType ({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  setShowListPlayer ({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  // 向服务器发送 请求 歌曲详细信息 的方法(异步操作)
  async setSongDetail ({ commit }, ids) {
    // 要获取多个歌曲的id需要用' ，'连接起来
    const result = await getSongDetail({ ids: ids.join(',') })
    const urls = await getSongUrl({ id: ids.join(',') })
    // console.log(ids)
    // console.log(result) // 在songs[]保存：歌曲详细信息
    // console.log(urls) // 在data[]保存：当前播放音乐的播放地址
    const list = []

    result.songs.forEach(function (value, i, arr) {
      const obj = {}
      urls.data.forEach(function (value2, index) {
        if (urls.data[index].id === value.id) {
          obj.url = value2.url
        }
      })
      // console.log(arr)
      obj.id = value.id
      obj.name = value.name
      let singer = ''
      value.ar.forEach(function (item, index) {
        if (index === 0) { // 该歌曲只有一个演唱者
          singer = item.name
        } else { // 该歌曲有多个演唱者，每个演唱者之间用-隔开
          singer += '-' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = value.al.picUrl
      list.push(obj)
    })
    commit(SET_SONG_DETAIL, list)
  },
  // 向服务器发送 请求 歌词详细信息 的方法(异步操作)
  async setSongLyric ({ commit }, id) {
    // console.log(id)
    const result = await getSongLyric({ id: id })
    // console.log(result.lrc.lyric)
    const obj = parseLyric(result.lrc.lyric)
    // console.log(obj) {0:"作曲 : 无名之爱",1:"作词 : 无名之爱",5:"♡我们都是宇宙的一颗星星♡",...}
    commit(SET_SONG_LYRIC, obj)
  },
  setDelSong ({ commit }, index) {
    commit(SET_DEL_SONG, index)
  },
  setCurrentIndex ({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  setCurrentTime ({ commit }, time) {
    commit(SET_CURRENT_TIME, time)
  },
  setFavoriteSong ({ commit }, song) {
    commit(SET_FAVORITE_SONG, song)
  },
  setFavoriteList ({ commit }, list) {
    commit(SET_FAVORITE_LIST, list)
  },
  setHistorySong ({ commit }, song) {
    commit(SET_HISTORY_SONG, song)
  },
  setHistoryList ({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  }

}

// 格式化歌词方法
function parseLyric (lrc) {
  const lyrics = lrc.split('\n')// \n:搜索文件中的字符，希望每次从每行的开始进行匹配
  // console.log(lyrics) // ["[by:梌椋]", "[00:08.90]You know what they say",...]
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  const reg1 = /\[\d*:\d*\.\d*\]/g // /g (全文查找出现的所有匹配字符),\d 匹配数字,*代表前面任意单个字符的重复次数
  // 2.定义正则表达式提取 [00
  const reg2 = /\[\d*/i // /i (忽略大小写)
  // 3.定义正则表达式提取 :00
  const reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  const lyricObj = {}
  lyrics.forEach(function (lyric) {
    // console.log(lyric)
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    /*
      match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
      该方法类似 indexOf() 和 lastIndexOf()，但是它返回指定的值，而不是字符串的位置。

      substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符
    */
    const minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    const secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    /* parseInt(minStr)将字符串转为整数 */
    const time = parseInt(minStr) * 60 + parseInt(secondStr)
    // console.log(time)
    // 5.处理歌词
    /*
      replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
     .trim()的作用：去掉字符串首尾的空格
    */
    const text = lyric.replace(reg1, '').trim()
    // console.log(text)
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
