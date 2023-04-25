# Part1用Vue3.0 开发一款导入浏览器书签的在线书签

## 🤵介绍（取名）

👉👉👉【红隼书签】是一款简洁的在线书签导航网站。 名字的由来其实是，本着保护动物，爱护动物的初心，想到起一个鸟类的名称，其实最开始想了很多名字，小詹书签，麻雀书签等。

  


![红隼-kestrel](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ace153ff51d04a4da78f3616c08c58c0~tplv-k3u1fbpfcp-zoom-1.image)

  


但是听起来都不够响亮。后来想了一个食肉的，有点凶猛的又有点呆萌的鸟类的名字，红隼【英文翻译：kestrel】，点个赞。于是就有了这个名字啦，但是听起来也是不错的。于是开发计划开始啦。

  


## 😀数据来源（[印象中文](https://docschina.org/)）

  


他的默认数据为我选的是[印象中文](https://docschina.org/)的web导航数据；其实我自己哪里收藏了更多的导航数据，但是很多设计到公司的一些访问网站。想想还是算了，于是就用了印象中文的数据。它可以修改数据；全局搜索筛选功能；单页面完成逻辑非常简单，新手小白也能完成二次修改开发；采用granim插件完成背景动画；可选择更多动画效果；炫酷光晕背景动画效果。

  


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b029e2bd28d4875b6f6bc472d1909f8~tplv-k3u1fbpfcp-zoom-1.image)

  
  


## 💹 功能/特色

（炫酷光晕背景动画效果，可导入浏览器数据存入LeanCloud）

-   ✅ 1.同步印象中文的web导航数据；书签支持新增、修改和删除

-   ✅ 2.全局搜索筛选功能；本地离线数据持久化，书签增删改查

-   ✅ 3.可登录获取保存在leancloud里面的书签数据，再不用担心书签数据丢失了

-   ✅ 4.采用granim插件完成背景动画；可选择更多动画效果；

-   ✅ 5.支持导入浏览器书签数据（Google，火狐），并存入LeanCloud;

-   ✅ 6.可注册leanCloud并修改appId和appKey；自己部署该书签；

-   ✅ 7.采用Vue3.0 Composition API；也是一个学习Vue3.0 的学习项目；希望帮助更多正在学习VUe 3.0的朋友；

-   ✅ 8.自定义上传背景图片

-   ✅ 9.自定义背景动画效果

-   ✅ 10.导入解析浏览器书签，支持修改、删除并存入LeanCloud

 

## 📝 正在开发的功能

-   👉自定义工具栏

-   👉书签支持多种布局样式（卡片，列表，树形书签结构等）

-   👉支持修改整个书签的图标；目前使用的是红点图标，也挺好看的；

-   👉自定义配色方案

-   👉增加中国风和热门游戏配色效果

-   👉其他功能

  


## 😀自定义导入数据

可以将浏览器的书签导出，然后导入到书签系统中。也可以将书签系统的数据导入到浏览器中。

  


## 😀leancloud存储

数据到云端。只需注册登录即可，后续无需担心数据丢失问题。

  
  


## ⚡主题

目前提供 清晰/暗黑两种主题。后续还会增加更多的主题效果。

##### 👉暗黑


![2.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e6abc93bd354debbe1170d0a7e3589f~tplv-k3u1fbpfcp-watermark.image?)

![3.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fc634e98080478eb0e06046a672b8ff~tplv-k3u1fbpfcp-watermark.image?)
  


##### 👉清新明亮


![1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e39468cc70a94af082c3041d08304548~tplv-k3u1fbpfcp-watermark.image?)

![4.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/961152c473c443488e28c5e4d8827492~tplv-k3u1fbpfcp-watermark.image?)

![5.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec9ac63684f643c7b8b2a3a8c9a7d62b~tplv-k3u1fbpfcp-watermark.image?)

  


## 💌 网址书签

  


========⚡⚡⚡ [红隼书签](http://bookmark.zhanhongzhu.top/) **注意：👉本项目会持续新增功能，但持续维护。如使用中发现问题，请留言或者提交 issue 。谢谢！！！**

  


## 📚安装步骤

  


-   1.克隆项目 https://gitee.com/zhanhongzhu/kestrel-bookmark.git

-   2.进入项目目录 `npm install`

-   3.启动项目`npm run serve`

-   4.打开浏览器即可 localhost:8080 就可以看到界面啦；

-   5.打包命令 `npm run build`

  


## 🚀 效果

  
  
  


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52b83ea3177f420bb289a94e66bdb3dd~tplv-k3u1fbpfcp-zoom-1.image) ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e0df0adde3f4848a4fe3060ea03efc6~tplv-k3u1fbpfcp-zoom-1.image) ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db6a1a9ab3134001a81beea4b885f59e~tplv-k3u1fbpfcp-zoom-1.image) ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/663750e8531d4b77a186519f0bfa5bba~tplv-k3u1fbpfcp-zoom-1.image) ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7ee5b5dd4b045dbab8cfeb787aa3834~tplv-k3u1fbpfcp-zoom-1.image) ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eee207a04c234bbb838946eedfd00d6e~tplv-k3u1fbpfcp-zoom-1.image) ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0b67d480b5c4e43b5646cdc8dbc040a~tplv-k3u1fbpfcp-zoom-1.image) ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eeef8b79fa28404c9021052945fae4f3~tplv-k3u1fbpfcp-zoom-1.image) ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef3c0e9215614a9389e1e6d4e1350dbe~tplv-k3u1fbpfcp-zoom-1.image)

  


#### 😄 源码地址

  


完全开源，大家可以随意研究，二次开发。当然还是十分欢迎大家点个Star⭐⭐⭐\

👉👉[源码链接(gitee)](https://gitee.com/zhanhongzhu/kestrel-bookmark)       👉👉[源码链接(github)](https://github.com/zhanhongzhu/kestrel-bookmark)

  


## 项目结构

  


```

├── src

     ├── Api      // 存放接口

     │    └──common.js  // leancloud-storage公共接口函数封装

     │    └──user.js   // leancloud-storage 登录、登出接口

     ├── assets      // 存放静态资源

     │    └──Json    // 静态数据源json数据

     │    └──svg    // 工具栏图标

     ├── components  //存放组件

     │    └──Dialog.vue  // 新增、修改书签

     │    └──Login.vue    // 登录弹窗

     ├── APP.vue

     └── main.js

```

  


## 💡 项目图标（后续支持修改图标）

  


红隼书签使用了的是[iconfont图标](https://www.iconfont.cn/),设计的小姐姐是[是半夏鸭](https://www.zcool.com.cn/u/21341407),设计的图标太棒了，在此表示感谢。ღ( ´･ᴗ･` )

  


很喜欢这个图标的；![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af70cd5d5ca44552a4bcc71d0b5c0899~tplv-k3u1fbpfcp-zoom-1.image)

  


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/767b6c377ef3495d97b64ccd128aaaec~tplv-k3u1fbpfcp-zoom-1.image)

  


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6986c99ea31f414ebee6c55005437fa3~tplv-k3u1fbpfcp-zoom-1.image)

  


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22c0311e20f142dda970f9ffc4912bf6~tplv-k3u1fbpfcp-zoom-1.image)

  


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8060e82f4864cd79854df3ef1ce7508~tplv-k3u1fbpfcp-zoom-1.image)

  


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/652e0e3cdba843a99d0c22ec21896fa7~tplv-k3u1fbpfcp-zoom-1.image)

  


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/243477afb4b54b59bb70757502d44fcd~tplv-k3u1fbpfcp-zoom-1.image)

  


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03711e54d5394d86a87b1ff59735ea5d~tplv-k3u1fbpfcp-zoom-1.image)

  


👨‍小姐姐的图标作品集地址[图标作品集地址](https://www.zcool.com.cn/work/ZNTI5NTIxMjg=.html)

  
  


## 😀主要功能函数--1、解析浏览器书签为JSON数据

  


```

export function walkBookmarksTree(root) {

  const result = []

  // 深度优先遍历

  const walk = (node, list) => {

    const els = node.children

    if (els && els.length > 0) {

      for (let i = 0; i < els.length; i++) {

        const item = els[i]

        // p标签或h3标签直接跳过

        if (item.tagName === 'P' || item.tagName === 'H3') {

          continue

        }

        // 文件夹不用创建元素

        if (item.tagName === 'DL') {

          walk(els[i], list)

        } else { // DT节点

          let child = null

          // 判断是否是文件夹

          const children = item.children

          let isDir = false

          for (let j = 0; j < children.length; j++) {

            if (children[j].tagName === 'H3' || children[j].tagName === 'DL') {

              isDir = true

            }

          }

          // 文件夹

          if (isDir) {

            child = {

              type: item.tagName === 'DT' ? item.querySelector('h3') ? item.querySelector('h3').innerText : '' : '',

              folder: true,

              children: []

            }

            walk(els[i], child.children)

          } else { // 书签

            const _item = item.querySelector('a')

            if (_item) {

              child = {

                title: _item?.innerText,

                url: _item?.href

              }

            }

          }

          child && list.push(child)

        }

      }

    }

  }

  walk(root, result)

  //过滤不为 folder的书签，保证书签能够识别

  const myBookmark = result.filter(v => v.folder)

  return flagBrowerList(myBookmark)

}

```

  


## 😀2、原生Input文件上传-隐藏input标签，实现点击上传

  


```

 <i class="el-icon-upload2" title="导入浏览器书签" @click="importBookmark">

    <input type="file" ref="filElem" id="file">

</i>

```

  


```

// 导入书签

const importBookmark = () => {

  const file = document.getElementById('file')

  file.dispatchEvent(new MouseEvent('click'))

  const mybookmark = document.getElementById('mybookmark')

  document.getElementById('file').addEventListener('change', function () {

     var file = document.getElementById('file').files[0]

     var reader = new FileReader()

     reader.readAsText(file, 'utf-8')

     reader.onload = function () {

       mybookmark.innerHTML = reader.result

       const formDatas = JSON.stringify(walkBookmarksTree(mybookmark))

          //此处已经获取了我们上传的bookmark.html文件的内容了，并且已经格式化

      })

  } else {

    ElMessage.warning('请先登录')

  }

}

```

  


## 😄3、接入leanCloud 实现serveless数据存储

  


其实这部分我已经进行了简单的函数封装，用起来是很方便的，还有很多用法可以参考[leancloud文档](https://leancloud.cn/docs/leanstorage_guide-dotnet.html),具体用法是非常详细的。

  


其实使用下面几个封装的函数，基本就可以实现一个系统的增删改查了，还是非常快速方便的。数据以JSON数据格式进行存储。

  


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b0dc9ebbb4a461f9c7a0617819517a5~tplv-k3u1fbpfcp-zoom-1.image)

  


### 😄4.1 对象存储公共函数（传入表名和存储的数据）

  


```

import AV from 'leancloud-storage'

// 对象存储公共函数

export const saveObject = (className, params) => {

  return new Promise((resolve, reject) => {

    const Todo = AV.Object.extend(className)

    const user = AV.User.current()

    var todo = new Todo()

    todo.set('formDatas', params.formDatas)

    todo.set('user', user)

    todo.save().then((res) => {

      resolve(res)

    }, (error) => {

      reject(error)

    })

  })

}

```

  


### 😄4.2 获取对象存储的列表数据（传入表名和条件）

  


```

// 获取对象列表

export const getObject = (className, params) => {

  return new Promise((resolve, reject) => {

    const query = new AV.Query(className)

    // 查询多个条件

    const user = AV.User.current()

    for (const v in params) {

      if (params[v]) {

        query.equalTo(v, params[v])

      }

    }

    query.equalTo('user', user)

    query.find().then((res) => {

      resolve(res)

    }, (error) => {

      reject(error)

    })

  })

}

```

  


### 😄4.3 删除对象数据（传入表名和数据ID）

  


```

// 删除对象

export const deleteObject = (className, id) => {

  return new Promise((resolve, reject) => {

    const todo = AV.Object.createWithoutData(className, id)

    todo.destroy().then((res) => {

      resolve(res)

    }, (error) => {

      reject(error)

    })

  })

}

```

  


### 😄4.4 更新对象数据（传入表名和存的数据+ID）

  


```

// 更新对象

export const updateObject = (className, params) => {

  return new Promise((resolve, reject) => {

    const todo = AV.Object.createWithoutData(className, params.id)

    for (var i in params) {

      todo.set(i, params[i])

    }

    todo.save().then((res) => {

      resolve(res)

    }, (error) => {

      reject(error)

    })

  })

}

```

  


## 😀 issue

需要什么新的需求或者设计，可以给我提[issue](https://gitee.com/zhanhongzhu/kestrel-bookmark/issues),感谢，喜欢的也可以点个赞。

## 💯 致谢

感谢 【空白i】 的打赏 【66.6】继续加油，希望可以做出更多更精致开源的作品处理。继续加油。😀 😀 😀

  
## 捐赠
请作者喝杯咖啡😀😀😀😀😀😀😀😀😀😀😀😀😀

<img src="https://zhanhongzhu.top/111.jpg" style="height:280px;width:180px;border-radius:12px;object-fit:contain;"/>

<img src="https://zhanhongzhu.top/222.jpg" style="height:280px;width:180px;border-radius:12px;object-fit:contain;"/>


## 😀 其他链接

-   [我的博客(收集各类大神的学习笔记及官方文档，强烈推荐)](https:/zhanhongzhu.top)

-   [红隼书签](http://bookmark.zhanhongzhu.top)

-   [掘金](https://juejin.im/user/5cc6757ce51d456e5238ca23)

-   [思否](https://segmentfault.com/u/huixiaodeyanjingzhenmei)

-   [CSDN](https://blog.csdn.net/weixin_43779957)

-   [简书](https://www.jianshu.com/u/b8d251f62b08)

-   [语雀(超过1800多篇开发文档)](https://www.yuque.com/zhanhongzhu)