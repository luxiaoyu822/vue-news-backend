import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    const { authorization } = response.headers
    if (authorization) {
      localStorage.setItem('token', authorization)
    }
    if (response.data.code === -1&&response.data.info==='用户名或密码错误') {
      localStorage.removeItem('token')
      window.location.href = '#/login'
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
