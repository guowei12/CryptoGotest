import axios from 'axios'
// import {getDeviceIdentifier} from '@/common/index.js'

const service = axios.create({
  baseURL: import.meta.env.VITE_RES_URL,
});
// 接口开始请求
// console.log(deviceId);
service.interceptors.request.use(config => {
  // const deviceId = getDeviceIdentifier();
  var user_token = localStorage.getItem('user_token');
  // let lang = window.sessionStorage.getItem('locale') || 'en';
  if (user_token) {
    var userid = user_token;
  } else {
    userid = '';
  }
  var contentData = {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: userid,
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