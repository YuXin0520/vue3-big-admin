<script setup>
import { defineEmits, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const emit = defineEmits(['update:modelValue', 'avatarValidate'])
defineProps({
  imageUrl: {
    type: [String, Number]
  }
})
const changeImgUrl = (file) => {
  emit('update:modelValue', file.raw)
  emit('avatarValidate', file.raw)
}

const beforeAvatarUpload = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('必须是jpg结尾的图片!')
  //   return false
  // } else
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不得大于2MB!')
    return false
  }
  return true
}
</script>

<template>
  <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :auto-upload="false"
    :on-change="changeImgUrl"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 198px;
  height: 198px;
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
  width: 198px;
  height: 198px;
  text-align: center;
}
</style>
