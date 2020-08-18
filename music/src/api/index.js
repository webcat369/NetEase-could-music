// 这个js文件就是专门用于管理请求各种接口地址的
import Network from './network.js'

// 封装各种接口请求
// 暴露banner轮播的接口
export const getBanner = () => Network.get('banner?type=2')
// 暴露推荐歌单的接口
export const getPersonalized = () => Network.get('personalized?limit=6')
// 暴露最新专辑的接口
export const getNewAlbum = () => Network.get('album/newest')
// 暴露最新音乐的接口
export const getNewSong = () => Network.get('personalized/newsong')
// 暴露获取歌单详情的接口
export const getPlayList = (data) => Network.get('playlist/detail', data)
// 暴露获取专辑界面的接口
export const getAlbum = (data) => Network.get('album', data)
// 获取歌曲详情的接口
export const getSongDetail = (data) => Network.get('song/detail', data)
// 获取歌词详情的接口
export const getSongLyric = (data) => Network.get('lyric', data)
// 获取音乐URL(播放地址)
// 说明：使用歌单详情接口后，只能得到音乐的id，不能得到音乐的URL，调用此接口后，传入id(可多个)，获得对应音乐的URL
export const getSongUrl = (data) => Network.get('song/url', data)
// 热门歌手
// offset:从最开始获取; limit:一共获取5条数据
// export const getHotArtists = () => Network.get('/top/artists?offset=0&limit=5')
export const getHotArtists = () => {
  return new Promise(function (resolve, reject) {
    Network.get('/top/artists?offset=0&limit=5')
      .then(function (result) {
        resolve(result.artists) // 将获取到的数据返回到artists数组中
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
// 歌手分类列表
export const getLetterArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    const letterArtists = []
    Network.all([
      Network.get(`/artist/list?offset=0&limit=5&type=-1&area=96&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&type=-1&area=7&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&type=-1&area=16&initial=${letter}`)
    ])
      .then(function (result) {
        // console.log(result)
        result.forEach(function (item) { // item:数组中的每个对象
          // console.log(item)
          letterArtists.push(...item.artists)// ...item.artists:解构数组
          // console.log(...item.artists)
        })
        resolve(letterArtists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
// 获取所有字母
export const getAllArtists = () => {
  return new Promise(function (resolve, reject) {
    const keys = ['热']
    const list = [getHotArtists()]
    for (let i = 65; i < 91; i++) {
      // fromCharCode() 可接受一个指定的 Unicode 值，然后返回一个字符串。
      const char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    // console.log(keys)
    Network.all(list)
      .then(function (result) {
        const obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
// 获取歌手单曲
export const getArtistsSongs = (data) => Network.get('/artists', data)
// 所有榜单内容摘要
export const getTopListDetail = () => {
  return new Promise(function (resolve, reject) {
    const category = {
      officialList: [
        { name: '云音乐飙升榜', id: 3 },
        { name: '云音乐新歌榜', id: 0 },
        { name: '网易原创歌曲榜', id: 2 },
        { name: '云音乐热歌榜', id: 1 }
      ],
      recList: [
        { name: '云音乐说唱榜', id: 23 },
        { name: '云音乐电音榜', id: 25 },
        { name: '云音乐欧美新歌榜', id: 32 },
        { name: '抖音排行榜', id: 26 },
        { name: '云音乐ACG音乐榜', id: 22 },
        { name: '云音乐古典音乐榜', id: 24 }
      ],
      // Hit FM Top榜 台湾Hito排行榜 日本Oricon数字单曲周榜 iTunes榜 Beatport全球电子舞曲榜 美国Billboard排行榜 UK排行榜周榜
      globalList: [
        { name: '美国Billboard周榜', id: 6 },
        { name: 'UK排行榜周榜', id: 5 },
        { name: 'Beatport全球电子舞曲榜', id: 21 },
        { name: '日本Oricon数字单曲周榜', id: 10 },
        { name: '台湾Hito排行榜', id: 8 },
        { name: 'Hit FM Top榜', id: 29 }
      ],
      otherList: [
        { name: 'KTV唛榜', id: 7 },
        { name: '法国 NRJ Vos Hits 周榜', id: 19 },
        { name: '新声榜', id: 27 },
        { name: '云音乐韩语榜', id: 28 },
        { name: '电竞音乐榜', id: 30 },
        { name: '云音乐欧美热歌榜', id: 31 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('/toplist/detail')
      .then(function (data) { // data:服务器返回的最大的对象
        // 设置手动分类榜单
        data.list.forEach(function (obj) { // obj:list数组中的每一个榜单对象
          // 设置一个标记:确定找到相同name以后就停止,不在继
          let flag = false
          for (const key in category) {
            // console.log(category[key].length, '我是长度==')
            for (let i = 0; i < category[key].length; i++) {
              if (category[key][i].name === obj.name) {
                // console.log(category[key][i])
                // 将获取到的榜单对象信息(obj)绑定到自定义rank{}对象中
                category[key][i].rank = obj
                flag = true
                break
              }
            }
            if (flag) {
              break
            }
          }
        })
        // console.log(category)
        resolve(category)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
// 获取榜单单曲
export const getTopList = (data) => Network.get('playlist/detail', data)
// 搜索
export const getSearchList = (data) => Network.get('/search?type=1', data)
// 热搜列表(简略)
export const getHotList = () => Network.get('/search/hot')
