<template>
    <div class="rank">
        <div class="rank-wrapper">
            <ScrollView>
                <ul>
                    <li v-for="(value,key) in category.titles" :key="key">
                        <h3 class="group-title">{{value}}</h3>
                        <ul class="normal-group" v-if="value === '官方榜'">
                            <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectItem(obj.rank.id)">
                                <div class="rank-left">
                                    <img v-lazy="obj.rank.coverImgUrl" alt="">
                                    <p>{{obj.rank.updateFrequency}}</p>
                                </div>
                                <div class="rank-right">
                                    <p v-for="(songs,index) in obj.rank.tracks" :key="songs.first">{{index}}-{{songs.first}}</p>
                                </div>
                            </li>
                        </ul>
                        <ul class="other-group" v-else>
                            <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectItem(obj.rank.id)">
                                <div class="rank-top">
                                    <img v-lazy="obj.rank.coverImgUrl" alt="">
                                    <p>{{obj.rank.id}}</p>
                                </div>
                                <div class="rank-bottom">
                                    <p v-for="(songs,index) in obj.rank.tracks" :key="songs.first">{{index}}-{{songs.first}}</p>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
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
import { getTopListDetail } from './../api/index'
import ScrollView from '../components/ScrollView'
// import Rank from '../components/Rank/Rank'
/* 统一管理SEO三大标签的插件 */
import MateInfo from '../../vue-meta-info'
export default {
  name: 'Rank',
  metaInfo: MateInfo.rank,
  components: {
    ScrollView

  },
  data: function () {
    return {
      // 保存服务器返回的数据
      category: {}

    }
  },
  created () {
    getTopListDetail()
      .then((data) => {
        console.log(data)
        this.category = data
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  methods: {
    // 设置路由地址
    selectItem (id) {
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../assets/css/variable";
    @import "../assets/css/mixin";
 .rank{
     width: 100%;
     height: 100%;
     .rank-wrapper{
         position: fixed;
         top: 184px;
         left: 0;
         right: 0;
         bottom: 0;
         @include bg_sub_color();
         overflow: hidden;
         .group-title{
             @include font_size($font_large);
             padding: 10px 20px;
             @include font_color();
             font-weight: bold;
         }
         .normal-group{
             li{
                 display: flex;
                 align-items: center;
                 padding: 10px 20px;
                 box-sizing: border-box;
                 .rank-left{
                     position: relative;
                     img{
                         width: 200px;
                         height: 200px;
                         border-radius: 10px;
                     }
                     p{
                         position: absolute;
                         left: 10px;
                         bottom: 10px;
                         color: #000;
                         @include font_size($font_medium_s)
                     }
                 }
                 .rank-right{
                     margin-left: 20px;
                     p{
                         @include font_size($font_medium);
                         @include font_color();
                         padding: 10px 0;
                     }
                 }
             }
         }
         .other-group{
             display: flex;
             justify-content: space-between;
             flex-wrap: wrap; //换行
             li{
                 padding: 10px 20px;
                 box-sizing: border-box;
                 .rank-top{
                     position: relative;
                     img{
                         width: 200px;
                         height: 200px;
                         border-radius: 10px;
                     }
                     p{
                         position: absolute;
                         left: 10px;
                         bottom: 10px;
                         color: #fff;
                         @include font_size($font_medium_s)
                     }
                 }
                 .rank-bottom{
                     width: 200px;
                     @include no-wrap();
                     p{
                         padding: 10px 0;
                         @include font_size($font_medium_s);
                         @include font_color();
                     }
                 }
             }
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
 }
</style>
