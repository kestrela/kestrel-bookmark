<template>
  <el-dialog custom-class="my-dialog" title="新增书签" :visible="isDetailVisible" width="758px">
    <el-form status-icon ref="refruleForm" :rules="rules" :model="ruleForm" label-width="100px" size="small">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="书签名称" prop="title">
            <el-input v-model="ruleForm.title" placeholder="请输入书签名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="书签类别" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择书签类别" style="width:100%">
              <el-option v-for="(item,index) in BOOKMARK" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="LOGO地址" prop="logo">
            <el-input v-model="ruleForm.logo" placeholder="请输入LOGO地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="访问地址" prop="url">
            <el-input v-model="ruleForm.url" placeholder="请输入访问绝对地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="书签描述" prop="desc">
            <el-input type="textarea" clearable placeholder="请输入书签描述" v-model="ruleForm.desc" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeViews">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import gsap from 'gsap'
import { reactive, ref } from '@vue/reactivity'
import { nextTick } from '@vue/runtime-core'
export default {
  model: {
    value: 'isDetailVisible',
    events: 'closeViews'
  },
  props: {
    isDetailVisible: {
      type: Boolean,
      default: false
    },
    selectType: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    const isBOOKMARK = JSON.parse(localStorage.getItem('BOOKMARK'))
    const BOOKMARK = isBOOKMARK ? isBOOKMARK.map((v) => v.type) : []
    const ruleForm = reactive({
      title: '',
      type: '',
      desc: '',
      url: '',
      logo: ''
    })
    // 定义校验规则 表单代码中必须以 :rules 接收
    const rules = {
      title: [{ required: true, message: '请输入书签名称', trigger: 'blur' }],
      type: [{ required: true, message: '请选择书签类别', trigger: 'change' }]
    }
    const refruleForm = ref(null)
    // 确定按钮的格式
    console.log('--->', isBOOKMARK)
    const submitForm = () => {
      refruleForm.value.validate((valid) => {
        if (valid) {
          console.log(isBOOKMARK)
          const myData = isBOOKMARK.map((v) => {
            if (v.type === ruleForm.type) {
              v.children.push({ ...ruleForm })
            }
            return v
          })
          console.log(myData)
          localStorage.setItem('BOOKMARK', JSON.stringify(myData))
          context.emit('fresh')
          closeViews()
        } else {
          return false
        }
      })
    }
    function closeViews() {
      refruleForm.value.resetFields()
      context.emit('closeViews', false)
    }
    // 书签类别
    nextTick(() => {
      ruleForm.type = isBOOKMARK ? BOOKMARK[props.selectType] : ''
    })

    return {
      ruleForm,
      closeViews,
      submitForm,
      refruleForm,
      rules,
      BOOKMARK
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
