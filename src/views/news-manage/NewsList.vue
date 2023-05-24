<template>
  <div>
    <el-card>
      <el-page-header content="新闻列表" icon="" title="新闻管理" />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="categroy" label="分类">
          <template #default="scoped">
            {{ categroyFormat(scoped.row.categroy) }}
          </template>
        </el-table-column>
        <el-table-column prop="editTime" label="发布时间">
          <template #default="scoped">
            {{ editTimeFormat(scoped.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="isPublish" label="是否发布">
          <template #default="scoped">
            <el-switch
              size="large"
              v-model="scoped.row.isPublish"
              :active-value="1"
              :inactive-value="0"
              @change="handleSwitchChange(scoped.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scoped">
            <el-button
              size="large"
              :icon="Star"
              type="success"
              circle
              @click="handlePreview(scoped.row)"
            />
            <el-button
              size="large"
              @click="handleEdit(scoped.row)"
              :icon="Edit"
              circle
            />
            <el-popconfirm
              title="您确定要删除吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              width="180"
              @confirm="handleConfirmDelete(scoped.row)"
            >
              <template #reference>
                <el-button size="large" type="danger" :icon="Delete" circle />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="新闻预览" width="50%">
      <div>
        <h2>{{ previewData.title }}</h2>
        <div>{{ editTimeFormat(previewData.editTime) }}</div>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div v-html="previewData.content" class="html-content"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
import axios from 'axios'
import moment from 'moment'
const router = useRouter()
const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)
onMounted(() => {
  getTableData()
})

const categroyFormat = categroy => {
  const arr = ['最新动态', '典型案例', '通知公告']
  return arr[categroy - 1]
}
const editTimeFormat = data => {
  return moment(data).format('YYYY/MM/DD')
}

const getTableData = async () => {
  const { data } = await axios.get('/backend/news-manage/list')
  tableData.value = data.data
}

const handleSwitchChange = async item => {
  await axios.put('/backend/news-manage/publish', {
    _id: item._id,
    isPublish: item.isPublish,
  })
}

const handlePreview = item => {
  previewData.value = item
  dialogVisible.value = true
}

const handleConfirmDelete = async item => {
  await axios.post('/backend/news-manage/delete', {
    _id: item._id,
  })
  await getTableData()
}

const handleEdit = item => {
  router.push(`/news-manage/editnews/${item._id}`)
}
</script>
<style lang="scss" scoped>
:deep .cell {
  font-size: 16px;
}
:deep .html-content {
  img {
    max-width: 100%;
  }
}
</style>
