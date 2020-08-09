// 暴露具名的字符串->做mutations中的方法名
/*
*因为在Actions中通过 commit('changeFullScreen', flag)触发Mutations中changeFullScreen方法时，
* 用的是''将changeFullScreen包裹成字符串，由于字符串在书写过程中不会报错，
* 所以将Mutations中的方法名定义为常量，这样在书写不正确时会报错，方便维护
* */
export const SET_FULL_SCREEN = 'SET_FULL_SCREEN'
export const SET_MINI_PLAYER = 'SET_MINI_PLAYER'
export const SET_IS_PLAYING = 'SET_IS_PLAYING'
export const SET_MODE_TYPE = 'SET_MODE_TYPE'
export const SET_LIST_PLAYER = 'SET_LIST_PLAYER'
export const SET_SONG_DETAIL = 'SET_SONG_DETAIL'
export const SET_SONG_LYRIC = 'SET_SONG_LYRIC'
