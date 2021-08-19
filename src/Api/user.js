import AV from 'leancloud-storage'
// 用户登录
const login = (username, password) => {
  return new Promise((resolve, reject) => {
    AV.User.logIn(username, password).then(user => {
      resolve(user)
    }).catch(error => {
      reject(error)
    })
  })
}

// 用户登录
const loginEmail = (email, password) => {
  return new Promise((resolve, reject) => {
    AV.User.loginWithEmail(password, email).then(user => {
      resolve(user)
    }).catch(error => {
      reject(error)
    })
  })
}
// 用户登出
const logout = (username, password) => {
  return new Promise((resolve, reject) => {
    AV.User.logOut(username, password).then(user => {
      resolve(user)
    })
  })
}

// 用户注册
const register = (username, password) => {
  return new Promise((resolve, reject) => {
    const user = new AV.User()
    user.setUsername(username)
    user.setPassword(password)
    user.signUp().then((user) => {
      resolve(user)
    }, (error) => {
      reject(error)
    })
  })
}
const getInfo = (params) => {
  return new Promise((resolve, reject) => {
    const user = new AV.User()
    user.loginWithAuthData({
      openid: params.openid,
      access_token: params.access_token,
      expires_in: params.expires_in
    }, 'weixin').then(function (user) {
      resolve(user)
    }).catch(function (error) {
      reject(error)
    })
  })
}

export default {
  login,
  logout,
  register,
  loginEmail,
  getInfo
}
