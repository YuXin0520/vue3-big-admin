<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'
//导入个人信息模块
const userStore = useUserStore()
const form = ref({
  id: userStore.user.id,
  username: userStore.user.username,
  nickname: userStore.user.nickname,
  email: userStore.user.email,
  user_pic: userStore.user.user_pic
})
const formRules = reactive({
  nickname: [
    { required: true, message: '请输入昵称', tigger: 'blur' },
    { min: 1, max: 10, message: '昵称的长度1-10位', trigger: 'blur' }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '邮箱格式不正确',
      trigger: ['blur', 'change']
    }
  ]
})
const subMit = async () => {
  await userUpdateInfoService(form.value)
  ElMessage.success('修改成功')
  userStore.getUser()
}
</script>
<template>
  <page-container title="基本信息">
    <el-form
      style="width: 60%"
      :model="form"
      :rules="formRules"
      label-position="right"
      label-width="100px"
    >
      <el-form-item label="登录名称">
        <el-input disabled :value="form.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="subMit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
