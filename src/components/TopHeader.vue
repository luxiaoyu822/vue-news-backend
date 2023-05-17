<template>
  <div class="header-container">
    <div id="left">
      <el-icon @click="handleCollapse"><Menu /></el-icon>
      <span style="margin-left: 10px">新闻网站后台管理系统</span>
    </div>
    <div id="right">
      <span>欢迎admin回来</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon :size="30" color="white"><User /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Menu, User } from '@element-plus/icons-vue'
const store = useStore()
const router = useRouter()
const handleCollapse = () => {
  store.commit('changeCollapse')
}
const handleCenter = () => {
  router.push('/center')
}
const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
<style lang="scss">
.header-container {
  display: flex;
  justify-content: space-between;
  .el-icon {
    cursor: pointer;
  }
  #left,
  #right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
