<template>
  <div class="available-container">
    <div class="available-title">Account information <span class="available-title-date">Update time {{ data.newTime }}</span></div>
    <div class="available-content">
      <div class="available-box">
        <img src="./../../../assets/img/settlement/settlement-iocn1.png" class="available-icon">
        <div class="available-content-title">Pending withdrawal account</div>
        <div class="available-count-box">
          <div class="available-count-num">{{data.AccountInfo.pendingAmount}}</div>
          <div class="available-symbol">USDT</div>
        </div>
      </div>
      <div class="available-box1">
        <img src="./../../../assets/img/settlement/settlement-iocn2.png" class="available-icon">
        <div class="available-content-title">Balance withdrawal account</div>
        <div class="available-count-box">
          <div class="available-count-num">{{data.AccountInfo.balanceAmount}}</div>
          <div class="available-symbol">USDT</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { UseSettlementPage, UseFindAccountsFunds } from "@/api/api";
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const queryRoute = useRoute();
const data = reactive({
  AccountInfo: {} as any,
  newTime:'', //获取当前时间
});
onMounted(async () => {
  await newTime()
  await getFindAccountsFunds();
});
// 获取当前时间
const newTime = () => {
   var date1 = new Date();
   var year1 = date1.getFullYear();
   var month1 = ("0" + (date1.getMonth() + 1)).slice(-2);
   var day1 = ("0" + date1.getDate()).slice(-2);
   var ymdStr1 = year1 + "-" + month1 + "-" + day1;
   data.newTime = ymdStr1
}
// 查询商户资金信息
const getFindAccountsFunds = async () => {
  let res = await UseFindAccountsFunds();
  if (res.data.code === "0") {
    data.AccountInfo = res.data.model;
    proxy.$loading.hide();
  }
};
</script>
<style scoped lang='scss'>
.available-container {
  width: 100%;
  margin-top: 16px;
}
.available-title{
  font-size: 18px;
  color: #101828;
  margin-right: 14px;
  font-family: 'Inter-SemiBold';
}
.available-title-date{
  color: #475467;
  font-family: 'Inter-Regular';
  font-size: 16px;
}
.available-content{
  margin-top: 24px;
  display: flex;
  align-items: center;
}
.available-box{
  width: 354px;
  height: 178px;
  background: #E6EEFF;
  box-shadow: 0px 2px 24px 0px #EDEEF1CC;
  border-radius: 16px;
}
.available-box1{
  width: 354px;
  height: 178px;
  background: #FFEFE7;
  box-shadow: 0px 2px 24px 0px #EDEEF1CC;
  border-radius: 16px;
  margin-left: 16px;
}
.available-content-title{
  font-size: 16px;
  color: #101828;
  font-family: 'Inter-Medium';
  margin-top: 2px;
  margin-left: 24px;
}
.available-icon{
  display: block;
  width: 24px;
  height: 24px;
  padding-top: 24px;
  margin-left: 24px;
}
.available-count-box{
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 24px;
}
.available-count-num{
  color: #101828;
  font-size: 42px;
  font-family: 'Inter-SemiBold';
}
.available-symbol{
  color: #101828;
  font-size: 24px;
  font-family: 'Inter-SemiBold';
  margin-left: 8px;
  margin-top: 10px;
}
</style>