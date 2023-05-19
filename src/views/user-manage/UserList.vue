<template>
  <div>
    <el-card>
      <el-page-header content="用户列表" icon="" title="用户管理">
      </el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column label="头像">
          <template #default="scoped">
            <div v-if="scoped.row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scoped.row.avatar"
              ></el-avatar>
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scoped">
            <div v-if="scoped.row.role === 1">
              <el-tag size="large" class="ml-2" type="danger">管理员</el-tag>
            </div>
            <div v-else>
              <el-tag size="large" class="ml-2" type="success">
                编&emsp;辑
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scoped">
            <el-button size="default" @click="handleEdit(scoped.row)">
              编辑
            </el-button>
            <el-popconfirm
              title="您确定要删除吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              width="180"
              @confirm="handleDelete(scoped.row)"
            >
              <template #reference>
                <el-button size="default" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">
      <el-form
        ref="userInfoRef"
        :model="userInfoForm"
        :rules="userInfoRules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="用&ensp;户&ensp;名&nbsp;：" prop="username">
          <el-input size="large" v-model="userInfoForm.username" />
        </el-form-item>
        <el-form-item label="角&emsp;&emsp;色&nbsp;：" prop="role">
          <el-select
            size="large"
            v-model="userInfoForm.role"
            placeholder="请选择角色"
          >
            <el-option label="管理员" :value="1" />
            <el-option label="编辑" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="个人介绍&nbsp;：" prop="introduction">
          <el-input
            size="large"
            :rows="4"
            v-model="userInfoForm.introduction"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const tableData = ref([])
onMounted(() => {
  getTableData()
})
const userInfoRef = ref()
const dialogVisible = ref(false)
const getTableData = async () => {
  const res = await axios.get('backend/user')
  tableData.value = res.data.data
}

const handleEdit = data => {
  let editData = {
    username: data.username,
    role: data.role,
    introduction: data.introduction,
    _id: data._id,
  }
  Object.assign(userInfoForm, editData)
  dialogVisible.value = true
}

const handleEditConfirm = async () => {
  const { data } = await axios.put(
    `backend/user/${userInfoForm._id}`,
    userInfoForm
  )
  dialogVisible.value = false
  if (data.code === 1) {
    ElMessage.success(data.info)
  } else {
    ElMessage.error(data.info)
  }
  getTableData()
}
const handleDelete = async data => {
  const res = await axios.delete(`backend/user/${data._id}`)
  if (res.data.code === 1) {
    ElMessage.success(res.data.info)
    getTableData()
  } else {
    ElMessage.error(res.data.info)
  }
}

const userInfoForm = reactive({
  username: '',
  introduction: '',
  role: 2,
})
const userInfoRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
})
</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 30px;
}
:deep .cell {
  font-size: 16px;
}
</style>
