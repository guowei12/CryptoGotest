import axios from 'axios'
// import {getDeviceIdentifier} from '@/common/index.js'

const service = axios.create({
  baseURL: import.meta.env.VITE_RES_URL,
});
// 接口开始请求
// console.log(deviceId);
service.interceptors.request.use(config => {
  // const deviceId = getDeviceIdentifier();

  var contentData = {
    "Content-Type": "application/json;charset=utf-8",
    "merchantNo":''
  }
  let merchantNo=localStorage.getItem("merchantNo");
  var contentType = config.header
  contentData = Object.assign(contentData, contentType)
  merchantNo?contentData.merchantNo=merchantNo:''
  config.params;
  config.headers = contentData
  return config
}, error => {
  Promise.reject(error)
})
// 接口调用结束
service.interceptors.response.use(
  (response) => {
 
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