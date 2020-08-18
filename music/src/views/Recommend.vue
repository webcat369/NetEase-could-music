<template>
   <!--推荐的内容界面-->
   <div class="recommend">
       <div class="recommend-warpper">
           <ScrollView>
               <div>
                   <Banner :banners="banners"></Banner>
                   <!-- <Personalized>组件被推荐歌单和最新专辑复用两次，所以需要:type="‘XXX’"来区分 -->
                   <!-- personalized是推荐歌单 -->
                   <!-- 子组件调用父组件的方法@select="fatherSelectItem" -->
                   <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'"></Personalized>
                    <!-- album是最新专辑 -->
                   <Personalized :personalized="album" :title="'最新专辑'" @select="fatherSelectItem" :type="'album'"></Personalized>
                   <Songlist :songs="songs"></Songlist>
               </div>
           </ScrollView>
       </div>
        <!--在页面跳转时，添加过渡效果-->
        <transition>
            <!--指定跳转出口：渲染Detail.vue的内容-->
            <router-view></router-view>
        </transition>
   </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index.js'
/* 广告轮播图 */
import Banner from '../components/Recommend/Banner'
/* 推荐歌单和最新专辑组件 */
import Personalized from '../components/Recommend/Personalized'
/* 最新音乐组件 */
import Songlist from '../components/Recommend/Songlist'
/* 滚动组件 */
import ScrollView from '../components/ScrollView'
/* 统一管理SEO三大标签的插件 */
import MateInfo from '../../vue-meta-info'
export default {
  name: 'Recommend',
  metaInfo: MateInfo.recommend,
  components: {
    Banner,
    Personalized,
    Songlist,
    ScrollView
  },
  data () {
    return {
      banners: [],
      personalized: [],
      album: [],
      songs: []
    }
  },
  methods: {
    // 通过js设置二级路由地址
    fatherSelectItem (id, type) { // type类型: ‘personalized’或‘album’
      /*
          设置路由地址的两种方式：
            1.声明式：<router-link :to="XXXX">
            2.编程式：router.push(...)
      */
      // 设置路由地址：编程式
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  // created创建组件时的生命周期函数
  created () {
    getBanner()
      .then((data) => {
        this.banners = data.banners
      })
      .catch((err) => {
        console.log(err)
      })
    getPersonalized()
      .then((data) => {
        this.personalized = data.result
      })
      .catch((err) => {
        console.log(err)
      })
    getNewAlbum()
      .then((data) => {
        // console.log(data.albums.splice(0, 6))
        this.album = data.albums.splice(0, 6)
      })
      .catch((err) => {
        console.log(err)
      })
    getNewSong()
      .then((data) => {
        // this.songs = data.result
        // 处理最新音乐歌单中歌曲的数据
        // console.log(data.result)
        const list = []
        data.result.forEach((value) => {
          const obj = {}
          // console.log(value)
          obj.id = value.id
          obj.name = value.name
          obj.picUrl = value.song.album.picUrl
          let singer = ''
          for (let i = 0; i < value.song.artists.length; i++) {
            if (i === 0) {
              singer = value.song.artists[i].name
            } else {
              singer += '-' + value.song.artists[i].name
            }
          }
          obj.singer = singer
          list.push(obj)
        })
        this.songs = list
        // console.log(this.songs)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
/*只有IScroll的容器界面 < 内容界面(banner+推荐歌单+最新歌单+最新音乐)，才能滚动*/
.recommend{
    /*让 推荐界面装内容部分的盒子 固定定位，宽高为可视窗口的宽高 ，
    然后让IScroll的容器的宽高 = 推荐界面装内容部分的盒子宽高*/
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    /*超出的部分不显示*/
    /*overflow: hidden;*/
    .recommend-warpper{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
.v-enter{
    transform:translateX(100%);
}
.v-enter-to{
    transform:translateX(0%);
}
.v-enter-active{
    /*用3s的时间过渡从显示开始到显示结束*/
    transition: transform 1s;
}
.v-leave{
    transform:translateX(0%);
}
.v-leave-to{
    transform:translateX(100%);
}
.v-leave-active{
    /*用3s的时间过渡从隐藏开始到隐藏结束*/
    transition: transform 1s;
}
</style>
