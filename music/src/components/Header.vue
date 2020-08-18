<template>
    <!--
    <div class="header" @click="changeFn">
        <div class="header-left"></div>
        <p class="header-title">知播渔音乐</p>
        <div class="header-right" @click.stop="accountClick"></div>
    </div>
    -->
    <!--改造头部代码,将头部封装成一个组件-->
    <div class="header" @click="changeFn">
        <div class="left">
            <slot name="left">左边</slot>
        </div>
        <slot name="middle">中间</slot>
        <div class="right">
            <slot name="right">右边</slot>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    ...mapActions([
      'setShowMiniPlayer',
      'setIsPlaying'
    ]),
    // 公共的换肤方法
    changeFn () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      // 把拿到的theme,theme1,theme2三个参数保存成一个自定义属性，绑定在html标签上
      // 通过document.documentElement可以拿到html标签
      // 通过setAttribute('data-theme',  this.themes[this.index])设置一个自定义属性'data-theme'，取值就是拿到的参数
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    // 点击个人中心按钮给http中加上一个account地址
    accountClick () {
      this.$router.push('/account')
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying'
    ])
  }
}
</script>

<style scoped lang="scss">
    @import "../assets/css/variable";
    @import "../assets/css/mixin";
.header{
    width: 100%;
    height: 100px;
    @include bg_color();
    display: flex;
    justify-content: space-between;
    .left,.right{
        width: 84px;
        height: 84px;
        margin-top: 8px;
        *{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
