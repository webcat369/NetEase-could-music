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
// 获取歌单详情接口，只能得到音乐的id，不能得到音乐的URL，调用此接口后，传入id(可多个)，获得对应音乐的URL
export const getSongUrl = (data) => Network.get('song/url', data)
