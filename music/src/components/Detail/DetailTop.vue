<template>
    <div class="detail-top">
        <div class="img-container">
            <!--需要外界传递图片地址(path)-->
            <img :src="path" alt="">
            <!--给图片设置蒙版-->
            <div class="mask" ref="mask"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    path: {
      type: String,
      default: '',
      require: true
    }
  },
  methods: {
    // 子组件DetailTop.vue提供一个改变蒙板透明度的方法给父组件Detail.vue使用
    changeMask (opacity) { // opacity：从父组件Detail.vue中传入的透明度的变化值
      this.$refs.mask.style.opacity = opacity
    }
  }
}
</script>

<style scoped lang="scss">
 .detail-top{
     width: 100%;
     height: 500px;
     overflow: hidden;
     position: relative;
     img{
         width: 100%;
     }
     .mask{
         position: absolute;
         background: #000;
         width: 100%;
         height: 100%;
         left: 0;
         top: 0;
         opacity: 0;
     }
 }
</style>
