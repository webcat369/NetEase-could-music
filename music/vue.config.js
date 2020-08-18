// 由于项目是通过Vue-CLI创建的，所以没有webpack的配置文件，就需要通过创建vue.config.js文件来修改webpack的配置
module.exports = {
  // 新增webpack原生的规则
  publicPath: './',

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/, // 处理.html结尾的文件
          exclude: /node_modules/,
          use: {
            loader: 'html-loader', // 用html-loader组件处理
            options: {
              minimize: true // 处理以后的代码需要压缩
            }
          }
        }
      ]
    }
  },
  // 下列代码是安装了预渲染插件vue-cli-plugin-prerender-spa以后自动添加的
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/recommend',
        '/singer',
        '/rank',
        '/search',
        '/account',
        '/detail'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: route => {
        // console.log(route)
        const reg = /<meta name="viewport".*user-scalable=no">/gi
        const res = route.html.match(reg)
        route.html = route.html.replace(res[1], '')

        // 导入jsdom插件:可以帮助我们在node 中找到DOM元素,并操作DOM元素
        // 1.根据字符串创建一个网页
        // const html = new JSDOM(route.html)
        // 2.从创建好的网页中拿到document对象
        // const dom = html.window.document
        // 3.找到对应的元素,删除对应的元素
        // const loadingEle = dom.querySelector('.container')
        // dom.body.removeChild(loadingEle)
        // jsdom插件的序列化方法:将对象转化成字符串
        // route.html = html.serialize()
        return route
      }
    }
  }
}
