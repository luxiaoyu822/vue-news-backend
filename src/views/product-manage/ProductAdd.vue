<template>
  <div>
    <el-page-header content="添加产品" icon="" title="产品管理">
    </el-page-header>
    <el-form
      ref="productInfoRef"
      :model="productInfoForm"
      :rules="productInfoRules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="产品名称：" prop="title">
        <el-input size="large" v-model="productInfoForm.title" />
      </el-form-item>
      <el-form-item label="产品介绍：" prop="introduction">
        <el-input
          size="large"
          type="textarea"
          :rows="3"
          v-model="productInfoForm.introduction"
        />
      </el-form-item>
      <el-form-item label="产品详情：" prop="detail">
        <el-input
          size="large"
          type="textarea"
          :rows="5"
          v-model="productInfoForm.detail"
        />
      </el-form-item>
      <el-form-item label="产品图片：" prop="cover">
        <el-upload
          class="cover-uploader"
          action="#"
          list-type="picture-card"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="coverUploadChange"
        >
          <img v-if="productInfoForm.cover" :src="uploadcover" class="cover" />
          <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
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
import { useRouter } from 'vue-router'
const store = useStore()
const productInfoRef = ref()
const productInfoForm = reactive({
  title: '',
  introduction: '',
  detail: '',
  cover: '',
  file: null,
})
const uploadcover = computed(() =>
  productInfoForm.cover.includes('blob')
    ? productInfoForm.cover
    : 'http://localhost:3000' + productInfoForm.cover
)
const productInfoRules = reactive({
  title: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
  introduction: [
    { required: true, message: '请输入产品介绍', trigger: 'blur' },
  ],
  detail: [{ required: true, message: '请输入产品详情', trigger: 'blur' }],
  cover: [{ required: true, message: '请上传产品图片', trigger: 'blur' }],
})

const coverUploadChange = file => {
  productInfoForm.cover = URL.createObjectURL(file.raw)
  productInfoForm.file = file.raw
}
const router = useRouter()
const onSubmit = () => {
  productInfoRef.value.validate(async validate => {
    if (validate) {
      const res = await upload(productInfoForm, 'post', '/backend/product-manage/add')
      if (res.code === 1) {
        store.commit('changeproductInfo', res.data)
        ElMessage.success('添加成功')
        router.push('/product-manage/productlist')
      } else {
        ElMessage.error('添加失败')
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
.cover {
  width: 200px;
  height: 200px;
}

:deep .el-form-item__label {
  font-size: 16px;
}
</style>
