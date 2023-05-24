<template>
  <div>
    <el-card>
      <el-page-header content="产品列表" icon="" title="产品管理" />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="产品名称" />
        <el-table-column prop="introduction" label="介绍" />
        <el-table-column prop="editTime" label="发布时间">
          <template #default="scoped">
            {{ editTimeFormat(scoped.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scoped">
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
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Edit, Delete } from '@element-plus/icons-vue'
import axios from 'axios'
import moment from 'moment'
const router = useRouter()
const tableData = ref([])
onMounted(() => {
  getTableData()
})

const editTimeFormat = data => {
  return moment(data).format('YYYY/MM/DD')
}

const getTableData = async () => {
  const { data } = await axios.get('/backend/product-manage/list')
  tableData.value = data.data
}

const handleConfirmDelete = async item => {
  await axios.post('/backend/product-manage/delete', {
    _id: item._id,
  })
  await getTableData()
}

const handleEdit = item => {
  router.push(`/product-manage/editproduct/${item._id}`)
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
.el-table {
  margin-top: 30px;
}
</style>
