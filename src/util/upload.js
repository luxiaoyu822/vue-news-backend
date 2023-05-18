import axios from 'axios'
function upload(userInfoForm, path) {
  const formData = new FormData()
  for (let i in userInfoForm) {
    formData.append(i, userInfoForm[i])
  }

  return axios
    .post(path, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data)
}

export default upload
