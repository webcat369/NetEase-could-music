<template>
    <div class="player">
        <NormalPlayer></NormalPlayer>
        <MiniPlayer></MiniPlayer>
        <ListPlayer ref="listPlayer"></ListPlayer>
        <audio :src="currentSong.url"></audio>
    </div>
</template>

<script>
/* 全屏的播放器组件 */
import NormalPlayer from '../components/Player/NormalPlayer'
/* 迷你的播放器组件 */
import MiniPlayer from '../components/Player/MiniPlayer'
/* 列表播放器组件 */
import ListPlayer from '../components/Player/ListPlayer'
import { mapGetters } from 'vuex'
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>

<style scoped>
.player{

    background: plum;
}
</style>
