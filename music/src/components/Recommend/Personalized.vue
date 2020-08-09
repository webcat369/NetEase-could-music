<template>
    <div class="personalized">
        <div class="personalized-top">
            <h3>{{title}}</h3>
        </div>
        <div class="personalized-list">
            <div class="item" v-for="value in personalized" :key="value.id" @click="selectItem(value.id)">
                <!--<img :src="value.picUrl">-->
                <img v-lazy="value.picUrl">
                <p>{{value.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Personalized',
  // 传递数据：prop:["XXX"]
  props: {
    personalized: {
      type: Array,
      default: () => [],
      require: true
    },
    title: {
      type: String,
      default: '',
      require: true
    },
    type: {
      type: String,
      default: '',
      require: true
    }
  },
  methods: {
    selectItem (id) {
      /*
      this.$emit()接受的数据：
      1.子组件中接受父组件(recommend推荐界面)的方法select
      2.子组件中接受父组件personalized{}或者album{}中获取到数据中的id值
      3.子组件中接受父组件通过传递:type="‘personalized’"或者:type="‘album’"来区分推荐歌单/最新专辑模块的数据
      */
      this.$emit('select', id, this.type)
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";
    .personalized{
        @include bg_sub_color();
        .personalized-top{
            width: 100%;
            height: 84px;
            line-height: 84px;
            border-bottom: 1px solid #ccc;
            @include bg-sub_color();
            h3{
                @include font_size($font_large);
                font-weight: bold;
                @include font_color();
            }
        }
        .personalized-list{
            width: 100%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            padding: 20px 0;
            .item{
                width: 200px;
                padding-bottom: 20px;
               img{
                   width: 200px;
                   height: 200px;
                   border-radius: 20px;
               }
                p{
                    @include clamp(2);
                    @include font_size($font_medium_s);
                    @include font_color();
                    text-align: center;
                }
            }
        }

    }

</style>
