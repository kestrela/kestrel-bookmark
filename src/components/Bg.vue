<template>
  <div class="bg"></div>
</template>

<script setup>
import { onMounted, defineExpose } from 'vue'
// 默认配置
const defaultConfig = {
  direction: 'left-right',
  isPausedWhenNotInView: true,
  opacity: [1, 1],
  states: {
    'default-state': {
      gradients: [
        [
          { color: '#833ab4', pos: 0.2 },
          { color: '#fd1d1d', pos: 0.8 },
          { color: '#38ef7d', pos: 1 }
        ],
        [
          { color: '#40e0d0', pos: 0 },
          { color: '#ff8c00', pos: 0.2 },
          { color: '#ff0080', pos: 0.75 }
        ]
      ]
    }
  },
  image: {
    source: 'https://zhanhongzhu.top/bg.jpg',
    position: ['center', 'bottom'],
    stretchMode: ['stretch', 'stretch-if-bigger'],
    blendingMode: 'multiply'
  }
}

let granimInstance = null
const init = () => {
  let granimConfig = localStorage.getItem('granimConfig')
  granimConfig = granimConfig ? JSON.parse(granimConfig) : defaultConfig
  delete granimConfig.opacity
  // 切换背景光影效果
  // eslint-disable-next-line no-undef, no-new
  granimInstance = new Granim({
    element: '#canvas-complex',
    ...granimConfig,
    opacity: 1
  })
}

defineExpose({ init })

onMounted(() => {
  if (granimInstance) {
    granimInstance.destroy()
  }
  init()
})
</script>

<style scoped lang="scss">
.bg {
  position: fixed;
  z-index: -999;
  position: fixed;
  height: 100%;
  width: 100%;
  background: url(../assets/bg.jpg);
}
</style>
