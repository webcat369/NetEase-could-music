<template>
    <div class="detail">
        <DetailHeader :title="playlist.name"></DetailHeader>
        <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
        <div class="bottom">
            <ScrollView ref="scrollview">
                <DetailBottom :playlist="playlist.tracks"></DetailBottom>
            </ScrollView>
        </div>
    </div>
</template>

<script>
/* 详细歌曲信息头部组件 */
import DetailHeader from '../components/Detail/DetailHeader'
/* 详细歌曲信息图片组件 */
import DetailTop from '../components/Detail/DetailTop'
/* 详细歌曲信息底部歌曲列表组件 */
import DetailBottom from '../components/Detail/DetailBottom'
/* 滚动组件 */
import ScrollView from '../components/ScrollView'
import { getPlayList, getAlbum } from '../api/index.js'

export default {
  name: 'Detail',
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data: function () {
    return {
      playlist: {}
    }
  },
  //  created () 此时data和methods属性已经初始化好了，但还没有开始编译模板
  created () {
    // console.log(this.$route.params.type)
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = data.playlist
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'album') {
      getAlbum({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  // 已经将编译好的模板挂载到页面的指定容器中, mounted ()此时已经可以拿到组件中的元素
  mounted () {
    // 通过拿到组件this.$refs.XXX，然后加上.$el拿到组件<DetailTop>中对应的根元素<div class="detail-top">
    const defaultHeight = this.$refs.top.$el.offsetHeight
    // console.log(defaultHeight)  828
    this.$refs.scrollview.scrolling((offsetY) => { // offsetY是ScrollView.vue文件中scrolling方法中的回调函数fn中的当前偏移位(this.y)
      // console.log(offsetY) 向上滚动是负数，向下滚动是正数
      if (offsetY < 0) {
        // console.log('向上滚动') 图片会越来越模糊

        /*
           注意点:高斯模糊效果是非常消耗性能的，不推荐在移动端中使用
           如果非要在移动端中使用，那么建议只设置一次。
           我们这里的代码是一滚动就设置，这样是最消耗性能的，
          // const filter = 10 * Math.abs(offsetY) / defaultHeight // Math.abs(XXX)会将这个负数转变成正数
          // css中filter属性：定义了元素(通常是<img>)的可视效果(例如：模糊与饱和度)
          // this.$refs.top.$el.style.filter = `blur(${filter}px)`

           所以我们改为给<DetailTop>组件中的图片添加蒙板的方式来实现模糊效果
        */
        const opacity = Math.abs(offsetY) / defaultHeight
        // console.log(opacity) 向上滑动值越来越大，向下滑动值越来越小
        // changeMask是子组件DetailTop.vue中改变蒙板透明度的方法
        this.$refs.top.changeMask(opacity)
      } else {
        // console.log('向下滚动')  图片会越来越大
        const scale = 1 + offsetY / defaultHeight
        // console.log(scale) 向下滚动数会越来越大
        // css中transform的scale属性：定义 2D 缩放
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>

<style scoped lang="scss">
    @import "../assets/css/mixin";
    .detail{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        /*background: plum;*/
        @include bg_sub_color();
        .bottom{
            position: fixed;
            top: 500px;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
</style>
