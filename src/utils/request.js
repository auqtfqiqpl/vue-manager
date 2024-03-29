import axios from 'axios'

axios.interceptors.request.use(config => {
  return config
}, err => {
  window.console.log({message: '请求超时!'})
  // return Promise.resolve(err);
})

axios.interceptors.response.use(data => {//{data:{status:200,msg"",obj:{}},status:200}
  if (data.status && data.status == 200 && data.data.status == 500) {
    //业务逻辑错误
    window.console.log({message: data.data.msg})
    return
  }
  if (data.data.msg) {
    Message.success({message: data.data.msg})
  }
  return data.data
}, err => {
  if (err.response.status == 504 || err.response.status == 404) {
    window.console.log({message: '服务器被吃了⊙﹏⊙∥'})
  } else if (err.response.status == 403) {
    window.console.log({message: '权限不足,请联系管理员!'})
  } else if (err.response.status == 401) {
    window.console.log({message: err.response.data.msg})
  } else {
    if (err.response.data.msg) {
      window.console.log({message: err.response.data.msg})
    } else {
      window.console.log({message: '未知错误!'})
    }
  }
  // return Promise.resolve(err);
})
let base = ''
export const postFormRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const postJsonRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  })
}