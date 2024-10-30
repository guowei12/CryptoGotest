import axios from 'axios'
import router from '@/router';
import { ElMessage } from "element-plus";
const service = axios.create({
  baseURL: import.meta.env.VITE_RES_URL,
});
// 接口开始请求
service.interceptors.request.use(config => {
  var userInfo = localStorage.getItem('vuems_name');
  if (userInfo) {
    var userid = userInfo
  } else {
    userid = ''
  }
  var contentData = {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: userid,
  }
  var contentType = config.header
  contentData = Object.assign(contentData, contentType)
  config.params;
  config.headers = contentData
  return config
}, error => {
  Promise.reject(error)
})
// 接口调用结束
service.interceptors.response.use(
  (response) => {
    if (response.data.code) {
      switch (response.data.code) {
        case "9013":
          setTimeout(() => {
            router.replace({
              path: '/login',
            })
          }, 500)
          break
      }
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(response => {

  return response
}, error => {

})
export default service