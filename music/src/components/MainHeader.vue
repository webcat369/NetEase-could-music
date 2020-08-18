<template>
    <Header class="header">
        <div slot="left" class="header-left"></div>
        <p slot="middle" class="header-title">知播渔音乐</p>
        <div slot="right" class="header-right" @click.stop="accountClick"></div>
    </Header>
</template>

<script>
import Header from './Header'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'MainHeader',
  components: {
    Header
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying'
    ])
  },
  methods: {
    ...mapActions([
      'setShowMiniPlayer',
      'setIsPlaying'
    ]),
    // 点击个人中心按钮给http中加上一个account地址
    accountClick () {
      this.$router.push('/account')
      if (this.isShowMiniPlayer) {
        this.setShowMiniPlayer(!this.isShowMiniPlayer)
      }
      if (this.isPlaying) {
        this.setIsPlaying(!this.isPlaying)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "./../assets/css/mixin";
@import "./../assets/css/variable";
.header{
   .header-left{
       @include bg_img('../assets/images/logo')
   }
   .header-right{
       @include bg_img('../assets/images/account')
   }
   .header-title{
       text-align: center;
       line-height: 100px;
       color: #fff;
       font-weight: bold;
       @include font_size($font_medium);
   }
}
</style>
