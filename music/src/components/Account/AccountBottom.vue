<template>
    <div class="account-bottom">
        <div class="bottom-play" @click="selectAllMusic">
            <span></span>
            <span>播放全部</span>
        </div>
        <div class="bottom-wrapper">
            <ScrollView>
                <SongListItem :songs="switchNum === 0 ?  favoriteList : historyList"></SongListItem>
            </ScrollView>
        </div>
    </div>
</template>

<script>
import ScrollView from '../ScrollView'
import SongListItem from '../SongListItem'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'AccountBottom',
  components: {
    ScrollView,
    SongListItem
  },
  computed: {
    ...mapGetters([
      'favoriteList',
      'historyList'
    ])
  },
  props: {
    switchNum: {
      type: Number,
      default: 0,
      request: true
    }
  },
  methods: {
    // 将mutaions中的方法映射到组件中
    ...mapActions([
      'setFullScreen',
      'setSongDetail',
      'setCurrentIndex'
    ]),
    // 在组件中调用mutaions中的方法
    ...mapMutations([
      'SET_SONG_DETAIL'
    ]),
    // 播放列表中全部歌曲 的方法
    selectAllMusic () {
      // let ids = []
      if (this.switchNum === 0) {
        /* map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。 */
        // ids = this.favoriteList.map(function (item) {
        //   return item.id
        // })
        // this.$store.commit('SET_SONG_DETAIL', this.favoriteList)
        // 优化代码:利用mapMutations在组件中调用mutaions中的SET_SONG_DETAIL方法
        this.SET_SONG_DETAIL(this.favoriteList)
      } else {
        // ids = this.historyList.map(function (item) {
        //   return item.id
        // })
        this.SET_SONG_DETAIL(this.historyList)
      }

      // console.log(ids)
      // this.setSongDetail
      this.setFullScreen(true)
      this.setCurrentIndex(0)
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
  .account-bottom{
      position: fixed;
      top: 100px;
      left: 0;
      right: 0;
      bottom: 0;
      /*background: skyblue;*/
      .bottom-play{
          width: 260px;
          height: 60px;
          margin: 20px 0;
          margin-left: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #000;
          @include border_color();
          border-radius: 30px;
          span{
              display: block;
              &:nth-of-type(1){
                  width: 46px;
                  height: 46px;
                  @include bg_img('../../assets/images/small_play');
                  margin-right: 20px;
              }
          }
      }
      .bottom-wrapper{
         position: fixed;
          top: 200px;
          left: 0;
          right: 0;
          bottom: 0;
          /*background: blueviolet;*/
          overflow: hidden;
      }
  }
</style>
