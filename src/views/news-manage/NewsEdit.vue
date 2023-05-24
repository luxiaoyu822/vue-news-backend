<template>
  <div>
    <el-page-header content="编辑新闻" @back="handleBack" title="新闻管理" />
    <el-form
      ref="newsInfoRef"
      :model="newsInfoForm"
      :rules="newsInfoRules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="标题：" prop="title">
        <el-input size="large" v-model="newsInfoForm.title" />
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <editor
          @event="handleChange"
          :content="newsInfoForm.content"
          v-if="newsInfoForm.content"
        />
      </el-form-item>
      <el-form-item label="类别：" prop="categroy">
        <el-select
          size="large"
          v-model="newsInfoForm.categroy"
          placeholder="请选择类别"
        >
          <el-option label="最新动态" :value="1" />
          <el-option label="典型案例" :value="2" />
          <el-option label="通知公告" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="封面：" prop="cover">
        <el-upload
          class="avatar-uploader"
          action="#"
          list-type="picture-card"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="avatarUploadChange"
        >
          <img v-if="newsInfoForm.cover" :src="uploadAvatar" class="cover" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button size="large" type="primary" @click="onSubmit">
          修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import editor from '@/components/editor/Editor'
import upload from '@/util/upload'
import axios from 'axios'
const router = useRouter()
const route = useRoute()
const newsInfoRef = ref()
const newsInfoForm = reactive({
  title: '',
  content: '',
  categroy: 1,
  cover: '',
  file: null,
  isPublish: 0,
})

onMounted(async () => {
  const { data } = await axios.get(
    `/backend/news-manage/news/${route.params.id}`
  )
  Object.assign(newsInfoForm, data.data)
})
const validateEditor = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入内容'))
  } else {
    callback()
  }
}
const newsInfoRules = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, validator: validateEditor, trigger: 'blur' }],
  categroy: [{ required: true, message: '请选择分类', trigger: 'blur' }],
  cover: [{ required: true, message: '请上传图片', trigger: 'blur' }],
})
const handleChange = data => {
  newsInfoForm.content = data
}
const uploadAvatar = computed(() =>
  newsInfoForm.cover.includes('blob')
    ? newsInfoForm.cover
    : 'http://localhost:3000' + newsInfoForm.cover
)
const avatarUploadChange = file => {
  newsInfoForm.cover = URL.createObjectURL(file.raw)
  newsInfoForm.file = file.raw
}
const onSubmit = () => {
  newsInfoRef.value.validate(async validate => {
    if (validate) {
      await upload(newsInfoForm, 'post', '/backend/news-manage/edit')
      router.back()
    }
  })
}

const handleBack = () => {
  router.back()
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
.cover {
  width: 200px;
  height: 200px;
}
</style>
