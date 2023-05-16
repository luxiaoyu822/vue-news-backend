<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="$store.state.isCollapse ? '64px' : '230px'"
        ><side-menu
      /></el-aside>
      <el-container>
        <el-header><top-header /></el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import SideMenu from '@/components/SideMenu'
import TopHeader from '@/components/TopHeader'
</script>
<style lang="scss">
.el-aside {
  height: 100vh;
}
.el-header{
  background-color: #2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  line-height: 60px;
}
</style>
