<template>
  <router-view />
</template>
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const handleResize = () => {
  if (!store.state.isCollapse) {
    if (window.innerWidth <= 1200) {
      store.commit('windowChangeCollapse', true)
    }
  } else {
    if (window.innerWidth > 1200) {
      store.commit('windowChangeCollapse', false)
    }
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  position: absolute;
}

::-webkit-scrollbar-thumb {
  background: #92c4da;
}
::-webkit-scrollbar-track {
  background: #42839f;
}
</style>
