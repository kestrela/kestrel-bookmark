<!-- /* eslint-disable */ -->
<template>
  <el-dialog custom-class="my-dialog" title="配置项" :visible="isConfigVisible" width="700px">
    <el-form status-icon ref="refruleForm" :rules="rules" :model="ruleForm" label-width="60px" size="small">
      <el-row>
        <el-col :span="24">
          <el-form-item label="背景">
            <input id="file" @change="handleFileChange" accept="image/*" type="file" :multiple="false">
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主题" class="slelec">
            <el-select v-model="theme" placeholder="光影" @change="setGranim">
              <el-option  label="清新" value="light" />
              <el-option  label="暗黑" value="dark" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="光影" class="slelec">
            <el-select v-model="selectVal" placeholder="光影" @change="setGranim">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="亮度" class="slelec">
            <el-input v-model="opacity0" placeholder="亮度" onkeyup="value=value.replace(/[^\d.]/g,0)" @change="setGranim"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="位置">
            <el-select v-model="direction" placeholder="位置" @change="setGranim">
              <el-option v-for="item in directions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="效果">
            <div class="granim-box">
              <canvas id="granim-box"></canvas>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="透明度" class="opacity">
            <el-input v-model="opacity1" placeholder="透明度参数1" onkeyup="value=value.replace(/[^\d]/g,0)" />
            <el-input v-model="opacity2" placeholder="透明度参数2" onkeyup="value=value.replace(/[^\d]/g,0)" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeViews" size="small">关 闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import Cookie from 'js-cookie'
import {
  watch,
  reactive,
  ref,
  toRefs,
  onMounted,
  useAttrs,
  nextTick
} from 'vue'
import { ElMessage } from 'element-plus'
import Api from '../Api/user.js' // register
import { config } from './config.js'
export default {
  model: {
    value: 'isConfigVisible',
    events: 'closeViews'
  },
  props: {
    isConfigVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const state = reactive({
      ruleForm: {
        username: '',
        password: ''
      },
      options: [
        { label: '渐变-01', value: 'gradient1' },
        { label: '渐变-02', value: 'gradient2' },
        { label: '渐变-03', value: 'gradient3' },
        { label: '迷雾森林', value: 'gradient4' }
      ],
      directions: [
        { label: '从上到下', value: 'top-bottom' },
        { label: '从左到右', value: 'left-right' },
        { label: '环形', value: 'diagonal' },
        { label: '对角线', value: 'radial' },
        { label: '自定义', value: 'custom' }
      ],
      selectVal: 'gradient4',
      direction: 'left-right',
      opacity1: 0.15,
      opacity2: 0.15,
      imageUrl: '',
      granimRef: null,
      theme: 'light',
      opacity0: 0.8
    })
    // 定义校验规则 表单代码中必须以 :rules 接收
    const rules = {
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      email: [
        {
          type: 'email',
          required: true,
          message: '请输入正确的邮箱',
          trigger: 'blur'
        }
      ]
    }
    const refruleForm = ref(null)
    // 确定按钮的格式
    const submitForm = () => {
      refruleForm.value.validate((valid) => {
        if (valid) {
          const formData = { ...state.ruleForm }
          Api.login(formData.email, formData.password)
            .then((res) => {
              Cookie.set('userInfo', JSON.stringify(res))
              context.emit('setUser')
              ElMessage.success('登录成功')
              closeViews()
            })
            .catch((err) => {
              if (err.code === 210) {
                ElMessage.error('账号或密码不正确')
              } else if (err.code === 211) {
                Api.register(formData.email, formData.password).then((res) => {
                  Cookie.set('userInfo', JSON.stringify(res))
                  context.emit('setUser')
                  ElMessage.success('注册成功')
                  closeViews()
                })
              }
            })
        }
      })
    }
    // 关闭弹窗
    function closeViews() {
      refruleForm.value.resetFields()
      context.emit('closeViews', false)
    }

    const setGranim = () => {
      state.opacity1 = state.opacity1 || 1
      state.opacity2 = state.opacity2 || 1
      const obj = config[`${state.selectVal}`]
      // 配置项
      const granimConfig = {
        ...obj,
        opacity1: state.opacity1,
        opacity2: state.opacity2,
        opacity0: state.opacity0,
        selectVal: state.selectVal,
        theme: state.theme,
        opacity: [state.opacity1, state.opacity2],
        direction: state.direction,
        image: {
          source: state.imageUrl,
          position: ['center', 'bottom'],
          stretchMode: ['stretch', 'stretch-if-bigger'],
          blendingMode: 'multiply'
        }
      }
      // 存储配置到缓存
      localStorage.setItem('granimConfig', JSON.stringify(granimConfig))

      // eslint-disable-next-line no-undef, no-new
      state.granimRef = new Granim({
        element: '#granim-box',
        ...granimConfig
      })
      context.emit('fresh')
    }
    // 文件转成 base64
    function changeFileIntoBase64(file) {
      return new Promise((resolve) => {
        const fr = new FileReader()
        /* eslint-disable */
        fr.readAsDataURL(file)
        fr.onload = (result) => {
          const base64Str = result.currentTarget.result
          resolve(base64Str)
        }
      })
    }

    const handleFileChange = (e) => {
      const file = e.target.files[0]
      changeFileIntoBase64(file)
        .then((res) => {
          state.imageUrl = res
        })
        .finally(() => {
          setGranim()
        })
    }

    const attrs = useAttrs()
    onMounted(() => {
      let granimConfig = localStorage.getItem('granimConfig')
      if (granimConfig) {
        let obj = JSON.parse(granimConfig)
        state.selectVal = obj.selectVal
        state.direction = obj.direction
        state.opacity1 =
          obj.opacity && obj.opacity.length > 0 ? obj.opacity[0] : 0.15 // 选择显示的透明度 或 选择动画
        state.opacity2 =
          obj.opacity && obj.opacity.length > 0 ? obj.opacity[1] : 0.15
        state.imageUrl = obj.image && obj.image.source ? obj.image.source : ''
        state.theme = obj.theme
        state.opacity0 = obj.opacity0
      }
      state.granimRef = null
    })

    watch(
      () => attrs.modelValue,
      (v) => {
        if (v) {
          nextTick(() => {
            if (state.granimRef) {
              state.granimRef.destroy()
            }
            setGranim()
          })
        }
      },
      {
        deep: true,
      }
    )
    return {
      ...toRefs(state),
      closeViews,
      submitForm,
      refruleForm,
      rules,
      setGranim,
      handleFileChange,
    }
  },
}
</script>

  <style scoped lang="scss">
.my-dialog {
  background: red;
}
.my-dialog /deep/.el-dialog__header {
  border-bottom: 1px solid #eee !important;
}
.my-dialog /deep/.el-dialog__title {
  font-size: 16px;
  color: #e03b5d;
}

.granim-box {
  height: 240px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  canvas {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

.slelec {
  height: 40px;
  line-height: 40px;
  // :deep(.el-form-item__label) {
  // }
}

.opacity {
  :deep(.el-form-item__content) {
    display: flex;
    align-items: center;
    .el-input {
      &:first-child {
        margin-right: 8px;
      }
    }
  }
}

#file {
  height: 32px;
  line-height: 16px;
}

input[type='text'] {
  color: red;
}
</style>
