<script setup>
import { Lock, User, Hide, View } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
//user仓库数据
const userStore = useUserStore()
const router = useRouter()
//密码框的显示与否,默认不显示
const passwordView = ref(false)
const repasswordView = ref(false)

//提交给后台的表单数据
const formData = ref({
  username: '',
  password: '',
  repassword: ''
})

//展示登录
const loginVisibale = ref(true)

//改变登录注册
const changeBox = () => {
  loginVisibale.value = !loginVisibale.value
  formData.value.username = ''
  formData.value.password = ''
  formData.value.repassword = ''
}
//表单校验规则
const formDataRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 8, message: '请输入长度为3-8位的用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{3,10}$/,
      message: '请输入长度为3-10位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{3,10}$/,
      message: '请输入长度为3-10位的非空字符',
      trigger: 'blur'
    },
    {
      //自定义校验规则
      //rule  当前检验规则相关信息 value 值 callback 回调函数 callback()校验通过 callback(new Error('校验失败'))校验失败
      validator: (rule, value, callback) => {
        if (value !== formData.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})
//表单验证对象
const formRef = ref()
//获取路由对象
//const router = useRouter()
//發送登錄請求
const loginPost = async () => {
  await formRef.value.validate()
  const {
    data: { token, code, message }
  } = await userLoginService(formData.value)
  if (code !== 0) return ElMessage.success(message)
  userStore.setToken(token)
  ElMessage.success(message)
  router.push('/')
}
//发送注册请求
const registerPost = async () => {
  await formRef.value.validate()
  const { data: res } = await userRegisterService(formData.value)
  if (res.code !== 0) return ElMessage.success(res.message)
  ElMessage.success(res.message)
  loginVisibale.value = true
}
//回车提交表单
// const submitForm = (e) => {
//   if (e.keyCode === 13 && loginVisibale.value) {
//     loginPost()
//   } else if (e.keyCode === 13 && !loginVisibale.value) {
//     registerPost()
//   }
// }
</script>

<template>
  <div class="login_container">
    <div class="login_box">
      <el-form
        class="login_from"
        size="large"
        ref="formRef"
        :model="formData"
        :rules="formDataRules"
        @keyup.enter="loginVisibale ? loginPost() : registerPost()"
      >
        <el-form-item>
          <div class="box_title">
            <h1>简易后台管理系统</h1>
            <span @click="changeBox" class="box_span">{{
              loginVisibale ? '注册=>' : '<=登录'
            }}</span>
          </div>
        </el-form-item>
        <!--登录-->
        <template v-if="loginVisibale ? true : false">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="formData.username">
              <template #prefix>
                <el-icon class="el-input__icon"><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="formData.password"
              :prefix-icon="Lock"
              :type="passwordView ? 'text' : 'password'"
            >
              <template #append>
                <el-button
                  :icon="passwordView ? View : Hide"
                  @click="passwordView = !passwordView"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="loginPost"
              >登陆</el-button
            >
          </el-form-item>
        </template>

        <!--注册-->
        <template v-if="loginVisibale ? false : true">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="formData.username">
              <template #prefix>
                <el-icon class="el-input__icon"><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="formData.password"
              :prefix-icon="Lock"
              :type="passwordView ? 'text' : 'password'"
            >
              <template #append>
                <el-button
                  :icon="passwordView ? View : Hide"
                  @click="passwordView = !passwordView"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              placeholder="请确认密码"
              v-model="formData.repassword"
              :prefix-icon="Lock"
              :type="repasswordView ? 'text' : 'password'"
            >
              <template #append>
                <el-button
                  :icon="repasswordView ? View : Hide"
                  @click="repasswordView = !repasswordView"
                />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="registerPost"
              >注册</el-button
            >
          </el-form-item>
        </template>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  background: url('../../assets/recover3.webp');
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.box_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login_container .login_box {
  width: 420px;
  height: 280px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  box-sizing: border-box;
}
.login_from {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.box_span {
  color: #409eff;
  cursor: pointer;
  display: inline-block;
  margin-left: 30px;
  &:hover {
    color: #000;
  }
}
</style>
