<template>
  <el-dialog title="提示" :visible="isDetailVisible" width="30%" :before-close="handleClose">
    <span>这是一段信息</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeViews">取 消</el-button>
        <el-button type="primary" @click="closeViews">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import gsap from 'gsap'
export default {
  model: {
    value: 'isDetailVisible',
    events: 'closeViews'
  },
  props: {
    isDetailVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const closeViews = () => {
      context.emit('closeViews', false)
    }
    return {
      closeViews
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
.card-s {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tel-cont {
  width: 40%;
  min-width: 600px;
  min-height: 440px;
  position: relative;
  margin-top: 0px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  .el-dialog__header {
    padding: 20px 20px 10px;
    width: 100%;
    border-bottom: 1px solid #eee;
    .el-dialog__title {
      line-height: 24px;
      font-size: 18px;
      color: #303133;
    }
    .el-dialog__headerbtn {
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 0;
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 16px;
    }
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
</style>
