<template>
    <div class="header" @click="changeFn">
        <div class="header-left" @click.stop="back"></div>
        <!--需要外界传递歌单名(title)-->
        <p class="header-title">{{title}}</p>
        <div class="header-right"></div>
    </div>
</template>

<script>
export default {
  name: 'DetailHeader',
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
    },
    back () {
      // 返回到上一页(推荐界面)
      window.history.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      require: true
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
.header{
    width: 100%;
    height: 100px;
    /*background: red;*/
    @include bg_color();
    display: flex;
    justify-content: space-between;
    /*position: relative;*/
    /*z-index: 999;*/
    .header-left,.header-right{
        width: 84px;
        height: 84px;
        /*background: #000;*/
        margin-top: 8px;
    }
    .header-left{
        @include bg_img('../../assets/images/back')
    }
    .header-right{
        @include bg_img('../../assets/images/more')
    }
    .header-title{
        text-align: center;
        line-height: 100px;
        color: #fff;
        font-weight: bold;
        @include font_size($font_medium);
        @include no-wrap();
    }
}
</style>
