<template>
  <div id="app">
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="options"
    />
    <div class="form-container">
      <h3>新闻网站后台管理系统</h3>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        status-icon
        :rules="loginRules"
        label-width="120px"
        class="login-form"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            size="large"
            autocomplete="off"
          >
            <template #prefix>
              <el-icon size="22" class="el-input__icon"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密&emsp;码：" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            autocomplete="off"
          >
            <template #prefix>
              <el-icon size="22" class="el-input__icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" @click="sumbitForm()">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { loadFull } from 'tsparticles'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
const particlesInit = async engine => {
  await loadFull(engine)
}
const router = useRouter()
const store = useStore()
const loginForm = reactive({
  username: '',
  password: '',
})
const loginFormRef = ref()

const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const sumbitForm = () => {
  loginFormRef.value.validate(valid => {
    if (valid) {
      axios.post('/backend/user/login', loginForm).then(({ data }) => {
        if (data.code === 1) {
          store.commit('changeUserInfo', data.data)
          router.push('/index')
        } else {
          ElMessage.error(data.info)
        }
      })
    }
  })
}

//配置particles
const options = {
  background: {
    color: {
      value: '#2d3a4b',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce',
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}
</script>
<style lang="scss" scoped>
.form-container {
  width: 600px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba($color: #000000, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 50px;
  h3 {
    font-size: 32px;
  }
  .login-form {
    margin-top: 50px;
  }
  :deep .el-form-item__label {
    color: white;
    font-size: 18px;
  }
  .el-button {
    width: 100%;
  }
}
</style>
