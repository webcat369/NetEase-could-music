<template>
    <swiper :options="swiperOptions" class="banner">
        <swiper-slide class="cd">
          <div class="cd-warpper" ref="cdWarpper">
              <img :src="currentSong.picUrl" alt="">
          </div>
            <!--调用获取第一句歌词的方法-->
           <p>{{getFirstLyric()}}</p>
        </swiper-slide>
        <swiper-slide class="lyric" ref="lyric">
            <ScrollView ref="scrollView">
                <ul>
                    <!--for循环中:
                         value是每句歌词且类型是字符串;
                         key是每句歌词的的播放时间且类型是字符串;
                    -->
                    <!--
                    通过v-bind给元素动态的绑定类名:实现歌词高亮
                        传入的对象{"key" : value}中key是类名名称;
                        因为不是每条歌词都绑定这个类名,只有满足条件才能绑定,所有value动态绑定类名的条件;
                    -->
                    <li v-for="(value,key) in currentLyric" :key="key" :class="{'active': currentLineNumber === key}">{{value}}</li>
                </ul>
            </ScrollView>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
/* 利用swiper组件实现CD界面和lyric界面的滑动切换 */
import ScrollView from '../ScrollView'
import { mapGetters } from 'vuex'
export default {
  name: 'PlayerMiddle',
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOptions: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet', // 自定义分页器类名
          bulletActiveClass: 'my-bullet-active' // 自定义分页器激活状态下类名
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNumber: '0'
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyric'
    ])
  },
  watch: {
    // 通过 mapGetters 映射 'isPlaying'实现播放器“播放图标”和播放器“封面图片”的同步
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWarpper.classList.add('active')
      } else {
        this.$refs.cdWarpper.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
      // console.log(newValue)  0.083528
      // console.log(Math.floor(newValue)) // Math.floor()向下取整

      /* 出现的问题:
      *     1.当我们手动拖拽进度条到某个位置时,高亮歌词需要等好一会才会反映到对应的歌词
      *     2.当我们手动拖拽进度条到某个位置没有对应的时间时,高亮歌词就一直会在上一句停留

        // 1.高亮歌词同步
        const lineNem = Math.floor(newValue) + '' // 加上 + '' 让Math.floor(newValue)类型变为字符串类型
        const result = this.currentLyric[lineNem]
        // console.log(result)打印出来是每句歌词

        // 歌词不是未定义且不为空的情况下,才会修改下一句歌词的高亮
        if (result !== undefined && result !== '') {
        this.currentLineNumber = lineNem

        // 2.歌词滚动同步 (修改完高亮歌词后在进行滚动--性能更高)
        // 2.1 高亮的那句歌词距离'歌词盒子顶部'的距离
        const currentLyricTop = document.querySelector('li.active').offsetTop
        // console.log(currentLyricTop)
        // 2.2 '歌词盒子'整个的高度
        const lyricHeight = this.$refs.lyric.$el.offsetHeight
        // console.log(this.$refs.lyric) 拿得的是Vue组件
        // console.log(this.$refs.lyric.$el) 拿得的是Vue组件中'歌词盒子'的代码段
        // console.log(lyricHeight) // '歌词盒子'的整个的高度:1545
        // 2.3 '歌词盒子'一半的长度
        const lyricHeightHalf = lyricHeight / 2
        // console.log(lyricHeightHalf)
        // 2.4 当前高亮歌词 > '歌词盒子'一半的长度 时,歌词开始滚动
        if (currentLyricTop >= lyricHeightHalf) {
          console.log('开始滚动')
        //scrollTo方法的用途:滚动页面元素到指定位置 (x方向上滚动范围,y方向上滚动范围,滚动所需时间)

        this.$refs.scrollView.scrollTo(0, lyricHeightHalf - currentLyricTop, 100)
        }
      }
      */
      // 解决出现的问题,修改上述代码
      // 1.高亮歌词同步
      const lineNem = Math.floor(newValue) // 歌词前的时间
      this.currentLineNumber = this.getActiveLineNum(lineNem)
      // 2.歌词滚动同步 (修改完高亮歌词后在进行滚动--性能更高)
      // 2.1 高亮的那句歌词距离'歌词盒子顶部'的距离
      const currentLyricTop = document.querySelector('li.active').offsetTop
      // console.log(currentLyricTop)
      // 2.2 '歌词盒子'整个的高度
      const lyricHeight = this.$refs.lyric.$el.offsetHeight
      // console.log(this.$refs.lyric) 拿得的是Vue组件
      // console.log(this.$refs.lyric.$el) 拿得的是Vue组件中'歌词盒子'的代码段
      // console.log(lyricHeight) // '歌词盒子'的整个的高度:1545
      // 2.3 '歌词盒子'一半的长度
      const lyricHeightHalf = lyricHeight / 2
      // console.log(lyricHeightHalf)
      // 2.4 当前高亮歌词 > '歌词盒子'一半的长度 时,歌词开始滚动
      if (currentLyricTop >= lyricHeightHalf) {
        // console.log('开始滚动')
        // scrollTo方法的用途:滚动页面元素到指定位置 (x方向上滚动范围,y方向上滚动范围,滚动所需时间)

        this.$refs.scrollView.scrollTo(0, lyricHeightHalf - currentLyricTop, 100)
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100)
      }
    },
    currentLyric (newValue, oldValue) {
      /*
      因为有些歌曲的第一句歌词的时间不是0秒,所以点击播放后第一句歌词不会高亮
      还会导致出现Error in callback for watcher "currentTime":
      "RangeError: Maximum call stack size exceeded"的错误,
      为了解决这个问题,我们设置一个循环,
      只有歌词一发生变化,就将新的一首歌的歌词前的时间赋值给currentLineNumber,让它不再是0
      是能实现就算歌词的第一句时间不是0秒,也能让第一句歌词高亮
     */
      for (const key in newValue) {
        // console.log(key)
        // console.log(newValue)
        this.currentLineNumber = key
        return
      }
    }
  },
  methods: {
    // 获取到第一句歌词 的方法
    getFirstLyric () {
      for (const key in this.currentLyric) {
        // console.log(key)  返回的是第一句歌词前面的“索引”时间值
        // 例如：8: "You know what they say" --> 返回的就是8
        return this.currentLyric[key]
      }
    },
    // 获取高亮歌词的递归方法
    getActiveLineNum (lineNem) {
      if (lineNem < 0) {
        return this.currentLineNumber
      }
      const result = this.currentLyric[lineNem + ''] // 加上 + '' 让Math.floor(newValue)类型变为字符串类型
      if (result === undefined || result === '') {
        lineNem--
        return this.getActiveLineNum(lineNem)
      } else {
        return lineNem + ''
      }
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
.banner{
    position: fixed;
    top: 150px;
    bottom: 250px;
    right: 0;
    left: 0;
    .cd{
        .cd-warpper{
            display: block;
            margin: 0 auto;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            border: 10px solid #fff;
            overflow: hidden;
            animation: sport 3s linear infinite;
            animation-play-state: paused; //开始动画为 暂停状态
            &.active{  // 播放按钮被点击 开始动画
                animation-play-state: running;
            }
            img{
                width: 100%;
                height:100%;
            }
        }
        p{
            text-align: center;
            @include font_size($font_medium);
            @include font_color();
            margin-top: 50px;
        }
    }
    .lyric{
        li{
            text-align: center;
            @include font_size($font_medium);
            @include font_color();
            margin: 10px 0;
            &:last-of-type{
                padding-bottom:60%;
            }
            &.active{  //歌词高亮
                color: #fff;
            }
        }
    }

}
    @keyframes sport {
        from{
          transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }
</style>
<style lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
    .my-bullet{
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background: #fff;
        margin:0 20px;
    }
    .my-bullet-active{
        width: 50px;
      @include bg_color();
    }
</style>
