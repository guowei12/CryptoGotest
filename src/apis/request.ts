import axios from 'axios'
import router from "@/router";

// import {getDeviceIdentifier} from '@/common/index.js'
import { getToken } from '@/utils/token';
import { createTimeZoneString } from '@/utils/common';

import warn from "@/assets/images/warn-icon.png"
import {
  showFailToast,
} from 'vant';
let lang = window.sessionStorage.getItem('locale') || 'en';
const failToast = (message: any, className: any, duration: any) => {
  showFailToast({
    wordBreak: 'break-all',
    iconSize: '20px',
    icon: warn,//'warning-o',
    message: message,
    className: className,
    duration: duration,
    position: 'top',
  })
}
const service = axios.create({
  baseURL: import.meta.env.VITE_RES_URL,
});
// 接口开始请求
// console.log(deviceId);
service.interceptors.request.use(config => {
  // const deviceId = getDeviceIdentifier();
  var user_token = getToken();
  let lang = window.sessionStorage.getItem('locale') || 'en';
  if (user_token) {
    var userid = user_token;
  } else {
    userid = '';
  }
  let timezone = createTimeZoneString(); // 获取时区字符串

  var contentData = {
    "Content-Type": "application/json;charset=utf-8",
    // lang:lang,
    Authorization: userid,
  }
  // let merchantNo = localStorage.getItem("merchantNo");
  var contentType = config.header
  contentData = Object.assign(contentData, contentType)
  // merchantNo ? contentData.merchantNo = merchantNo : ''
  config.params;
  config.headers = contentData
  return config
}, error => {
  Promise.reject(error)
})
// 接口调用结束
service.interceptors.response.use(
  (response) => {
    // console.log('response', response)
    if (response.data) {
      switch (response.data.code) {
        case "10014":
          failToast(response.data.msg, 'failToast', 3000)
          localStorage.clear();
          sessionStorage.clear();
          setTimeout(() => {
            router.replace({
              path: "/",
            });
          }, 500);
          break;
          // case "10014":
          //   failToast(response.data.msg, 'failToast', 3000)
          // break;
        default:
          break;

      }
    }
    return response
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 1:
          // showToast(error.response.data.message, 2000);
          const errTip: any = error.response.data;
          // window.$message?.error(errTip, {
          //   showIcon: false
          // });
          console.log('errTip', errTip);
          break;
        default:
          let errTip1 = lang != 'zh' ? `Connection error${error.response.status}` : `连接错误${error.response.status}`;
          // window.$message?.error(errTip1, {
          //   showIcon: false
          // });
          console.log('errTip1', errTip1);
          break;
      }
    } else {
      if (JSON.stringify(error)?.includes('timeout')) {
        let errTip2 = lang != 'zh' ? 'Server response timeout, please refresh the current page' : '服务器响应超时，请刷新当前页';
        // window.$message?.error(errTip2,{
        //   showIcon: false
        // })
        console.log('errTip3', errTip2);
      }
      let errTip3 = lang != 'zh' ? 'Failed to connect to the server' : '连接服务器失败';
      // window.$message?.error(errTip3,{
      //   showIcon: false
      // })
      console.log('errTip3', errTip3);
    }
    return Promise.reject(error)
  }
)

export default service