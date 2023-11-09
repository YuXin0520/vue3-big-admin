<script setup>
import { ref, defineExpose, reactive, defineEmits } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import { downloadFile } from '@/utils/UrlToFile.js'
import { baseURL } from '@/api/request.js'
import {
  artPublishService,
  artGetInfoService,
  artEditInfoService
} from '@/api/article'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ElMessage } from 'element-plus'
//头像url
const imageUrl = ref()
//抽屉实例
const editorRef = ref()
//抽屉开关
const drawerVisible = ref(false)
//抽屉表单数据
const formDefault = {
  title: '', //标题
  cate_id: '', //分类
  cover_img: '', //封面
  state: '', //状态
  content: '' //内容
}
const emit = defineEmits(['successDrawer'])
const form = ref({ ...formDefault })
const formRules = reactive({
  title: [
    {
      required: true,
      message: '请输入标题',
      trigger: 'blur'
    }
  ],
  cate_id: [
    {
      required: true,
      message: '请选择分类',
      trigger: 'change'
    }
  ],
  cover_img: [
    {
      required: true,
      message: '请选择封面',
      trigger: 'manual' //手动触发
    }
  ],
  content: [
    {
      required: true,
      message: '请输入内容',
      trigger: 'manual'
    }
  ]
})
//单独验证头像表单
const avatarValidate = async (url) => {
  imageUrl.value = URL.createObjectURL(url)
  await formRef.value.validateField('cover_img')
}
const editorValidate = async (event) => {
  if (event.trim() === '<p><br></p>') {
    form.value.content = ''
  }
  await formRef.value.validateField('content')
}
//关闭前得回调
const beforeClose = () => {
  formRef.value.resetFields()
  editorRef.value.setHTML('')
  imageUrl.value = ''
  drawerVisible.value = false
}
//点击发布
const onPublish = async (state) => {
  await formRef.value.validate()
  form.value.state = state
  const fd = new FormData()
  for (const key in form.value) {
    fd.append(key, form.value[key])
  }
  if (form.value.id) {
    //编辑
    await artEditInfoService(fd)
    ElMessage.success('编辑成功')
    emit('successDrawer', 'Edit')
  } else {
    //添加
    await artPublishService(fd)
    ElMessage.success('添加成功')
    emit('successDrawer', 'Add')
  }
  beforeClose()
}
const formRef = ref()
const openDrawer = async (row) => {
  drawerVisible.value = true
  if (row.id) {
    //编辑
    const {
      data: { data }
    } = await artGetInfoService(row.id)
    imageUrl.value = baseURL + data.cover_img
    const file = downloadFile(data.cover_img, form.value.cover_img)
    console.log(file)
    form.value = data
  } else {
    //添加
    form.value = { ...formDefault }
  }
}
defineExpose({
  openDrawer
})
</script>
<template>
  <el-drawer
    :before-close="beforeClose"
    v-model="drawerVisible"
    title="添加文章"
    direction="rtl"
    size="50%"
  >
    <el-form :model="form" ref="formRef" :rules="formRules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="form.cate_id"
          style="width: 100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <avatar-upload
          :imageUrl="imageUrl"
          v-model="form.cover_img"
          @avatarValidate="avatarValidate"
        ></avatar-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="form.content"
            content-type="html"
            style="height: 230px"
            @update:content="editorValidate($event)"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')" plain>草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.editor {
  width: 100%;
}
</style>
