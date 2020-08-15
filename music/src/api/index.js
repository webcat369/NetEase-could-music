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
