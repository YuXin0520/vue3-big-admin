<script setup>
import { ref } from 'vue'
import { Plus, UploadFilled } from '@element-plus/icons-vue'
import { userUpdateAvatarService } from '@/api/user'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const changeAvatar = ref(false)
const imageUrl = ref('')
const uploadRef = ref()
imageUrl.value = userStore.user.user_pic
//选择图片
const changeFile = (file) => {
  changeAvatar.value = true
  let reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = function (e) {
    imageUrl.value = e.target.result
  }
}

//上传图片
const submitFile = async () => {
  if (!changeAvatar.value) return
  await userUpdateAvatarService(imageUrl.value)
  ElMessage.success('更换成功')
  userStore.getUser()
}
</script>

<template>
  <page-container title="更换头像">
    <el-upload
      class="avatar-uploader"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="changeFile"
      ref="uploadRef"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <div class="btn-box">
      <el-button
        type="primary"
        class="el-btn"
        @click="uploadRef.$el.querySelector('input').click()"
        ><el-icon><Plus /></el-icon>选择图片</el-button
      >
      <el-button
        type="success"
        class="el-btn"
        @click="submitFile"
        :disabled="!changeAvatar"
        ><el-icon><UploadFilled /></el-icon>上传头像</el-button
      >
    </div>
  </page-container>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 300px;
  height: 300px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 300px;
  text-align: center;
}
.el-btn {
  padding: 20px 30px;
  box-sizing: border-box;
  .el-icon {
    margin-right: 10px;
  }
}
.btn-box {
  width: 300px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
