<template>
  <div class="account-container">
    <div>
      <div class="title-Dashboard">Account</div>
      <div class="info-Dashboard">Basic Information</div>
    </div>
    <div class="basic-information-box">
      <div>
        <div class="business-title">Business Name</div>
        <div class="business-box">{{userStore.userInfo.merchantName}}</div>
      </div>
      <div>
        <div class="business-title">Merchant ID</div>
        <div class="business-box">{{userStore.userInfo.merchantNo}}</div>
      </div>
    </div>
    <div class="basic-information-box1">
      <div>
        <div class="business-title">Slippage</div>
        <div class="business-box1">{{ userStore.userInfo.slidingPoint + '%'}}</div>
      </div>
      <div>
        <div class="business-title">Token Support</div>
        <div class="business-box1">{{userStore.userInfo.cryptoToken}}</div>
      </div>
      <!-- <div>
        <div class="business-title">Mode</div>
        <div class="business-box1">{{userStore.userInfo.cryptoToken}}</div>
      </div> -->
    </div>
    <div class="basic-information-box1">
      <!-- <div>
        <div class="business-title">Deduction </div>
        <div class="business-box1">{{ userStore.userInfo.slidingPoint + '%'}}</div>
      </div> -->
      <div>
        <div class="business-title">Gateway</div>
        <div class="business-box2">{{userStore.userInfo.payType}}</div>
      </div>
    </div>
    <div class="enable-2fa-box">
      <div class="enable-2fa-title">Enable 2FA to Protect Your Assets</div>
      <div class="enable-2fa-info" v-if="userStore.userInfo.googleAuthStatus === 0">Adding an additional security method to your account provides more security for your account and assets.</div>
      <div class="enable-2fa-info" v-else>Use Google Authenticator to protect your account and transactions.</div>
      <div class="goole-box">
        <div class="goole-show">
          <div class="left-goole-box">
            <img src="./../../assets/img/settlement/goole-icon.png" class="goole-icon">
            <div class="goole-authenticator">Google Authenticator</div>
          </div>
          <div class="right-goole-box" v-show="userStore.userInfo.googleAuthStatus === 0">
            <img src="./../../assets/img/settlement/check-show.png" class="check-show">
            <div class="goole-text">Off</div>
          </div>
          <div class="right-goole-box" v-show="userStore.userInfo.googleAuthStatus === 1">
            <img src="./../../assets/img/settlement/success-icon.png" class="check-show">
            <div class="goole-text">On</div>
            <img src="./../../assets/img/settlement/delete-icon.png" class="delete-icon" @click="deleteBtn">
          </div>
        </div>
      </div>
      <div class="enable" @click="Enable" v-show="userStore.userInfo.googleAuthStatus === 0">Enable</div>
    </div>
    <div class="isPop-box">
      <!-- 下一步还是下载App -->
      <div class="isPop-isType-bg" v-show="stateData.isPop">
        <div class="isPop-isType">
          <img src="./../../assets/img/settlement/close-icon.png" class="close-icon" @click="closeBtnShow">
          <div class="link">Link an Authenticator</div>
          <div class="code">Scan this QR code in the authenticator app</div>
          <!-- 生成二维码 -->
          <div class="ma" ref="qrCodeBox"></div>
          <div class="ma-num">{{stateData.gooleData.secret}}</div>
          <div class="info">If you are unable to scan the QR code, please enter this code manually into the app.</div>
          <div class="btn-box">
            <el-button color="#F0F1F5" class="isPop-search-btn" @click="next"
            >Next</el-button
          >
          <el-button color="black" class="isPop-search-btn1" @click="downLoad"
            >Download App</el-button
          >
          </div>
        </div>
      </div>
      <!-- 下载App弹窗 -->
      <div class="isPop-isType-bg" v-show="stateData.isPop1">
        <div class="isPop-isType1">
          <div class="title-box">
            <img src="./../../assets/img/settlement/close-icon.png" class="close-icon" @click="closeBtn(1)">
            <div class="link">Download APP</div>
          </div>
          <div class="ma-img-box">
            <div class="left-ma-box">
              <img src="./../../assets/img/settlement/ios-qrcode.png" class="left-ma">
              <div class="ma-text">
                <div class="text">https://apps.apple.com/us/app/google-authenticator/id388497605</div>
                <img src="./../../assets/img/settlement/copy.png" class="copy-icon" @click="$copyBtn('https://apps.apple.com/us/app/google-authenticator/id388497605')">
              </div>
            </div>
            <div class="right-ma-box">
              <img src="./../../assets/img/settlement/android-qrcode.png" class="left-ma">
              <div class="ma-text">
                <div class="text">https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=zh&gl=US</div>
                <img src="./../../assets/img/settlement/copy.png" class="copy-icon" @click="$copyBtn('https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=zh&gl=US')">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 输入谷歌验证码 -->
      <div class="isPop-isType-bg" v-show="stateData.isPop2">
        <div class="isPop-isType2">
          <div class="title-box">
            <img src="./../../assets/img/settlement/close-icon.png" class="close-icon" @click="closeBtn(2)">
            <div class="link-title">Verify Authenticator</div>
            <div class="link-info">Authenticator App Code</div>
          </div>
          <div class="input-box">
            <input type="text" class="input-style" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="6" v-model="stateData.gooleValue" placeholder="6-digit code">
          </div>
          <div class="input-code-tip">Enter the 6-digit code generated by the Authenticator App</div>
          <div class="btn-box1">
          <el-button color="black" class="isPop-search-btn3" @click="NextCodeBtn"
            >Next</el-button
          >
          </div>
        </div>
      </div>
      <!-- 删除goole验证 -->
      <div class="isPop-isType-bg" v-show="stateData.isPop3">
        <div class="isPop-isType3">
          <div class="title-box">
            <div class="link-title-delete">Are You Sure You Want to Remove Authenticator App Verification?</div>
          </div>
          <input type="text" class="input-style1" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="6" v-model="stateData.gooleValueDelete" placeholder="Enter the Google Authenticator code">
          <div class="btn-box1">
            <el-button color="#fff" class="isPop-search-btn2" @click="cancelBtn"
            >cancel</el-button
          >
          <el-button color="black" class="isPop-search-btn3" @click="ContinueBtn"
            >Continue</el-button
          >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  nextTick,
  onMounted,
  ref,
  onUnmounted,
  watch,
  reactive,
  computed,
  onBeforeUpdate,
  getCurrentInstance,
} from "vue";
import { useRoute } from "vue-router"; 
import { UseFindGoogleAuth, UseBindGoogleAuth, UseDeleteGoogleAuth } from "@/api/api";
import { useCounterStore } from '@/store/user';
import QRCode from 'qrcodejs2-fix';
import { ElMessage } from "element-plus";
const route = useRoute();
const { proxy } = getCurrentInstance() as any;
const userStore = useCounterStore();
const qrCodeBox = ref(null);
const stateData = reactive({
  isPop:false,
  isPop1:false,
  isPop2:false,
  isPop3:false,
  gooleData:{} as any,
  dialogVisible: false,
  gooleValue:'', // goole code
  gooleValueDelete:'',//goole code 删除
});
onMounted(async () => {
  if(route.query.type == 1){
    await routeType()
    await getFindGoogleAuth()
  }
});
onBeforeUpdate(() => {
  const qrcodeElement = qrCodeBox.value;
  if (qrcodeElement.hasChildNodes()) {
    qrcodeElement.removeChild(qrcodeElement.firstChild);
  }
});
// 查询goole二维码
const getFindGoogleAuth = async () => {
  let res = await UseFindGoogleAuth()
  if(res.data.code === '0'){
    stateData.gooleData = res.data.model
    generateQRcode(stateData.gooleData.qrCodeUrl)
  } else {
  }
}
// 绑定谷歌code
const getBindGoogleAuth = async () => {
  let res = await UseBindGoogleAuth(stateData.gooleValue)
  if(res.data.code === '0'){
    ElMessage.success(res.data.msg);
    stateData.isPop2 = false
    await userStore.getQueryUserInfo()
  } else {
    ElMessage.warning(res.data.msg);
  }
}
// 删除goole验证
const getDeleteGoogleAuth = async () => {
  let res = await UseDeleteGoogleAuth(stateData.gooleValueDelete)
  if(res.data.code === '0'){
    ElMessage.success(res.data.msg);
    stateData.isPop = false
    await userStore.getQueryUserInfo()
  } else {
    ElMessage.warning(res.data.msg);
  }
}
const generateQRcode = (url) => {
  const dom = qrCodeBox.value;
    let qrcode = new QRCode( dom ? dom : '', {
    text:url,
    width: 120,
    height: 120,
    margin: 1,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.L
  });
  proxy.$loading.hide()
}
// 上个页面传递过来参数 刷新后删除url上的参数
const routeType = () =>{
  const newUrl = window.location.hash.replace(/\?.*$/, ""); // 获取当前路径，并去除参数
  history.replaceState({}, '', newUrl); // 更新浏览器历史记录，不触发页面重新加载
  if(route.query.type === '1'){
    stateData.isPop = true
  }
}
const next = () =>{
  stateData.isPop2 = true
  stateData.isPop = false
}
const downLoad = () =>{
  stateData.isPop1 = true
  stateData.isPop = false
}
const closeBtn = (type) =>{
  if(type === 1){
    stateData.isPop1 = false
  }
  if(type === 2){
    stateData.isPop2 = false
  }
}
const NextCodeBtn = () => {
  if(stateData.gooleValue === ''){
    ElMessage.error('Enter the Google Authenticator code.');
    return
  }
  else {
    getBindGoogleAuth()
    stateData.gooleValue = ''
  }
}
const cancelBtn = () => {
  stateData.isPop3 = false
  stateData.gooleValueDelete = ''
}
const ContinueBtn = () => {
  if(stateData.gooleValueDelete === ''){
    ElMessage.error('Enter the Google Authenticator code.');
    return 
  }
  else {
    getDeleteGoogleAuth()
    stateData.isPop3 = false
    stateData.gooleValueDelete = ''
  }
}
const Enable = () => {
  proxy.$loading.show()
  stateData.isPop = true
  getFindGoogleAuth()
}
const deleteBtn = () => {
  stateData.isPop3 = true
}
const closeBtnShow = () => {
  stateData.isPop = false
}
</script>

<style scoped lang="scss">
.account-container{
  position: relative;
}
.title-Dashboard {
  color: #101828;
  font-size: 30px;
  line-height: 38px;
  font-family: "Inter-SemiBold";
}
.info-Dashboard {
  color: #101828;
  font-size: 16px;
  line-height: 24px;
  font-family: "Inter-SemiBold";
  margin-top: 44px;
}
.basic-information-box{
  display: flex;
  align-items: center;
  margin-top: 24px;
}
.basic-information-box1{
  display: flex;
  margin-top: 24px;
}
.business-title{
  font-size: 14px;
  color: #344054;
  margin-bottom: 6px;
}
.business-box{
  width: 320px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background: #2279F2;
  font-size: 16px;
  font-family: 'Inter-Medium';
  border-radius: 8px;
  margin-right: 16px;
}
.business-box1{
  width: 320px;
  text-align: center;
  color: #101828;
  border: 1px solid #D0D5DD;
  font-size: 16px;
  font-family: 'Inter-Medium';
  border-radius: 8px;
  margin-right: 16px;
  padding: 10px 10px;
  box-sizing: border-box;
  word-wrap: break-word; /* 旧版浏览器支持，可选 */
  overflow-wrap: break-word; /* 现代浏览器支持 */
}
.business-box2{
  max-width: 656px;
  min-width: 320px;
  text-align: center;
  color: #101828;
  border: 1px solid #D0D5DD;
  font-size: 16px;
  font-family: 'Inter-Medium';
  border-radius: 8px;
  margin-right: 16px;
  padding: 10px 20px;
  box-sizing: border-box;
  word-wrap: break-word; /* 旧版浏览器支持，可选 */
  overflow-wrap: break-word; /* 现代浏览器支持 */
}
.enable-2fa-box{
  margin-top: 40px;
}
.enable-2fa-title{
  font-size: 18px;
  color: #101828;
  font-family: "Inter-SemiBold";
  margin-bottom: 8px;
}
.enable-2fa-info{
  width: 457px;
  color: #475467;
  font-size: 14px;
  font-family: 'Inter-Regular';
  margin-bottom: 15px;
}
.goole-box{
  width: 656px;
  height: 100px;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  line-height: 100px;
}
.enable{
  width: 217px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-family: "Inter-SemiBold";
  margin-top: 30px;
  background: #101828;
  border-radius: 4px;
  cursor: pointer;
}
.isPop-isType-bg{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
}
.isPop-isType{
  width: 479px;
  height: 412px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1000;
  background: #fff;
}
.isPop-isType1{
  width: 479px;
  height: 359px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1000;
  background: #fff;
}
.isPop-isType2{
  width: 479px;
  height: 330px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1000;
  background: #fff;
}
.isPop-isType3{
  width: 479px;
  height: 265px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1000;
  background: #fff;
}
.btn-box{
  margin-top: 31px;
  text-align: center;
}
.btn-box1{
  margin-top: 31px;
  text-align: right;
  margin-right: 35px;
}
.isPop-search-btn{
  width: 160px;
  height: 40px;
  color: #101828;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-family: "Inter-Regular";
}
.isPop-search-btn1{
  width: 160px;
  height: 40px;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 6px;
  font-family: "Inter-Regular";
}
.isPop-search-btn2{
  width: 94px;
  height: 40px;
  color: #101828;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 6px;
  font-family: "Inter-Regular";
  border: 1px solid #D0D5DD;
}
.isPop-search-btn3{
  width: 94px;
  height: 40px;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 6px;
  font-family: "Inter-Regular";
}
.link{
  margin-top: 40px;
  font-size: 18px;
  color: #101828;
  text-align: center;
  font-family: 'Inter-SemiBold';
}
.link-title{
  margin-top: 40px;
  font-size: 18px;
  color: #101828;
  font-family: 'Inter-SemiBold';
  margin-left: 38px;
}
.link-title-delete{
  margin: 46px auto 20px auto;
  width: 369px;
  font-size: 18px;
  font-family: 'Inter-SemiBold';
  text-align: center;
  line-height: 28px;
}
.link-info{
  font-size: 14px;
  color: #475467;
  font-family: "Inter-Regular";
  margin-top: 10px;
  margin-left: 38px;
}
.code{
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  color: #475467;
  font-family: 'Inter-Regular';
}
.ma{
  width: 120px;
  height: 120px;
  margin: 17px auto 0 auto;
}
.ma-num{
  font-size: 14px;
  color: #101828;
  font-family: 'Inter-SemiBold';
  text-align: center;
  margin-top: 8px;
}
.info{
  width: 350px;
  font-size: 14px;
  line-height: 22px;
  color: #475467;
  text-align: center;
  margin: 0 auto;
  margin-top: 12px;
}
.close-icon{
  display: block;
  width: 12px;
  height: 12px;
  float: right;
  margin: -23px 23px 0 0;
  cursor: pointer;
}
.left-ma{
  display: block;
  width: 120px;
  height: 120px;
  background: #F0F1F5;
  margin: 0 auto 15px auto;
}
.copy-icon{
  display: block;
  width: 16px;
  height: 16px;
  margin-left: 8px;
  cursor: pointer;
}
.ma-text{
  width: 200px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F0F1F5;
  border-radius: 12px;
}
.text{
  color: #475467;
  width: 140px;
  white-space: normal; /* 允许在单词之间折行 */
  word-break: break-all; /* 允许在任意字符处折行 */
  font-size: 12px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ma-img-box{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 63px;
}
.input-box{
  width: 83%;
  height: 50px;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: 32px auto 0 auto;
}
.input-style{
  width: 100%;
  height: 50px;
  border: none;
  text-align: center;
  margin: 0 auto;
  font-size: 18px;
  color: #101828;
  font-family: 'Inter-Regular';
  // letter-spacing: 8px;
  padding-left: 8px;
  box-sizing: border-box;
  border-radius: 8px;
}
.input-style1{
  width: 83%;
  height: 50px;
  border: none;
  text-align: center;
  margin: 0 auto;
  font-size: 18px;
  color: #101828;
  font-family: 'Inter-Regular';
  // letter-spacing: 8px;
  padding-left: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #D0D5DD;
  display: flex;
  justify-content: center;
}
.input-code-tip{
  width: 265px;
  margin-left: 38px;
  font-size: 14px;
  color: #475467;
  margin-top: 8px;
}
.goole-icon{
  display: block;
  width: 54px;
  height: 54px;
  margin-right: 19px;
}
.left-goole-box{
  display: flex;
  align-items: center;
  margin-left: 38px;
}
.right-goole-box{
  display: flex;
  align-items: center;
  margin-right: 38px;
}
.check-show{
  display: block;
  width: 24px;
  height: 24px;
}
.goole-text{
  font-size: 16px;
  color: #101828;
  font-family: 'Inter-Medium';
  margin-left: 3px;
}
.goole-show{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.goole-authenticator{
  font-size: 16px;
  color: #101828;
  font-family: 'Inter-Medium';
}
.delete-icon{
  display: block;
  widows: 24px;
  height: 24px;
  margin-left: 46px;
  cursor: pointer;
}
.close-icon{
  width: 15px;
  height: 15px;
  display: block;
  position: absolute;
  top: 40px;
  right: 0;
}
</style>