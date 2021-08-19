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
