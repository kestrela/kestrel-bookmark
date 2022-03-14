<template>
  <el-dialog custom-class="my-dialog" title="用户登录" :visible="isLoginVisible" width="400px">
    <el-form status-icon ref="refruleForm" :rules="rules" :model="ruleForm" label-width="60px" size="small">
      <el-row>
        <el-col :span="24">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeViews" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm" size="small">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import Cookie from 'js-cookie'
import { reactive, ref, toRefs } from '@vue/reactivity'
import { ElMessage } from 'element-plus'
import Api from '../Api/user.js' // register
export default {
  model: {
    value: 'isLoginVisible',
    events: 'closeViews'
  },
  props: {
    isLoginVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const form = reactive({
      ruleForm: {
        username: '',
        password: ''
      }
    })
    // 用户
    // 定义校验规则 表单代码中必须以 :rules 接收
    const rules = {
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      email: [{type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur' }]
    }
    const refruleForm = ref(null)
    // 确定按钮的格式
    const submitForm = () => {
      refruleForm.value.validate((valid) => {
        if (valid) {
          const formData = { ...form.ruleForm }
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
    return {
      ...toRefs(form),
      closeViews,
      submitForm,
      refruleForm,
      rules
    }
  },
  methods: {}
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
</style>
