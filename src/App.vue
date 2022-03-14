<template>
  <div class="bg"></div>
  <div id="app">
    <div class="bookmark" id="bookmark">
      <div class="tool-bar">
        <div class="tool-logo">
          <a href="" target="_blank"><img src="./assets/svg/logo.svg" title="感谢作者 是半夏鸭 设计的图标" class="tool-icon" />红隼书签</a>
        </div>
        <div>
          <div class="search-box">
            <img src="./assets/svg/search.svg">
            <input type="text" placeholder="请输入书签名称" v-model="searchVal" />
          </div>
          <img src="./assets/svg/add.svg" class="tool-icon" @click="add({},'add')" />
          <a title="我的博客" href="https://zhanhongzhu.top" target="_blank"><img src="./assets/svg/blog.svg" class="tool-icon" /></a>
          <a title="在线翻译" href="https://translate.google.cn" target="_blank"><img src="./assets/svg/translate.svg" class="tool-icon" /></a>
          <span class="login-s" @click="loginClick"><img src="./assets/svg/user.svg" class="tool-icon" title="已登录" /><span class="login-status" :title="userInfo.username">{{userInfo.username.slice(0, 5)}}</span></span>
        </div>
        <!-- userInfo.objectId?LoginOut:handleUserLogin -->
      </div>
      <!-- 侧边导航栏 -->
      <div class="box-m">
        <div class="left-box">
          <div class="left-box-item">
            <div class="label" :class="activeIndex===index?'active':'inactive'" v-for="(item,index) in data" :key="index" @click="selectType(item,index)">
              <img src="./assets/svg/file.svg" />
              <div class="text-elipss"> {{item.type}} </div>
            </div>
          </div>
          <!-- 导入导出 -->
          <div class="import-tool">
            <span class="import-text">导入/导出：&nbsp;</span>
            <i class="el-icon-upload2" title="导入浏览器书签" @click="importBookmark">
              <input type="file" ref="filElem" id="file">
            </i>
            <i class="el-icon-download" title="导出浏览器书签" @click="exportBookmark"></i>
          </div>
        </div>
        <div class="right-box">
          <transition-group v-if="bookMark.length" name="staggered-fade" class="card-s" tag="ul" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <div class="card-item list-complete-item" v-for="(card,idx) in bookMark" :key="idx" @click="navigate(card)">
              <div class="logo-img"><img :src="card.logo?card.logo:'/img/logo.f38dc2e8.svg'" /></div>
              <div class="logo-box">
                <span class="logo-box-tools">
                  <i class="el-icon-edit" @click.stop="add(card,'modify')"></i>
                  <i class="el-icon-delete" @click.stop="deleteClick(card)"></i>
                </span>
                <span class="title">{{card.title || 'Kestrel-bookmark'}}</span>
                <span class="subtitle">{{card.desc || "红隼书签-为中国 Web 前端开发人员提供优质网站导航"}}</span>
              </div>
            </div>
          </transition-group>
          <!-- 无数据显示 -->
          <div v-if="!bookMark.length" class="card-item-nodata">
            <div>
              <svg width="66" height="68" viewBox="0 0 66 68" class="icon empty-icon" data-v-8739e5ce="">
                <g fill="none" fill-rule="evenodd" transform="translate(4 3)" data-v-8739e5ce="">
                  <g fill="#F7F7F7" data-v-8739e5ce="">
                    <path d="M9 10h23.751v3.221H9zM9 16.494h41.083v4.026H9zM9 26.104h23.751v3.221H9zM9 42.208h23.751v3.221H9zM9 33.351h41.083v4.026H9zM9 49.455h41.083v4.026H9z" data-v-8739e5ce="">
                    </path>
                  </g>
                  <rect width="56" height="60" x="1.139" y="1.338" stroke="#EBEBEB" stroke-width="2" rx="6" data-v-8739e5ce=""></rect>
                </g>
              </svg><span class="empty-text" data-v-8739e5ce="">暂无数据</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 新增/修改弹窗 -->
  <Dialog class="my-dialog" v-model="isDetailVisible" @closeViews="closeViews" :detail="detail" :selectType="activeIndex" @fresh="search" />
  <!-- 登录弹窗 -->
  <Login v-model="isLoginVisible" @closeViews="closeLoginViews" @setUser="setUsername" />
</template>
<script>
import { reactive, toRefs } from '@vue/reactivity'
import { myData } from './assets/Json/印象笔记.js'
import { watch } from '@vue/runtime-core'
import Dialog from './components/Dialog.vue'
import Login from './components/Login.vue'
import gsap from 'gsap'
import { ElMessage, ElMessageBox } from 'element-plus'
import { saveObject, getObject } from './Api/common.js'
import { exportBookmark, walkBookmarksTree } from './components/utils.js'
import Cookie from 'js-cookie'
import Api from './Api/user.js'
var rowData = []
export default {
  components: { Dialog, Login },
  name: 'kestrel-bookmark',
  setup() {
    // 扁平化数组
    const flatten = (arr, result = []) => {
      for (const item of arr) {
        Array.isArray(item.children)
          ? flatten(item.children, result)
          : result.push(item)
      }
      return result
    }

    const data = reactive({
      activeIndex: 0,
      data: [],
      bookMark: [],
      searchVal: '',
      allData: [],
      isDetailVisible: false,
      isLoginVisible: false,
      detail: {},
      userInfo: {
        username: '未登录'
      }
    })
    /*
     **数据来源
      1.未登录 缓存无数据 取默认
      2.未登录 缓存有数据 取缓存
      3.已登录 系统无数据 取默认
      4.已登录 系统有数据 取系统数据
    */
    const getBookmarkList = (fn = () => {}) => {
      if (Cookie.get('userInfo')) {
        data.userInfo = JSON.parse(Cookie.get('userInfo'))
      }
      if (!data.userInfo.objectId) {
        if (localStorage.getItem('BOOKMARK')) {
          rowData = JSON.parse(localStorage.getItem('BOOKMARK'))
        } else {
          localStorage.setItem('BOOKMARK', JSON.stringify(myData))
          rowData = JSON.parse(JSON.stringify(myData))
        }
        data.data = rowData
        data.bookMark = rowData[0].children
        data.allData = flatten(rowData)
        fn()
      } else {
        // 已登录 系统无数据
        getObject('BOOKMARK')
          .then((res) => {
            if (res.length > 0) {
              rowData = JSON.parse(res[0].attributes.formDatas)
            } else {
              localStorage.setItem('BOOKMARK', JSON.stringify(myData))
              rowData = JSON.parse(JSON.stringify(myData))
            }
          })
          .catch(() => {
            localStorage.setItem('BOOKMARK', JSON.stringify(myData))
            rowData = JSON.parse(JSON.stringify(myData))
          })
          .finally(() => {
            fn()
            data.data = rowData
            data.bookMark = rowData[0].children
            data.allData = flatten(rowData)
          })
      }
    }

    // 设置用户
    const setUsername = () => {
      if (Cookie.get('userInfo')) {
        data.userInfo = JSON.parse(Cookie.get('userInfo'))
      } else {
        data.userInfo = { username: '未登录' }
      }
      getBookmarkList()
    }
    setUsername()
    // 全部数据筛选功能
    watch(
      () => data.searchVal,
      () => {
        data.bookMark = data.allData.filter(
          (v) =>
            v.title.toLowerCase().indexOf(data.searchVal.toLowerCase()) > -1
        )
      }
    )
    // 书签类别选择
    const selectType = (item, index) => {
      data.bookMark = item.children
      data.activeIndex = index
    }
    // 书签跳转
    const navigate = (v) => window.open(v.url, '_target')

    // 新增书签
    function add(row = {}, flag = 'add') {
      const temp = { ...row }
      if (flag === 'modify') {
        data.detail = Object.assign(temp, {
          type: rowData[data.activeIndex].type,
          flag: 'modify'
        })
      } else {
        data.detail = Object.assign(
          {},
          { type: rowData[data.activeIndex].type, flag: 'add' }
        )
      }
      data.isDetailVisible = true
    }

    // 用户登录
    const handleUserLogin = () => {
      data.isLoginVisible = true
    }

    // 关闭弹窗事件
    const closeViews = (v) => (data.isDetailVisible = v)
    const closeLoginViews = (v) => (data.isLoginVisible = v)

    // 获取书签分类数据
    const search = async () => {
      await getBookmarkList(() => {
        data.data = rowData
        data.bookMark = rowData[data.activeIndex].children
      })
    }
    // 删除书签
    const deleteClick = (row) => {
      const myData = JSON.parse(localStorage.getItem('BOOKMARK'))
      const delDetail = Object.assign(row, {
        type: rowData[data.activeIndex].type
      })
      for (let i = 0; i < myData.length; i++) {
        if (delDetail.type === myData[i].type) {
          const cindex = myData[i].children.findIndex(
            (s) => s.title === delDetail.title
          )
          if (cindex > -1) {
            myData[i].children.splice(cindex, 1)
            localStorage.setItem('BOOKMARK', JSON.stringify(myData))
            ElMessage.success('删除成功')
            search()
          }
        }
      }
    }
    // 退出登录
    const LoginOut = () => {
      ElMessageBox.confirm('确认要退出登录?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = { username: '', password: '' }
        Api.logout(params.username, params.password).then((res) => {
          Cookie.remove('userInfo')
          setUsername()
        })
        ElMessage({
          type: 'success',
          message: '已退出登录'
        })
      })
    }
    // 登录或退出
    const loginClick = () => {
      data.userInfo.objectId ? LoginOut() : handleUserLogin()
    }

    // 导入书签
    const importBookmark = () => {
      if (data.userInfo.objectId) {
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
            if (formDatas) {
              const params = { formDatas: formDatas }
              saveBookmarkList(params)
            }
          }
        })
      } else {
        ElMessage.warning('请先登录')
      }
    }

    // 书签数据存储
    const saveBookmarkList = (params) => {
      saveObject('BOOKMARK', params).then((res) => {
        ElMessage.success('导入成功')
        getBookmarkList()
      })
    }

    return {
      deleteClick,
      ...toRefs(data),
      selectType,
      navigate,
      add,
      closeViews,
      closeLoginViews,
      search,
      importBookmark,
      exportBookmark,
      loginClick,
      setUsername
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: '1.6em',
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bookmark {
  position: relative;
  margin-top: 10vh;
  width: 1200px;
  height: calc(80vh);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  border-radius: 6px;
  background: #fff;
  .left-box {
    width: 200px;
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
    position: relative;
    // overflow-y: auto;
    padding: 8px 0;
    img {
      width: 20px;
      height: auto;
      margin-right: 5px;
      cursor: pointer;
    }
    .active {
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
      background: #a0cae6;
    }
    .inactive {
      box-shadow: none;
      background: #fff;
    }
    .label {
      font-size: 14px;
      display: flex;
      cursor: pointer;
      border: none;
      position: relative;
      padding: 10px 15px;
      &:hover {
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
        background: #a0cae6;
      }
      .text-elipss {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .right-box {
    width: calc(100% - 200px);
    .card-s {
      width: 100%;
      padding-top: 10px;
      max-height: calc(80vh - 49px);
      // height:calc(100% - 48px);
      display: flex;
      flex-wrap: wrap;
      overflow-x: hidden;
      overflow-y: auto;
      .card-item {
        cursor: pointer;
        width: calc(33% - 40px);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid rgba(255, 255, 255, 0.18);
        box-shadow: 0 8px 18px 0 rgba(31, 38, 135, 0.2);
        padding: 10px;
        margin: 7px 20px 7px 20px;
        position: relative;
        border-radius: 8px;
        max-height: 200px;
        height: 72px !important;
        &:hover {
          transform: scale(1.04);
          animation-delay: 0.3ms;
          animation: 0.3ms;
          box-shadow: 0 8px 18px 0 rgba(31, 38, 135, 0.3);
        }
        &:hover .logo-box-tools {
          opacity: 0.85;
        }
      }
    }
  }
}
.tool-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  display: inline-block;
  margin-right: 12px;
  cursor: pointer;
  &:hover {
    fill: '#3eaf7c';
  }
}
.tool-bar {
  height: 48px;
  border-bottom: 1px solid #eee;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(250, 248, 248);
  .tool-logo {
    margin: 0 15px;
    a {
      color: #e03b5d;
      display: flex;
      align-items: center;
    }
  }
  .search-box {
    display: inline-block;
    position: relative;
    margin-right: 1rem;
    white-space: nowrap;
    img {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: 0;
      left: 0.6rem;
      margin: auto;
      width: 20px;
      height: auto;
    }
    input {
      text-align: initial;
      text-indent: initial;
      text-shadow: initial;
      text-transform: initial;
      word-spacing: initial;
      letter-spacing: initial;
      cursor: text;
      width: 14rem;
      height: 2rem;
      color: #4e6e8e;
      display: inline-block;
      border: 1px solid #eaecef;
      border-radius: 0.25rem;
      font-size: 0.9rem;
      line-height: 2rem;
      padding: 0 0.5rem 0 2rem;
      outline: none;
      transition: all 0.2s ease;
      background: transparent;
      background-size: auto;
      background-size: 1rem;
    }
  }
}
.box-m {
  display: flex;
  height: calc(100% - 50px);
}
.logo-img {
  width: 62px;
  height: 100%;
  margin-right: 10px;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    display: block;
    max-width: 70px;
    width: 62px;
  }
}
.logo-box {
  position: relative;
  flex: 1;
  .title {
    width: 100%;
    max-width: 145px;
    display: block;
    padding-top: 3px;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .subtitle {
    width: 100%;
    position: relative;
    max-width: 185px;
    margin-top: 5px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.7);
    display: block;
  }
}
.list-complete-item {
  transition: all 0.8s ease;
  display: inline-block;
  margin-right: 10px;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
.card-item-nodata {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    margin-top: 20px;
    color: #999;
  }
}
.bg {
  position: fixed;
  z-index: -999;
  position: fixed;
  height: 100%;
  width: 100%;
  background: url(./assets/bg.jpg);
}

.logo-box-tools {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: 0.4s opacity;
  i {
    padding: 4px;
    display: inline-block;
    &:hover {
      color: #e03b5d;
      background: #ff00001f;
      border-radius: 5px;
    }
  }
}

.import-tool {
  position: absolute;
  width: 100%;
  background: #fbf5f5;
  height: 36px;
  padding: 3px 15px;
  display: flex;
  align-items: center;
  bottom: 0;
  z-index: 99;
  i {
    font-size: 18px;
    margin: 1px 4px;
    padding: 4px;
    cursor: pointer;
    color: #e03b5d;
    background: #ff00001f;
    border-radius: 5px;
    opacity: 0.7;
    &:hover {
      color: #e03b5d;
      background: #c804041f;
      opacity: 1;
    }
  }
}
.left-box-item {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 40px;
}
.import-text {
  font-size: 12px;
  color: #999;
  margin-right: 3px;
}
.el-icon-upload2 {
  position: relative;
  input {
    width: 1.46rem;
    height: 100%;
    z-index: 1;
    opacity: 0;
    position: absolute;
    cursor: pointer;
  }
}
.login-status {
  display: inline-block;
  font-size: 12px;
  padding-right: 8px;
  color: #999;
  cursor: pointer;
}

.login-s .tool-icon {
  margin-right: 5px;
}
.login-s:hover .login-status {
  color: #e03b5d;
}
</style>
