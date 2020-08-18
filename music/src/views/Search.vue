<template>
    <div class="search">
        <div class="search-box">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
            <input type="text" placeholder="搜索歌曲,歌手,专辑" v-model="keywords" v-throttle="search">
        </div>
        <div class="search-suggest" v-show="keywords !== ''">
            <ScrollView>
                <ul>
                    <li v-for="value in songs" :key="value.id" @click.stop="selectMusic(value.id)">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
                        <p>{{value.name}} - {{value.artists[0].name}}</p>
                    </li>
                </ul>
            </ScrollView>
        </div>
        <div class="search-hot">
            <h3>热门搜索</h3>
            <ul>
                <li v-for="(value,index) in hotList" :key="index" @click.stop="selectHot(value.first)">{{value.first}}</li>
            </ul>
        </div>
        <ul class="search-history">
            <li v-for="value in searchHistory" :key="value">
                <div class="history-left">
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
                    <p>{{value}}</p>
                </div>
                <div class="history-right">
                    <img @click.stop="delHistory(value)" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" alt="">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import ScrollView from '../components/ScrollView'
import { getSearchList, getHotList } from './../api/index'
import { mapActions } from 'vuex'
import { setLocalStorage, getLocalStorage } from '../tools/tools'
/* 统一管理SEO三大标签的插件 */
import MateInfo from '../../vue-meta-info'
export default {
  name: 'Search',
  metaInfo: MateInfo.search,
  data: function () {
    return {
      // 保存输入框输入的内容
      keywords: '',
      // 保存返回的'与输入框输入内容相关'的结果
      songs: [],
      // 保存返回的'热搜列表(简易)'的结果
      hotList: [],
      // 保存搜索历史
      searchHistory: []
    }
  },
  components: {
    ScrollView
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    // 输入框被输入内容的同时会发送请求,请求与输入内容相关的数据
    search () {
      // console.log('发送请求')
      // 传入参数'keywords' : 关键词
      getSearchList({ keywords: this.keywords })
        .then((data) => {
          // console.log(data) //返回与输入内容相关的结果
          this.songs = data.result.songs
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 点击搜索列表中的某首歌,出现全屏播放器,播放该歌曲
    selectMusic (id) { // 点击哪首歌,就将那首歌的id传进来
      this.setFullScreen(true)
      this.setSongDetail([id])

      // 判断本地有没有保存过'搜索历史',如果有保存过,就不在保存了
      if (this.searchHistory.includes(this.keywords)) {
        return
      }
      // 如果没有保存,就先保存到data的searchHistory中
      this.searchHistory.push(this.keywords)
      // 然后将searchHistory保存到本地
      setLocalStorage('searchHistory', this.searchHistory)
      // 清空输入框输入的内容
      this.keywords = ''
    },
    // 点击'热门搜索'中的歌曲后,会出现在<input>中
    selectHot (name) { // name:传入的歌曲名
      this.keywords = name
      /*
        在<input>标签中,如果直接给value赋值是不会触发oninput事件的,
        也就不会出现搜索列表,所以我们现在需要手动触发oninput事件
      */
      this.search()
    },
    // 点击删除'历史播放列表'中的歌曲
    delHistory (name) { // name:当前被点击需要删除的歌曲
      this.searchHistory = this.searchHistory.filter(function (item) {
        // console.log(item)
        return item !== name
      })
      // 需要重新保存到本地
      setLocalStorage('searchHistory', this.searchHistory)
    }
  },
  // 自定义局部指令
  directives: {
    // throttle:节流
    throttle: {
      // 指令的定义
      inserted: function (el, obj) { // el:指令所绑定的元素，可以用来直接操作 DOM; obj: 一个对象;
        // 定时器
        let timerId = null
        // 标记
        let flag = true
        // 监听input变化
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timerId && clearTimeout(timerId)
          timerId = setTimeout(function () {
            flag = true
            obj.value() // value：指令的绑定值; 调用了value就相当于调用了传递的参数
          }, 1000)
        })
      }
    }
  },
  // 创建的时候调用接口方法
  created () {
    getHotList()
      .then((data) => {
        // console.log(data)
        this.hotList = data.result.hots
      })
      .catch(function (err) {
        console.log(err)
      })
    // 在创建的时候,就在本地获取一下搜索历史,看是否有
    if (getLocalStorage('searchHistory') === undefined || getLocalStorage('searchHistory') === null) {
      return
    }
    // 如果本地有,就将本地的赋值给data中的searchHistory
    this.searchHistory = getLocalStorage('searchHistory')
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
@import "../assets/css/variable";
.search{
   position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    @include bg_sub_color();
    .search-box{
        display: flex;
        align-items: center;
        height: 60px;
        margin: 40px 20px;
        background: #ebecec;
        border-radius: 30px;
        border-bottom: 1px solid #ccc;
        img{
            width: 40px;
            height: 40px;
            margin-left: 20px;
        }
        input{
            border: none;
            outline: none;
            background: transparent;
            @include font_size($font_medium);
            margin-left: 20px;
        }
    }
    .search-suggest{
        @include bg_sub_color();
        position: fixed;
        top: 300px;
        left: 0;
        right: 0;
        bottom: 0;
        /*background: #42b983;*/
        overflow: hidden;
        li{
            display: flex;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #ccc;
            img{
                width: 40px;
                height: 40px;
            }
            p{
                margin-left: 20px;
                @include font_color();
                @include font_size($font_medium);
            }
        }
    }
    .search-hot{
        h3{
            @include font_size($font_medium);
            @include font_color();
            padding: 10px 20px;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                height: 60px;
                line-height: 60px;
                border: 1px solid #000;
                border-radius: 30px;
                padding: 0 20px;
                @include font_size($font_medium_s);
                @include font_color();
                margin: 10px 20px;
            }
        }
    }
    .search-history{
        margin-top: 20px;
        li{
            display: flex;
            justify-content: space-between;
            padding: 20px 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #ccc;
            .history-left{
                display: flex;
                align-items: center;
                img{
                    width: 40px;
                    height: 40px;
                }
                p{
                    margin-left: 20px;
                    @include font_color();
                    @include font_size($font_medium);
                }
            }
            .history-right{
                img{
                    width: 30px;
                    height: 30px;
                }
            }
        }
    }
}
</style>
