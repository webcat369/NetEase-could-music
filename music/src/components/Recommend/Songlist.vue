<template>
    <div class="song">
        <div class="song-top">
           <h3>最新音乐</h3>
        </div>
        <SongListItem :songs="songs"></SongListItem>
    </div>
</template>

<script>
import SongListItem from '../SongListItem'
export default {
  name: 'Songlist',
  props: {
    songs: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  components: {
    SongListItem
  }

}
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";
.song{
    width: 100%;
    @include bg_sub_color();
    .song-top{
        width: 100%;
        height: 84px;
        line-height: 84px;
        border-bottom: 1px solid #ccc;
        @include bg-sub_color();
        h3{
            @include font_size($font_large);
            font-weight: bold;
            @include font_color();
        }
    }

}
</style>
