<template>
    <div class="tabbar">
        <router-link tag="div" class="item" to="/recommend">
            <span>推荐</span>
        </router-link>
        <router-link tag="div" class="item" to="/singer">
            <span>歌手</span>
        </router-link>
        <router-link tag="div" class="item" to="/rank">
            <span>排行</span>
        </router-link>
        <router-link tag="div" class="item" to="/search">
            <span>搜索</span>
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<style scoped lang="scss">
    @import "../assets/css/variable";
    @import "../assets/css/mixin";
 .tabbar{
     width: 100%;
     height: 84px;
     @include bg_sub_color();
     display: flex;
     justify-content: space-around;
     .item{
         span{
             line-height: 84px;
             @include font_size($font_medium);
             @include font_color();
         }
         &.router-link-active{
             /* 点击哪个item,哪个item就会多一个router-link-active类名,表示此item处于激活状态下 */
             span{
                 @include font_active_color();
             }
             border-bottom: 5px solid #000;
             /* @include border_color()这句代码可以覆盖上面边框的黑色*/
             @include border_color();
         }
     }
 }
</style>
