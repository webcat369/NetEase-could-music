<template>
<!--封装网络加载指示器-->
  <div class="container" v-show="isShow">
    <p class="loading"></p>
    <p class="title">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data: function () {
    return {
      title: '正在加载...',
      isShow: false
    }
  }
}
</script>

<style scoped>
    .container{
      width: 200px;
      height: 200px;
      border-radius: 20px;
      background: rgba(0,0,0,0.5);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    .loading{
      width: 100px;
      height: 100px;
      border: 5px solid #fff;
      border-radius: 50%;
      margin: 20px auto;
      border-right-color: #3a8ee6;
      animation:loaing 2s linear infinite;
    }
    .title{
      text-align: center;
      font-size: 16px;
      color: #fff;
    }
    @keyframes loaing {
      from{
        transform: rotate(0deg);
      }
      to{
        transform: rotate(360deg);
      }
    }
</style>
