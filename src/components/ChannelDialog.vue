<script setup>
import { ref, reactive, defineEmits } from 'vue'
import { artAddChannelsService, artEditChannelsService } from '@/api/article'
const emit = defineEmits(['submitSuccess'])
//弹框
const formRef = ref()
const dialogFormVisible = ref(false)
const form = ref({
  cate_name: '',
  cate_alias: ''
})
const formRule = reactive({
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须是1-10位字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1,15位字母或数字',
      trigger: 'blur'
    }
  ]
})
const onsubmit = async () => {
  await formRef.value.validate()
  const isEdit = form.value.id
  isEdit
    ? await artEditChannelsService(form.value)
    : await artAddChannelsService(form.value)
  ElMessage.success(isEdit ? '编辑成功' : '添加成功')
  // if (isEdit) {
  //   await artEditChannelsService(form.value)
  //   ElMessage.success('编辑成功')
  // } else {
  //   await artAddChannelsService(form.value)
  //   ElMessage.success('添加成功')
  // }
  dialogFormVisible.value = false
  emit('submitSuccess')
}
//向外暴露方法
const open = (row) => {
  dialogFormVisible.value = true
  form.value = { ...row }
}
//暴露方法
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="form.id ? '编辑分类' : '添加分类'"
    width="40%"
  >
    <el-form
      :model="form"
      :rules="formRule"
      ref="formRef"
      @keyup.enter="onsubmit"
    >
      <el-form-item
        label="分类名称"
        :label-width="formLabelWidth"
        prop="cate_name"
      >
        <el-input
          v-model="form.cate_name"
          autocomplete="off"
          autofocus
          placeholder="请输入分类名称"
        />
      </el-form-item>
      <el-form-item
        label="分类别名"
        :label-width="formLabelWidth"
        prop="cate_alias"
      >
        <el-input
          v-model="form.cate_alias"
          autocomplete="off"
          placeholder="请输入分类别名"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onsubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
