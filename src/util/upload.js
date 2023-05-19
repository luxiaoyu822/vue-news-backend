import axios from 'axios'
function upload(userInfoForm, method, path) {
  const formData = new FormData()
  for (let i in userInfoForm) {
    formData.append(i, userInfoForm[i])
  }
  if (method === 'post') {
    return axios
      .post(path, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
  }
  if (method === 'put') {
    return axios
      .put(path, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
  }
}

export default upload
