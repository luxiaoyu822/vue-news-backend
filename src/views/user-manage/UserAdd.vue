<template>
  <div>
    <el-page-header content="添加用户" icon="" title="用户管理">
    </el-page-header>
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
      <el-form-item label="密&emsp;&emsp;码&nbsp;：" prop="password">
        <el-input
          size="large"
          type="password"
          v-model="userInfoForm.password"
        />
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
      <el-form-item label="头&emsp;&emsp;像&nbsp;：" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="#"
          list-type="picture-card"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="avatarUploadChange"
        >
          <img v-if="userInfoForm.avatar" :src="uploadAvatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button size="large" type="primary" @click="onSubmit"
          >添加</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import upload from '@/util/upload'
const store = useStore()
const userInfoRef = ref()
const userInfoForm = reactive({
  username: '',
  password: '',
  gender: 0,
  introduction: '',
  avatar: '',
  role: 2,
  file: null,
})

const userInfoRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
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
      const res = await upload(userInfoForm, '/backend/user/update')
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
.el-form {
  margin-top: 50px;
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
