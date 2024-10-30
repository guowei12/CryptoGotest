<template>
  <div class="statistic-container">
    <div>
      <div class="title-Dashboard">Withdrawal</div>
      <div class="info-Dashboard">Account information<span class="update-text">Update time {{stateData.newTime}}</span></div>
    </div>
    <div class="item-box">
      <div class="item-box-pending">
        <img src="./../../assets/img/settlement/settlement-iocn1.png" class="title-icon"/>
        <div class="card-title-box">
          <span class="card-title">Pending withdrawal account</span>
          <div class="tips-box">
            <img src="./../../assets/img/settlement/help-icon.png" class="help-icon"/>
            <img src="./../../assets/img/settlement/tip-icpn1.png" class="tip-icon"/>
          </div>
        </div>
        <div class="card-num">{{stateData.AccountInfo.pendingAmount}} <span class="style-text">USDT</span></div>
      </div>
      <div class="item-box-available">
        <img src="./../../assets/img/settlement/settlement-iocn2.png" class="title-icon"/>
        <div class="card-title-box">
          <span class="card-title">Withdrawal balance account</span>
          <div class="tips-box">
            <img src="./../../assets/img/settlement/help-icon.png" class="help-icon"/>
            <img src="./../../assets/img/settlement/tio-icon2.png" class="tip-icon"
            />
          </div>
        </div>
        <!-- 判断是否绑定谷歌验证 -->
        <div class="card-num">{{stateData.AccountInfo.balanceAmount}} <span class="style-text">USDT</span></div>
        <div class="btn">
          <div class="btn-text" v-if="!stateData.findWithdrawPending.status  || stateData.findWithdrawPending.status === 'Success' || stateData.findWithdrawPending.status === 'Fail'">Apply for Withdrawal</div>
          <div class="btn-text" v-else>There is currently a withdrawal order and cannot apply</div>
          <div class="btn-box">
            <div class="submit" v-if="!stateData.findWithdrawPending.status  || stateData.findWithdrawPending.status === 'Success' || stateData.findWithdrawPending.status === 'Fail'" @click="SettlementBtn">Withdrawal</div>
            <!-- 审核中不能点击 -->
            <div class="submit-disabled" v-if='stateData.findWithdrawPending.status && stateData.findWithdrawPending.status !== "Success" && stateData.findWithdrawPending.status !== "Fail"'>Withdrawal</div>
          </div>
        </div>
      </div>
      <div class="item-box-settled">
        <img src="./../../assets/img/settlement/settlement-iocn3.png" class="title-icon"/>
        <div class="card-title-box">
          <span class="card-title">Withdrawn amount</span>
        </div>
        <div class="card-num">{{stateData.AccountInfo.drawAmount}} <span class="style-text">USDT</span></div>
      </div>
    </div>
    <!-- 列表 -->
     <div class="settlement-history-box">
      <BalanceList></BalanceList>
        <!-- in process -->
      <div class="statistic-tip" v-if="stateData.findWithdrawPending.status">
        <div class="statistic-tip-left">
          <img src="./../../assets/img/settlement/bell-ringing.png" class="bell-icon">
          <div class="settlement-fund">Withdrawn Fund Application {{stateData.findWithdrawPending.drawAmount}} {{stateData.findWithdrawPending.drawCurrency}}</div>
        </div>
        <div class="statistic-tip-right">
          <div class="statistic-tip-right-btn" @click="isInProcessBtn">{{stateData.findWithdrawPending.status}}</div>
          <img src="./../../assets/img/settlement/arrow-right.png" class="arrow-icon">
        </div>
      </div>
     </div>
    <!-- 已绑谷歌 -->
    <div class="isPop-box" v-if="stateData.isShow">
      <div class="isPop-Information">
        <div class="isPop-title">Withdrawn Information</div>
        <div class="isPop-list">
          <div class="isPop-list-text">Withdrawal  Amount：{{stateData.WithdrawInfo.amount}}</div>
          <div class="isPop-list-text">Withdrawal  Currency：{{stateData.WithdrawInfo.cryptoCurrency}}</div>
          <div class="isPop-list-text">Withdrawal  Address：{{stateData.WithdrawInfo.cryptoAddress}}</div>
        </div>
        <div class="authentication-text">Two-Factor Authentication</div>
        <div class="isPop-list-text1">The withdrawal information is correct. Please confirm whether you want to proceed with the withdrawal.</div>
        <div class="input-box">
          <input type="text" class="input-style" placeholder="Enter the Google Authenticator code" v-model="stateData.gooleFaValue" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="6">
          <img src="./../../assets/img/settlement/clock.png" class="clock-icon">
        </div>
        <div class="iosPop-btn-box">
          <el-button color="#fff" class="isPop-search-btn" @click="cancel"
            >Cancel</el-button
          >
          <el-button color="black" class="isPop-search-btn1" @click="submit"
            >Submit</el-button
          >
        </div>
      </div>
    </div>
    <!-- Apply Result -->
    <div class="isPop-box" v-if="stateData.isShow2">
      <div class="isPop-Information1">
        <div class="isPop-title">Apply Result</div>
        <div class="isPop-list1"> 
          <div class="isPop-list-text">Your withdrawal application has been successful.</div>
          <div class="isPop-list-text">Please wait patiently and we will process it as soon</div>
          <div class="isPop-list-text">as possible.</div>
        </div>
        <div class="iosPop-btn-box1">
          <el-button color="black" class="isPop-search-btn2" @click="ResultBtn"
            >OK</el-button
          >
        </div>
      </div>
    </div>
    <!-- Settlement in progress -->
    <div class='isPop-box' v-if="stateData.isShow3">
      <div :class="stateData.findWithdrawPending.status !=='Success'?'isPop-Information2':'isPop-Information3'">
        <div class="isPop-title">Withdrawal {{stateData.findWithdrawPending.status}}</div>
        <div class="isPop-list1"> 
          <div class="isPop-list-text">
            <img src="./../../assets/img/settlement/success-icon.png" class="success-icon">
            <div>Withdrawal submitted</div>
          </div>
          <div class="isPop-list-text" style="margin-top:15px" v-if="stateData.findWithdrawPending.status ==='In process'">
            <img src="./../../assets/img/settlement/loading-icon.png" class="success-icon1">
            <div>Withdrawal in progress</div>
          </div>
          <div class="isPop-list-text" style="margin-top:15px" v-if="stateData.findWithdrawPending.status ==='Success'">
            <img src="./../../assets/img/settlement/success-icon.png" class="success-icon">
            <div>Withdrawal in progress</div>
          </div>
          <!-- 结算失败 -->
          <div class="isPop-list-text" style="margin-top:15px" v-if="stateData.findWithdrawPending.status ==='Fail'">
            <img src="./../../assets/img/settlement/check-circle.png" class="success-icon1">
            <div>Withdrawal  failed</div>
          </div>
  
          <!-- Settlement Successful 弹框 -->
          <div :class="stateData.findWithdrawPending.status !=='Success'?'progress-form-box':'progress-form-box1'" v-if="stateData.findWithdrawPending.status ==='Success'||stateData.findWithdrawPending.status ==='In process'">
            <div class="token-row">
              <div class="token-title">Withdraw amount</div>
              <div class="token-box">
                <img src="./../../assets/img/settlement/token-icon.png" class="token-icon">
                <div>{{stateData.findWithdrawPending.drawAmount}} {{stateData.findWithdrawPending.drawCurrency}}</div>
              </div>
            </div>
            <div class="token-row">
              <div class="token-title">Network</div>
              <div class="token-box">
                <div>{{stateData.findWithdrawPending.drawNetwork}}</div>
              </div>
            </div>
            <!-- Settlement Successful 如果成功有数据后列表添加HxID -->
            <div v-if="stateData.findWithdrawPending.status ==='Success'">
              <div class="token-row">
              <div class="token-title">HxID</div>
              <div class="token-box">
                <div>
                  <div class="token-text">{{stateData.findWithdrawPending.hashId}}</div>
                </div>
                <img src="./../../assets/img/settlement/copy.png" class="copy-icon" @click="$copyBtn(stateData.findWithdrawPending.hashId)">
              </div>
            </div>
            </div>
          </div>
          <!-- Settlement Successful 失败 -->
          <div v-else class="fail-box">
            <div class="fail-text">
              <div>Your Withdrawal withdrawal failed.</div>
              <div>Please feel free to contact us through the</div>
              <div>Support Center.</div>
            </div>
          </div>
        </div>
        <div class="iosPop-btn-box2">
          <el-button color="#fff" class="isPop-search-btn" @click="progressCancel"
            >Close</el-button
          >
          <el-button color="black" class="isPop-search-btn1" @click="progressCancel"
            >OK</el-button
          >
        </div>
      </div>
    </div>
    <!-- 未绑谷歌 -->
    <div class="isPop-box" v-if="stateData.isPop">
      <div class="isPop-Information1">
        <div class="isPop-title">Please Enable Google Authentication </div>
        <div class="isPop-list">
          <div class="isPop-list-text">You have not bound 2FA yet. Please bind Google </div>
          <div class="isPop-list-text">Authentication before proceeding with the checkout.</div>
        </div>
        <div class="iosPop-btn-box">
          <el-button color="#fff" class="isPop-search-btn" @click="Enable2FABtnCancel"
            >Cancel</el-button
          >
          <el-button color="black" class="isPop-search-btn2" @click="Enable2FABtn"
            >Enable 2FA</el-button
          >
        </div>
      </div>
    </div>
    <div class="isAddress-box" v-if="stateData.isAddress">
      <div class="isAddress-content">
        <div class="isAddress-title">Withdrawal Information</div>
        <div class="isAddress-info">The withdrawal address is not configured, so you cannot submit a withdrawal request. Please contact our staff for assistance with the configuration.</div>
        <div class="isAddress-btn" @click="isAddressBtn">ok</div>
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
  getCurrentInstance,
} from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from '@/store/user';
import { UseTransactionPageDownload,UseWithdrawPage,UseSettlementPage, UseFindAccountsFunds, UseFindWithdrawInfo , UseWithdraw, UseFindWithdrawPending, UseSettlementPageDownload, UseWithdrawPageDownload } from "@/api/api";
import { ElMessage } from "element-plus";
import BalanceList from './components/balanceList.vue'
const userStore = useCounterStore();
const router = useRouter();
const { proxy } = getCurrentInstance() as any;
const intervalId = ref(null);
const stateData = reactive({
  AccountInfo:{},
  isShow:false,
  isShow2:false,
  isShow3:false,
  isPop:false,
  WithdrawInfo:{},
  findWithdrawPending:{}, // 结算中
  newTime:'', //获取当前时间
  gooleFaValue:'',//谷歌6位验证码
  isAddress:false,//如果没有提现地址
});

onMounted(async () => {
  proxy.$loading.show();
  await newTime()
  await getFindAccountsFunds()
  await getFindWithdrawInfo()
  await getFindWithdrawPending()
  intervalId.value = setInterval(getFindWithdrawPending, 60000);
});
// 查询提现中的
const getFindWithdrawPending = async() => {
  let res = await UseFindWithdrawPending()
  if(res.data.code === '0'){
    if(res.data.model){
      stateData.findWithdrawPending = res.data.model
      proxy.$loading.hide();
    }
  }
}
// 查询商户资金信息
const getFindAccountsFunds = async() => {
  let res = await UseFindAccountsFunds()
    if(res.data.code === '0'){
    stateData.AccountInfo = res.data.model
    proxy.$loading.hide();
  }
}
// 获取当前时间
const newTime = () => {
   var date1 = new Date();
   var year1 = date1.getFullYear();
   var month1 = ("0" + (date1.getMonth() + 1)).slice(-2);
   var day1 = ("0" + date1.getDate()).slice(-2);
   var ymdStr1 = year1 + "-" + month1 + "-" + day1;
   stateData.newTime = ymdStr1
}
// 查询提现信息
const getFindWithdrawInfo = async () =>{
  let res = await UseFindWithdrawInfo()
  if(res.data.code === '0'){
    stateData.WithdrawInfo = res.data.model
    proxy.$loading.hide();
  }
}
// 提现
const getWithdraw = async () =>{
  let params = {
    googleCode:stateData.gooleFaValue
  }
  let res = await UseWithdraw(params)
  if(res.data.code === '0'){
    stateData.isShow2 = true
    stateData.isShow = false
    stateData.gooleFaValue = ''
  }
  else {
    ElMessage.error(res.data.msg);
  }
}
const SettlementBtn = () => {
  if(userStore.userInfo.googleAuthStatus === 1){
    if(stateData.WithdrawInfo.cryptoAddress === '' && stateData.WithdrawInfo.cryptoNetwork === ''){
      stateData.isAddress = true
      return
    }
    // 已绑定谷歌验证
    stateData.isShow = true
  }
  else {
    // 未绑定谷歌验证
    stateData.isPop = true
  }
}
// 没有提现地址确认btn
const isAddressBtn = () =>{
  stateData.isAddress = false
}
// in Process 按钮
const isInProcessBtn = () => {
  stateData.isShow3 = true
  getFindWithdrawPending()
}
const cancel = () => {
  stateData.isShow = false
  stateData.gooleFaValue = ''
}
const submit = () => {
  if(stateData.gooleFaValue === ''){
    ElMessage.error('Enter the Google Authenticator code.');
    return
  }
  else {
    getWithdraw()
  }
}
const ResultBtn = () => {
  stateData.isShow3 = true
  stateData.isShow2 = false
  getFindWithdrawPending()
}
const progressCancel = async () =>{
  await getFindAccountsFunds()
  stateData.isShow3 = false
}
const Enable2FABtn = () => {
  router.push({ path: '/account', query:{ type:1 } })
}
const Enable2FABtnCancel = () => {
  stateData.isPop = false
}
onUnmounted(() => {
  // 清除定时器
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});
</script>

<style scoped lang="scss">
.statistic-container{
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
.update-text {
  font-size: 16px;
  color: #475467;
  margin-left: 14px;
  font-family: "Inter-Regular";
}
.item-box {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item-box-pending {
  width: 33.33%;
  height: 232px;
  background: #E6EEFF;
  border-radius: 16px;
  box-shadow: 0px 2px 24px 0px #EDEEF1CC;
}
.item-box-available {
  width: 33.33%;
  height: 232px;
  background: #FFEFE7;
  border-radius: 16px;
  margin: 0 16px;
  box-shadow: 0px 2px 24px 0px #EDEEF1CC;
}
.item-box-settled {
  width: 33.33%;
  height: 232px;
  background: #E2E3FF;
  border-radius: 16px;
  box-shadow: 0px 2px 24px 0px #EDEEF1CC;
}
.title-icon {
  display: block;
  width: 24px;
  height: 24px;
  margin-top: 24px;
  margin-left: 24px;
}
.help-icon {
  display: block;
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
.tips-box {
  position: relative;
  cursor: pointer;
}
.tips-box:hover .tip-icon {
  display: block;
}
.tip-icon {
  display: none;
  width: 268px;
  position: absolute;
  top: -60px;
  left: -8px;
}
.card-title-box {
  display: flex;
  align-items: center;
  margin-left: 24px;
  margin-top: 8px;
}
.card-title {
  font-size: 16px;
  color: #101828;
  font-family: "Inter-Medium";
}
.card-num {
  font-size: 42px;
  line-height: 38px;
  margin-right: 8px;
  font-family: "Inter-SemiBold";
  color: #101828;
  margin-top: 20px;
  margin-left: 24px;
}
.style-text {
  color: #101828;
  font-size: 24px;
  font-family: "Inter-SemiBold";
}
.btn {
  margin-top: 17px;
}
.btn-text {
  font-family: "Inter-Regular";
  font-size: 12px;
  color: #101828;
  margin-left: 24px;
}
.submit {
  width: 92%;
  height: 40px;
  line-height: 40px;
  background: #101828;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  margin: 8px auto 0 auto;
}
.submit-disabled {
  width: 92%;
  height: 40px;
  line-height: 40px;
  background: #eff1f4;
  border-radius: 4px;
  text-align: center;
  color: #ADAEB0;
  cursor: pointer;
  margin: 8px auto 0 auto;
}

.statistic-tip {
  display: block;
  width: 406px;
  height: 30px;
}

.isPop-box{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  z-index: 100;
}
.isPop-Information{
  width: 424px;
  height: 400px;
  border-radius: 12px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.isPop-Information1{
  width: 424px;
  height: 190px;
  border-radius: 12px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.isPop-Information2{
  width: 424px;
  height: 324px;
  border-radius: 12px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.isPop-Information3{
  width: 424px;
  height: 398px;
  border-radius: 12px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.input-box{
  width: 376px;
  height: 44px;
  background: #fff;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}
.input-style{
  width: 340px;
  border-radius: 8px;
  padding-left: 14px;
  box-sizing: border-box;
  color: #101828;
  font-family: "Inter-Regular";
}
.clock-icon{
  display: block;
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.isPop-title{
  font-size: 18px;
  color: #101828;
  line-height: 28px;
  font-family: 'Inter-SemiBold';
  margin-top: 28px;
  margin-left: 24px;
}
.isPop-list{
  margin-left: 24px;
  margin-bottom: 28px;
}
.isPop-list1{
  margin-left: 24px;
}
.authentication-text{
  font-size: 18px;
  font-family: 'Inter-SemiBold';
  color: #101828;
  margin-left: 24px;
  margin-bottom: 10px;
}
.isPop-list-text{
  font-size: 14px;
  color: #475467;
  margin-top: 10px;
  font-family: "Inter-Regular";
  display: flex;
  align-items: center;
}
.isPop-list-text1{
  font-size: 12px;
  line-height: 15px;
  color: #475467;
  font-family: "Inter-Regular";
  display: flex;
  align-items: center;
  margin: 0px 24px 24px 24px;
}
.iosPop-btn-box{
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 24px;
  margin-right: 18px;
}
.iosPop-btn-box1{
  display: flex;
  align-items: center;
  justify-content: right;
  margin-right: 18px;
}
.iosPop-btn-box2{
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 15px;
  margin-right: 27px;
}
.isPop-search-btn{
  width: 79px;
  height: 40px;
  color: #344054;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-family: "Inter-Regular";
  border: 1px solid #D0D5DD;
}
.isPop-search-btn1{
  width: 79px;
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
.success-icon{
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 7px;
}
.success-icon1{
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 7px;
  animation: rotate 5s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.progress-form-box{
  margin-top: 23px;
  width: 364px;
  height: 106px;
  border-radius: 8px;
  border: 1px solid #E8E8E8;
}
.progress-form-box1{
  margin-top: 23px;
  width: 364px;
  border-radius: 8px;
  border: 1px solid #E8E8E8;
}
.token-title{
  font-size: 14px;
  color: #475467;
  font-family: "Inter-Regular";
}
.token-row{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 18px 5px 18px;
  border-bottom: 1px solid #E8E8E8;
  padding-top: 10px;
  padding-bottom: 15px;
  box-sizing: border-box;
}
.token-row:last-of-type{
  border: none;
}
.token-box{
  display: flex;
  align-items: center;
  font-family: 'Inter-Medium';
}
.border-style{
  width: 90%;
  border: 0.5px solid #E8E8E8;
  margin: 18px auto;
}
.token-icon{
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.token-text{
  width: 230px;
  word-wrap: break-word; /* 旧版浏览器支持 */
  overflow-wrap: break-word; /* 现代浏览器支持 */
  word-break: break-all; /* 为了保证连字符断行 */
  text-align: left;
  font-size: 12px;
}
.copy-icon{
  display: block;
  width: 16px;
  height: 16px;
  margin-left: 8px;
  cursor: pointer;
}
.fail-box{
  background: url('./../../assets/img/settlement/fail-bg.png') no-repeat;
  background-size: cover;
  width: 364px;
  height: 98px;
  margin-top: 23px;
}
.fail-text{
  color: #475467;
  font-size: 14px;
  font-family: "Inter-Regular";
  line-height: 22px;
  margin-left: 18px;
  padding-top: 16px;
  box-sizing: border-box;
}
.settlement-fund{
  color: #3538CD;
  font-size: 12px;
  font-family: 'Inter-Medium';
}
.settlement-history-box{
  position: relative;
}
.statistic-tip{
  width: 406px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #EEF4FF;
  border-radius: 16px;
  border: 1px solid #C7D7FE;
  box-sizing: border-box;
  position: absolute;
  top: 33px;
  right: 0;
}
.statistic-tip-left{
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.statistic-tip-right{
  display: flex;
  align-items: center;
  margin-right: 17px;
}
.statistic-tip-right-btn{
  background: #3538CD;
  width: 76px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  font-size: 12px;
  font-family: 'Inter-Medium';
  color: #fff;
  border-radius: 16px;
  cursor: pointer;
}
.arrow-icon{
  display: block;
  width: 16px;
  height: 16px;
  margin-left: 3px;
}
.bell-icon{
  display: block;
  width: 18px;
  height: 18px;
  margin-right: 7px;
}
.isAddress-box{
  position: fixed;
  background: rgba(0,0,0,0.6);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
}
.isAddress-content{
  width: 400px;
  height: 260px;
  background: #fff;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 10000;
}
.isAddress-title{
  font-size: 20px;
  font-family: 'Inter-Medium';
  margin-top: 20px;
  margin-left: 15px;
  color: #475467;
}
.isAddress-info{
  font-size: 16px;
  width: 92%;
  margin: 20px auto 0 auto;
  line-height: 25px;
  font-family: "Inter-Regular";
  color: #475467;
}
.isAddress-btn{
  width: 80px;
  height: 40px;
  border: 1px solid #E8E8E8;
  font-family: 'Inter-Medium';
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  float: right;
  margin-top: 30px;
  margin-right: 20px;
  cursor: pointer;
  color: #475467;
}
.input-style {
  width: 170px;
  border: none;
  height: 100%;
  background: transparent;
  padding-left: 6px;
  box-sizing: border-box;
}
</style>

<style lang="scss">
.statistic-container {
  .el-date-editor.el-input,
  .el-date-editor.el-input__wrapper {
    width: 237px;
    border-radius: 8px;
  }
  .el-range-editor.el-input__wrapper {
    padding: 5px 10px !important;
  }
  .el-pagination {
    --el-pagination-bg-color: none !important;
    --el-pagination-button-disabled-bg-color: none;
  }
  .el-table tr:last-of-type td {
    border-bottom: 0;
  }
}
.pay-ment-container {
  .el-table .cell {
    font-size: 12px !important;
    color: #475467 !important;
    font-family: "Inter-Regular";
  }
  .el-table__inner-wrapper:before {
    background-color: none !important;
    height: 0;
  }
  .el-table--fit {
    border-radius: 8px;
  }
}
</style>