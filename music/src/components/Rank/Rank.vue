<template>
    <ul class="other-group">
        <li v-for="obj in category[key]" :key="obj.rank.id">
            <div class="rank-top">
                <img v-lazy="obj.rank.coverImgUrl" alt="">
                <p>{{obj.rank.updateFrequency}}</p>
            </div>
            <div class="rank-bottom">
                <p>{{obj.rank.name}}</p>
            </div>
        </li>
    </ul>
</template>

<script>
import { getTopListDetail } from '../../api/index'
export default {
  name: 'Rank',
  data: function () {
    return {
      // 保存服务器返回的数据
      category: {}
    }
  },
  created () {
    getTopListDetail()
      .then((data) => {
        console.log(data)
        this.category = data
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
    .other-group{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap; //换行
        li{
            padding: 10px 20px;
            box-sizing: border-box;
            .rank-top{
                position: relative;
                img{
                    width: 200px;
                    height: 200px;
                    border-radius: 10px;
                }
                p{
                    position: absolute;
                    left: 10px;
                    bottom: 10px;
                    color: #fff;
                    @include font_size($font_medium_s)
                }
            }
            .rank-bottom{
                width: 200px;
                @include no-wrap();
                p{
                    padding: 10px 0;
                    @include font_size($font_medium_s);
                    @include font_color();
                }
            }
        }
    }
</style>
