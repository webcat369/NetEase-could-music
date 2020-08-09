<template>
    <swiper :options="swiperOptions" class="banner">
        <swiper-slide class="cd">
          <div class="cd-warpper" ref="cdWarpper">
              <img :src="currentSong.picUrl" alt="">
          </div>
           <p>{{getFirstLyric()}}</p>
        </swiper-slide>
        <swiper-slide class="lyric">
            <ScrollView>
                <ul>
                    <li v-for="(value,index) in currentLyric" :key="index">{{value}}</li>
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
      }
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
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWarpper.classList.add('active')
      } else {
        this.$refs.cdWarpper.classList.remove('active')
      }
    }
  },
  methods: {
    // 获取到第一句歌词
    getFirstLyric () {
      for (const key in this.currentLyric) {
        return this.currentLyric[key]
      }
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
            animation-play-state: paused;
            &.active{
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
                padding-bottom: 100px;
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
