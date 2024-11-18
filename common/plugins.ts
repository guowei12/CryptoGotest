import {
  showToast,
  showFailToast,
  showSuccessToast,
  closeToast,
  type ToastOptions,
  type ToastWrapperInstance
} from 'vant';
import warn from "@/assets/images/warn-icon.png"
import success from "@/assets/images/suc_icon.png"
import { debounce } from 'lodash';

// 全局复制
const copyBtn = (value: string) => {
  var input = document.createElement("input");
  //   let lang = window.localStorage.getItem("locale") || "en";
  input.value = value;
  document.body.appendChild(input);
  input.select(); // 选中文本
  document.execCommand("copy");
  // showToast("Copied");
  input.remove(); // 成功后删除input，防止影响其他元素
};
export default {
  install: (app: { config: { globalProperties: {
    $closeToast: (all?: boolean) => void; $debounce: (all?: boolean) => void; $toast: (options?: string | ToastOptions) => ToastWrapperInstance; $copyBtn: (value: string) => void; $failToast: (message: any, className: any, duration: any) => void; $successToast: (message: any, className: any, duration: any) => void; 
}; }; }) => {
    // 全局提示弹窗
    app.config.globalProperties.$toast = showToast
    app.config.globalProperties.$copyBtn = copyBtn;
    app.config.globalProperties.$closeToast = closeToast
    app.config.globalProperties.$failToast =(message:any,className:any,duration:any)=>{
      showFailToast({
        wordBreak:'break-all',
        iconSize:'20px',
        icon:warn,//'warning-o',
        message: message,
        className:className,
        duration: duration,
        position: 'top',
      });
    } 
    app.config.globalProperties.$successToast =(message:any,className:any,duration:any)=>{
      showSuccessToast({
        wordBreak:'break-all',
        iconSize:'20px',
        icon:success,
        message: message,
        className:className,
        duration: duration,
        position: 'top',
      });
    } 
    app.config.globalProperties.$debounce = (fn:any, delay = 2000) => {
      return debounce(fn, delay);
    };
  }
}