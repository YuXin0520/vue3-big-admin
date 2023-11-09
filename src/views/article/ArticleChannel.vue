<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artDelChannelsService, artGetChannelsService } from '@/api/article'
import { myConfirm } from '@/utils/MyConfirm.js'
const loading = ref(false)
//获取表格数据
const channelList = ref([])
const getChannelList = async () => {
  loading.value = true
  const {
    data: { data }
  } = await artGetChannelsService()
  channelList.value = data
  loading.value = false
}
getChannelList()
//添加分类
const openAddDialog = () => {
  channelDialogRef.value.open({})
}
//编辑分类
const editRow = (row) => {
  channelDialogRef.value.open(row)
}
//删除分类
const deleteRow = async (row) => {
  const res = await myConfirm('是否删除分类', '删除')
  if (res) {
    await artDelChannelsService(row.id)
    getChannelList()
  }
}
//弹框实例
const channelDialogRef = ref()
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="openAddDialog">添加分类</el-button>
    </template>
    <el-table
      :data="channelList"
      stripe
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="100">
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="editRow(row, $index)"
          ></el-button>
          <el-button
            type="danger"
            circle
            plain
            :icon="Delete"
            @click="deleteRow(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
  </page-container>

  <!--弹框-->
  <channel-dialog
    ref="channelDialogRef"
    @submitSuccess="getChannelList"
  ></channel-dialog>
</template>
<style lang="scss" scoped></style>
