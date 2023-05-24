<template>
  <div>
    <el-menu
      :collapse="$store.state.isCollapse"
      :collapse-transition="false"
      class="el-menu"
      :default-active="useRoute().fullPath"
      :router="true"
    >
      <el-menu-item index="/index">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon><Avatar /></el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon><MessageBox /></el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/news-manage/addnews">添加新闻</el-menu-item>
        <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon><Reading /></el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product-manage/addproduct">添加产品</el-menu-item>
        <el-menu-item index="/product-manage/productlist"
          >产品列表</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {
  HomeFilled,
  Avatar,
  UserFilled,
  MessageBox,
  Reading,
} from '@element-plus/icons-vue'
const store = useStore()
const vAdmin = {
  mounted(el) {
    if (store.state.userInfo.role !== 1) {
      el.parentNode.removeChild(el)
    }
  },
}
</script>
<style lang="scss" scoped>
.el-menu {
  height: 100vh;
}
.el-menu-item {
  height: 62px;
  line-height: 62px;
  font-size: 17px;
  * {
    height: 62px;
  }
}
:deep .el-sub-menu__title {
  height: 62px;
}
.el-sub-menu__title {
  span {
    height: 62px;
    line-height: 62px;
  }
}
.el-sub-menu__title * {
  font-size: 17px;
}
</style>
