<template>
  <div>
    <div id="title">
      <el-icon><Menu /></el-icon>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { Menu } from '@element-plus/icons-vue'
const store = useStore()
const handleCollapse = () => {
  store.commit('changeCollapse')
}
</script>
