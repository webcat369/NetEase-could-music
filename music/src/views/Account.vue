<template>
    <transition appear>
        <div class="account">
            <AccountHeader @switchItem="switchItem"></AccountHeader>
            <AccountBottom :switchNum="switchNum"></AccountBottom>
        </div>
    </transition>
</template>

<script>
import AccountHeader from '../components/Account/AccountHeader'
import AccountBottom from '../components/Account/AccountBottom'
/* 统一管理SEO三大标签的插件 */
import MateInfo from '../../vue-meta-info'
export default {
  name: 'Account',
  metaInfo: MateInfo.account,
  components: {
    AccountHeader,
    AccountBottom
  },
  data: function () {
    return {
      switchNum: 0
    }
  },
  methods: {
    switchItem (num) {
      this.switchNum = num
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../assets/css/variable";
    @import "../assets/css/mixin";
.account{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /*background: #42b983;*/
    @include bg_sub_color();
}
.v-enter{
    transform:translateX(100%);
}
.v-enter-to{
    transform:translateX(0%);
}
.v-enter-active{
    /*用3s的时间过渡从显示开始到显示结束*/
    transition: transform 1s;
}
.v-leave{
    transform:translateX(0%);
}
.v-leave-to{
    transform:translateX(100%);
}
.v-leave-active{
    /*用3s的时间过渡从隐藏开始到隐藏结束*/
    transition: transform 1s;
}
</style>
