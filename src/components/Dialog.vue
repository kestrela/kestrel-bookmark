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
import { reactive, ref, toRefs } from '@vue/reactivity'
import { nextTick, watch } from '@vue/runtime-core'
import { ElMessage } from 'element-plus'
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
    },
    detail: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, context) {
    const isBOOKMARK = JSON.parse(localStorage.getItem('BOOKMARK'))
    const BOOKMARK = isBOOKMARK ? isBOOKMARK.map((v) => v.type) : []
    const form = reactive({
      ruleForm: {
        title: '',
        type: '',
        desc: '',
        url: '',
        logo: ''
      }
    })
    // 定义校验规则 表单代码中必须以 :rules 接收
    const rules = {
      title: [{ required: true, message: '请输入书签名称', trigger: 'blur' }],
      type: [{ required: true, message: '请选择书签类别', trigger: 'change' }]
    }
    const refruleForm = ref(null)
    // 确定按钮的格式
    const submitForm = () => {
      refruleForm.value.validate((valid) => {
        if (valid) {
          const myData = isBOOKMARK.map((v) => {
            const myDetail = { ...props.detail }
            const formData = { ...form.ruleForm }
            if (props.detail.flag === 'modify') {
              // 分类没有变
              if (myDetail.type === formData.type && v.type === formData.type) {
                const sIndex = v.children.findIndex(
                  (d) => d.title === myDetail.title
                )
                if (sIndex > -1) {
                  v.children[sIndex] = formData
                  ElMessage.success('编辑成功')
                }
              } else if (myDetail.type !== formData.type) {
                // 更改了分类
                // 当前分类删除该数据
                if (myDetail.type === v.type) {
                  const pindex = v.children.findIndex(p => p.title === myDetail.title)
                  v.children.splice(pindex, 1)
                }
                // 新分类添加该分类
                if (formData.type === v.type) {
                  v.children.push(formData)
                  ElMessage.success('编辑成功')
                }
              }
            } else {
              // 新增书签
              console.log('---?')
              if (v.type === formData.type) {
                v.children.push(formData)
                ElMessage.success('新增成功')
              }
            }
            return v
          })
          localStorage.setItem('BOOKMARK', JSON.stringify(myData))
          context.emit('fresh')
          closeViews()
        }
      })
    }
    // 关闭弹窗
    function closeViews() {
      refruleForm.value.resetFields()
      context.emit('closeViews', false)
    }
    // 修改书签
    watch(
      () => props.detail,
      (v) => {
        if (v) {
          nextTick(() => {
            form.ruleForm = { ...props.detail }
          })
        }
      },
      { deep: true }
    )
    return {
      ...toRefs(form),
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
