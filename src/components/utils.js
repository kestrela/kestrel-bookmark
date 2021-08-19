// 格式化浏览器书签
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
  const myBookmark = result.filter(v => v.folder)
  return flagBrowerList(myBookmark)
}

// 降维书签数据
const flagBrowerList = v => {
  const res = []
  const flatten = (v) => {
    for (let i = 0; i < v.length; i++) {
      if (v[i].folder) {
        flatten(v[i].children)
        const result = v[i]
        result.children = result.children.filter(v => !v.folder)
        res.push(result)
      }
    }
  }
  flatten(v)
  return res
}

// 导出数据为JSON下载
export function exportBookmark() {
  if (localStorage.getItem('BOOKMARK')) {
    var content = localStorage.getItem('BOOKMARK')
    var eleLink = document.createElement('a')
    eleLink.download = 'kestrel-bookmark.json'
    eleLink.style.display = 'none'
    // 字符内容转变成blob地址
    var blob = new Blob([content])
    eleLink.href = URL.createObjectURL(blob)
    // 触发点击
    document.body.appendChild(eleLink)
    eleLink.click()
    // 然后移除
    document.body.removeChild(eleLink)
  } else {
    this.$message.warning('暂无可导出数据')
  }
}
