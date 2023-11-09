<script setup>
import {
  CaretBottom,
  User,
  SwitchButton,
  Crop,
  EditPen,
  Notebook,
  Memo,
  Position
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
//myConfirm 自定义封装得确认弹框函数
import { myConfirm } from '@/utils/MyConfirm.js'
//获取个人信息
const userStore = useUserStore()
userStore.getUser()
//获取路由
const router = useRouter()
const route = useRoute()
//changeCommand切换
const changeCommand = async (command) => {
  if (command === 'loginout') {
    const res = await myConfirm('是否退出登录', '退出登录')
    if (res) {
      userStore.loginOut()
      router.push('/login')
    }
  } else {
    router.push(`/user/${command}`)
  }
}
</script>
<template>
  <div class="common-layout">
    <el-container class="home_container">
      <!--侧边栏-->
      <el-aside width="200px" class="home_aside">
        <div class="aside_title">后台管理</div>
        <el-menu
          router
          :default-active="route.path"
          background-color="#2c3e50"
          active-text-color="#ffd04b"
          text-color="#fff"
        >
          <el-menu-item index="/article/channel"
            ><el-icon><Notebook /></el-icon>文章分类</el-menu-item
          >
          <el-menu-item index="/article/manage"
            ><el-icon><Position /></el-icon>文章管理</el-menu-item
          >
          <el-sub-menu index="/user">
            <template #title>
              <el-icon><User /></el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/user/profile"
              ><el-icon><Memo /></el-icon>基本资料</el-menu-item
            >
            <el-menu-item index="/user/avatar"
              ><el-icon><Crop /></el-icon>更换头像</el-menu-item
            >
            <el-menu-item index="/user/password"
              ><el-icon><EditPen /></el-icon>重置密码</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!--内容区-->
      <el-container>
        <el-header class="home_header">
          <div>
            你好！{{ userStore.user.nickname || userStore.user.username }}
          </div>
          <el-dropdown placement="bottom-end" @command="changeCommand">
            <span class="home_header_dropdown">
              <el-avatar :src="userStore.user.user_pic"></el-avatar>
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile" :icon="User"
                  >基本资料</el-dropdown-item
                >
                <el-dropdown-item command="avatar" :icon="Crop"
                  >更换头像</el-dropdown-item
                >
                <el-dropdown-item command="password" :icon="EditPen"
                  >重置密码</el-dropdown-item
                >
                <el-dropdown-item command="loginout" :icon="SwitchButton"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main>
          <keep-live>
            <router-view></router-view>
          </keep-live>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.home_container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.home_header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1px 4px #ccc;
}
.home_aside {
  box-shadow: 0.1px 0.1px 4px #ccc;
  background-color: #2c3e50;
}
.aside_title {
  height: 60px;
  text-align: center;
  color: #fff;
  line-height: 65px;
  font-size: 20px;
  background-color: #2c3e61;
}
.menu_item {
  background-color: #2c3e46;
  color: #999;
}
.activeIncex {
  color: #5670f3;
  background-color: #2c3e46;
}
.home_header_dropdown {
  width: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}
</style>
