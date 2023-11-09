<script setup>
import { ref, reactive } from 'vue'
import { userUpdatePasswordService } from '@/api/user'
import { useRouter } from 'vue-router'
import { Hide, View } from '@element-plus/icons-vue'
const router = useRouter()
const passwordVailbale = ref(true)
const formRef = ref()
const form = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const formRules = reactive({
  old_pwd: [
    { required: true, message: '请输入原密码', tigger: 'blur' },
    { min: 6, max: 20, message: '密码的长度6-20位', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', tigger: 'blur' },
    { min: 6, max: 20, message: '密码的长度6-20位', trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请输入确认密码', tigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.new_pwd) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})
const subMit = async () => {
  await userUpdatePasswordService(form.value)
  ElMessage.success('修改成功')
  router.push('/login')
  reset()
}
const reset = async () => {
  await formRef.value.resetFields()
}
</script>
<template>
  <page-container title="重置密码">
    <el-form
      style="width: 60%"
      :model="form"
      :rules="formRules"
      ref="formRef"
      label-position="right"
      label-width="100px"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input
          v-model="form.old_pwd"
          :type="passwordVailbale ? 'password' : 'text'"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input
          v-model="form.new_pwd"
          :type="passwordVailbale ? 'password' : 'text'"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="re_pwd">
        <el-input
          v-model="form.re_pwd"
          :type="passwordVailbale ? 'password' : 'text'"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="subMit">提交修改</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="passwordVailbale = !passwordVailbale"
          ><el-icon><View v-if="!passwordVailbale" /><Hide v-else /></el-icon
        ></el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
