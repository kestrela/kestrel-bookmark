import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// 接入了Leancloud
import AV from 'leancloud-storage'
AV.init({
  appId: 'BwLrCgdVyLs52mJO1HcrXakI-gzGzoHsz',
  appKey: '25gNwzw4dV7IAh7i0IzDnYvV',
  serverURL: 'https://bwlrcgdv.lc-cn-n1-shared.com' // 临时域名
})

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
