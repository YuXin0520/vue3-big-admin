<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetListService, artDelInfoService } from '@/api/article'
import { formatTime } from '@/utils/Format.js'
import { myConfirm } from '@/utils/MyConfirm.js'
//抽屉实例
const drawerRef = ref()
//准备请求数据
const params = ref({
  pagenum: 1,
  pagesize: 10,
  cate_id: '',
  state: ''
})
//获取表格数据（管理文章）
const loading = ref(false)
const articleList = ref([]) //文章列表
const total = ref(0) //总数
const getArticleList = async () => {
  loading.value = true
  const { data: res } = await artGetListService(params.value)
  total.value = res.total
  articleList.value = res.data
  loading.value = false
}
getArticleList()
//点击查询
const search = () => {
  getArticleList()
}
//点击重置
const reset = () => {
  if (!params.value.cate_id && !params.value.state) return
  params.value = {
    pagenum: 1,
    pagesize: 10,
    cate_id: '',
    state: ''
  }
  getArticleList()
}
//添加文章
const addManage = () => {
  drawerRef.value.openDrawer({})
}
//编辑文章
const editRow = (row) => {
  drawerRef.value.openDrawer(row)
}
//删除文章
const deleteRow = async (row) => {
  const res = await myConfirm('是否删除文章', '删除')
  if (res) {
    await artDelInfoService(row.id)
    getArticleList()
  }
}
//分页
const handleSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
} //选择每页条数
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
} //点击下一页
const successDrawer = (type) => {
  if (type === 'Add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="addManage">添加文章</el-button>
    </template>
    <!--搜索框-->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!--搜索框 v-model :modelValue 和 @update:modelValue 得简写-->
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格渲染-->
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="文章标题">
        <template #default="{ row }">
          <el-link :underline="false" type="primary">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类" />
      <el-table-column prop="pub_date" label="发布时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" />
      <el-table-column label="操作">
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
        <el-empty></el-empty>
      </template>
    </el-table>
    <el-pagination
      class="my_pagination"
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </page-container>

  <!--抽屉-->
  <manage-drawer ref="drawerRef" @successDrawer="successDrawer"></manage-drawer>
</template>
<style lang="scss" scoped>
.my_pagination {
  margin-top: 10px;
  justify-content: flex-end;
}
</style>
