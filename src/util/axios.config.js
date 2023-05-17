import axios from 'axios'
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
    if (response.data.code === -1) {
      localStorage.removeItem('token')
      window.location.href = '#/login'
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
