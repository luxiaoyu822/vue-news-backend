<template>
  <div>
    <el-page-header content="个人中心" icon="" title="新闻管理系统">
    </el-page-header>
    <el-row :gutter="35" class="el-row">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="140" :src="avatarUrl" />
          <h2>{{ store.state.userInfo.role === 1 ? '管理员' : '编辑' }}</h2>
          <h2>{{ store.state.userInfo.username }}</h2>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-form
            ref="userInfoRef"
            :model="userInfoForm"
            :rules="userInfoRules"
            label-width="120px"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
          >
            <el-form-item label="用&ensp;户&ensp;名&nbsp;：" prop="username">
              <el-input size="large" v-model="userInfoForm.username" />
            </el-form-item>
            <el-form-item label="性&emsp;&emsp;别&nbsp;：" prop="gender">
              <el-select
                size="large"
                v-model="userInfoForm.gender"
                placeholder="请选择性别"
              >
                <el-option label="保密" :value="0" />
                <el-option label="男" :value="1" />
                <el-option label="女" :value="2" />
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
            <el-form-item label="头&emsp;&emsp;像&nbsp;：" prop="avatar">
              <el-upload
                class="avatar-uploader"
                action="#"
                list-type="picture-card"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="avatarUploadChange"
              >
                <img
                  v-if="userInfoForm.avatar"
                  :src="uploadAvatar"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="large" type="primary" @click="onSubmit"
                >修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import upload from '@/util/upload'
const store = useStore()
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? 'http://localhost:3000' + store.state.userInfo.avatar
    : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)
const uploadAvatar = computed(() =>
  userInfoForm.avatar.includes('blob')
    ? userInfoForm.avatar
    : 'http://localhost:3000' + userInfoForm.avatar
)
const userInfoRef = ref()
const { username, gender, introduction, avatar } = store.state.userInfo
const userInfoForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null,
})

const userInfoRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
  avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
})

const avatarUploadChange = file => {
  userInfoForm.avatar = URL.createObjectURL(file.raw)
  userInfoForm.file = file.raw
}
/* 
使用 Axios 发送带有选择文件的参数时，需要将文件数据包装成 FormData 对象，再通过 Content-Type 头部指定为 multipart/form-data 类型发送请求。
这是因为浏览器在上传文件时需要使用 multipart/form-data 格式进行传输，而普通的 JSON 对象并不支持该格式。
*/
const onSubmit = () => {
  userInfoRef.value.validate(async validate => {
    if (validate) {
      const res = await upload(userInfoForm, 'put', '/backend/user')
      if (res.code === 1) {
        store.commit('changeUserInfo', res.data)
        ElMessage.success('更新成功')
      } else {
        ElMessage.error('更新失败')
      }
    }
  })
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-top: 30px;
  .box-card {
    text-align: center;
    .card-header {
      span {
        text-align: start;
      }
    }
  }
}

:deep .el-upload--picture-card {
  width: 200px;
  height: 200px;
}
.avatar {
  width: 200px;
  height: 200px;
}

:deep .el-form-item__label {
  font-size: 16px;
}
</style>
