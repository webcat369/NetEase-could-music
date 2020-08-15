<template>
    <div class="singer">
        <ScrollView ref="scrollView">
            <ul class="list-wrapper">
                <li class="list-group" v-for="(value,index) in list" :key="index" ref="listGroup">
                    <h3 class="group-title">{{keys[index]}}</h3>
                    <ul>
                        <li class="group-item" v-for="obj in list[index]" :key="obj.id">
                            <img v-lazy="obj.picUrl" alt="">
                            <p>{{obj.name}}</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </ScrollView>
        <ul class="list-keys">
<!--            <li v-for="(key,index) in keys"-->
<!--                :key="key"-->
<!--                @click.stop="keyDown(index)"-->
<!--                :class="{'active': currentIndex === index}">{{key}}-->
            <li v-for="(key,index) in keys"
                :key="key"
                :data-index="index"
                @touchstart.stop.prevent="touchstart"
                @touchmove.stop.prevent="touchmove"
                :class="{'active': currentIndex === index}">{{key}}
            </li>
        </ul>
    </div>
</template>

<script>
import { getHotArtists, getLetterArtists, getAllArtists } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Singer',
  components: {
    ScrollView
  },
  created () {
    getHotArtists()
      .then(function (result) {
        console.log(result)
      })
      .catch(function (err) {
        console.log(err)
      })

    getLetterArtists('b')
      .then(function (result) {
        console.log(result)
      })
      .catch(function (err) {
        console.log(err)
      })

    getAllArtists()
      .then((result) => {
        // console.log(result)
        this.keys = result.keys
        this.list = result.list
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  data: function () {
    return {
      // 保存'热'-z
      keys: [],
      // '热'-z 每个首字母对应的保存歌手名的27个数组
      list: [],
      // 保存27个数组距离顶部的长度
      groupsTop: [],
      currentIndex: 0,
      // 记录按下的位置
      beginOffsetY: 0,
      // 记录移动的位置
      moveOffsetY: 0
    }
  },
  // watch:只能监听数据的变化,数据变化的时候不一定渲染完了
  watch: {
    // 监听数据list的变化,只有渲染完,才能拿到每个数组距离顶部的长度
    list () {
      // console.log(this.$refs.listGroup)  返回:undefined,因为数据已经开始渲染但还没有渲染完
      // vue提供了nextTick():只有渲染完成才会执行回调函数的代码
      this.$nextTick(() => {
        // console.log(this.$refs.listGroup)
        this.$refs.listGroup.forEach((group) => {
          this.groupsTop.push(group.offsetTop)
        })
        // console.log(this.groupsTop)
      })
    }
  },
  mounted () {
    // 自定义ScrollView组件中方法scrolling:一个监听滚动的偏移位的方法
    this.$refs.scrollView.scrolling((y) => {
      // console.log(y)    向上滚动:y是大于0的值;  向下滚动:y是小于0的值
      // 处理第一个区域
      if (y >= 0) {
        this.currentIndex = 0
        return
      }
      // 处理中间的区域
      for (let i = 0; i < this.groupsTop.length - 1; i++) {
        // 取出前一个区域
        const preTop = this.groupsTop[i]
        // 取出后一个区域
        const netTop = this.groupsTop[i + 1]
        // 判断当前滚出的偏移位是否在这个区域范围内
        if (-y >= preTop && -y <= netTop) {
          this.currentIndex = i
          return
        }
      }
      // 处理最后一个区域
      this.currentIndex = this.groupsTop.length - 1
    })
  },
  methods: {
    // 内置按键滚动导航方法
    _keyDown (index) {
      // console.log(index)
      const offsetY = this.groupsTop[index]
      // console.log(offsetY)
      this.$refs.scrollView.scrollTo(0, -offsetY)
      // 将'当前被点击的字母的索引index'赋给 currentIndex
      this.currentIndex = index
    },
    touchstart (e) { // e:事件触发时的事件对象
      // console.log(e.target) // 拿到触发事件的按键
      // console.log(e.target.dataset) // 拿到触发事件的按键绑定对应的数据
      // console.log(typeof (e.target.dataset.index)) // 拿到触发事件的按键绑定的索引,字符串类型
      const index = parseInt(e.target.dataset.index)
      this._keyDown(index)

      // console.log(e.touches[0])//获取到按下位置在屏幕中的位置信息
      // 按下的位置
      this.beginOffsetY = e.touches[0].pageY
    },
    touchmove (e) {
      // 移动以后的位置
      this.moveOffsetY = e.touches[0].pageY
      // 移动的距离
      const moveDistance = this.moveOffsetY - this.beginOffsetY
      // console.log(e.target.offsetHeight) // 拿到按下按键的的高度
      // 比例
      const ratio = moveDistance / e.target.offsetHeight
      let index = parseInt(e.target.dataset.index) + Math.floor(ratio)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this._keyDown(index)
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../assets/css/variable";
    @import "../assets/css/mixin";
 .singer {
     position: fixed;
     top: 184px;
     left: 0;
     bottom: 0;
     right: 0;
     overflow: hidden;
     @include bg_sub_color();
     .list-wrapper {
         /*width: 100%;*/
         /*height: 100%;*/
         .list-group {
             .group-title {
                 @include bg_color();
                 @include font_size($font_medium);
                 color: #fff;
                 padding: 10px 20px;
                 box-sizing: border-box;
             }

             .group-item {
                 display: flex;
                 justify-content: flex-start;
                 padding: 10px 20px;
                 border-bottom: 1px solid #ccc;

                 img {
                     width: 100px;
                     height: 100px;
                     border-radius: 50%;
                     overflow: hidden;
                 }

                 p {
                     @include font_size($font_medium);
                     @include font_color();
                     display: flex;
                     align-items: center;
                     margin-left: 20px;
                 }
             }
         }
     }
     .list-keys {
         position: fixed;
         top: 55%;
         right: 10px;
         transform: translateY(-50%);
         li{
             @include font_color();
             @include font_size($font_medium_s);
             padding: 4px 0;
             &.active{
                 text-shadow: 0 0 10px #000;
             }
         }
     }
 }
</style>
