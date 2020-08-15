<template>
    <div class="header" @click="changeFn">
        <div class="header-left" @click.stop="back"></div>
        <ul class="header-title">
            <li :class="{'active': switchNum === 0 }" @click.stop="switchItem(0)">我喜欢的</li>
            <li :class="{'active': switchNum === 1 }" @click.stop="switchItem(1)">最近听的</li>
        </ul>
        <div class="header-right"></div>
    </div>
</template>

<script>
export default {
  name: 'AccountHeader',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0,
      switchNum: 0
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
    },
    // 控制点击激活状态
    switchItem (num) {
      this.switchNum = num
      // 调用父组件传递的方法,并将num传回父组件
      this.$emit('switchItem', num)
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
        display: flex;
        justify-content: center;
        color: #fff;
        height: 60px;
        margin-top: 20px;
        font-weight: bold;
        border: 1px solid #fff;
        border-radius: 10px;
        @include font_size($font_medium);
        @include no-wrap();
        li{
            height: 60px;
            line-height: 60px;
            padding: 0 20px;
            &:nth-of-type(1){
                border-right: 1px solid #fff;
            }
            &.active{
                background: rgba(255,255,255,0.3);
            }
        }
    }
}
</style>
