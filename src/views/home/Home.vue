<template>
  <div>
    <el-page-header
      content="首页"
      icon=""
      title="新闻管理系统"
    ></el-page-header>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="140" :src="avatarUrl" />
        </el-col>
        <el-col :span="20">
          <h2 style="line-height: 140px">
            欢迎{{ store.state.userInfo.username }}回来，{{ welcomeText }}
          </h2>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
        </div>
      </template>
      <el-carousel :interval="4000" type="card" height="350px" v-if="swiperData.length">
        <el-carousel-item v-for="item in swiperData" :key="item._id">
          <div
            :style="{
              backgroundImage: `url('http://localhost:3000${item.cover}')`,
              height:'100%'
            }"
          >
            <h3 text="2xl" justify="center">{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
const store = useStore()
const swiperData = ref([])
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? 'http://localhost:3000' + store.state.userInfo.avatar
    : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)
const welcomeText = computed(() =>
  new Date().getHours() < 12 ? '要开心每一天' : '你可能累了，喝杯咖啡提提神吧'
)
onMounted(async () => {
  const { data } = await axios.get('/backend/product-manage/list')
  swiperData.value = data.data
})
</script>
<style lang="scss" scoped>
.box-card {
  margin-top: 50px;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
