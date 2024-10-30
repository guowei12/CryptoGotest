import { ElMessage } from "element-plus";
// 全局复制
const copyBtn = (value) => {
  var input = document.createElement("input");
  //   let lang = window.localStorage.getItem("locale") || "en";
  input.value = value;
  document.body.appendChild(input);
  input.select(); // 选中文本
  document.execCommand("copy");
  ElMessage.success('Copied');
  input.remove(); // 成功后删除input，防止影响其他元素
};
export default {
  install: (app) => {
    // 全局提示弹窗
    app.config.globalProperties.$copyBtn = copyBtn;
  }
}