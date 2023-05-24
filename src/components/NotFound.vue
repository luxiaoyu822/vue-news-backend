<template>
  <div class="container">
    <el-empty image-size="300" description="404 NOT FOUND" />
    <el-button type="primary" size="large" @click="backIndex">
      返回首页
    </el-button>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const backIndex = () => {
  router.push('/index')
}
</script>
<style lang="scss">
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-button{
    width: 5%;
  }
}
</style>
