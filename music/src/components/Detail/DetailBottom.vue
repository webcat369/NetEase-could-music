<template>
    <ul class="detail-bottom">
        <li class="bottom-top" @click="selectAllMusic">
            <div class="bottom-icon"></div>
            <div class="bottom-title">播放全部</div>
        </li>
        <li v-for="value in playlist" :key="value.id" class="item" @click="selectMusic(value.id)">
            <h3>{{value.name}}</h3>
            <p>{{value.al.name}} - {{value.ar[0].name}}</p>
        </li>
    </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DetailBottom',
  props: {
    playlist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    // 使用 mapActions 辅助函数将 actions 中的方法映射成局部方法
    ...mapActions([
      /* 通过在组件中分发 Action的方式：在界面上触发Actions中的方法 */
      'setFullScreen', // 将 `this.setFullScreen()` 映射为 `this.$store.dispatch('setFullScreen')`
      'setSongDetail'
    ]),
    selectMusic (id) {
      // console.log(id)
      /*
        * 通过分发 Action的方式：在界面上触发Actions中的方法
        * this.$store.dispatch('setFullScreen', true)
        * */
      this.setFullScreen(true) // 触发通过...mapActions辅助函数映射的actions中的'setFullScreen'方法
      this.setSongDetail([id]) // 调用actions中的‘setSongDetail’方法 向服务器发送获取歌曲ID的请求
    },
    // 播放列表中全部歌曲 的方法
    selectAllMusic () {
      this.setFullScreen(true)
      /* map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。 */
      const ids = this.playlist.map(function (item) {
        return item.id
      })
      // console.log(ids)
      this.setSongDetail(ids)
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";
  .detail-bottom{
      width: 100%;
      li{
          width: 100%;
          height: 100px;
          padding: 20px;
          box-sizing: border-box;
          @include bg_sub_color();
          border-bottom: 1px solid #ccc;
      }
      .bottom-top{
          display: flex;
          align-items: center;
          border-top-left-radius: 50px;
          border-top-right-radius: 50px;
          .bottom-icon{
              width: 60px;
              height: 60px;
              @include bg_img('../../assets/images/small_play');
              margin-right: 20px;
          }
          .bottom-title{
              @include font_color();
              @include font_size($font_large);
          }
      }
      .item{
         h3{
             @include font_color();
             @include font_size($font_medium);
         }
          p{
              @include font_color();
              @include font_size($font_small);
          }
      }
  }
</style>
