<template>
    <div class="header" @click="changeFn">
        <div class="header-left"></div>
        <p class="header-title">知播渔音乐</p>
        <div class="header-right"></div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    changeFn () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      // 把拿到的theme,theme1,theme2三个参数保存成一个自定义属性，绑定在html标签上
      // 通过document.documentElement可以拿到html标签
      // 通过setAttribute('data-theme',  this.themes[this.index])设置一个自定义属性'data-theme'，取值就是拿到的参数
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    }
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
    .header-left,.header-right{
        width: 84px;
        height: 84px;
        margin-top: 8px;
    }
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
