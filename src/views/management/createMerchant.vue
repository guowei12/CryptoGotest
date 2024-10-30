<template>
  <div class='createMerchant-container'>
    <div class="title">Create a new merchant account</div>
    <div class="steps-box">
      <div class="item-menu">
        <div class="menu-icon-active" :class="{'menu-icon1': data.active === 2 || data.active === 3}"></div>
        <div class="child-menu-row">
          <div class="menu-num" v-if="data.active == 1">1</div>
          <img src="./../../assets/img/success-logo.png" class="success-logo" v-else>
          <div class="menu-text">Onboarding</div>
        </div>
      </div>
      <div class="item-menu">
        <div class="menu-icon-show" v-if="data.active === 1"></div>
        <div class="menu-icon-active" :class="{'menu-icon1': data.active === 3}" v-else></div>
        <div class="child-menu-row">
          <div class="menu-num" v-show="data.active === 2">2</div>
          <img src="./../../assets/img/success-logo.png" class="success-logo" v-show="data.active === 3">
          <div class="menu-text" v-show="data.active === 2||data.active === 3">Merchant Configuration</div>
        </div>
      </div>
      <div class="item-menu">
        <div :class="data.active === 3 ?'menu-icon1':'menu-icon-show'"></div>
        <div class="child-menu-row">
          <img src="./../../assets/img/success-logo.png" class="success-logo" v-show="data.active === 3">
          <div class="menu-text" v-show="data.active === 3">Review</div>
        </div>
      </div>
    </div>
    <div class="body-list" v-if="data.active === 2">
      <div class="left-list">
        <div class="item-list">
          <div class="left-title"><span class="style-red">*</span> 1. Merchant Name</div>
          <input type="text" class="left-input">
        </div>
        <div class="item-list">
          <div class="left-title"><span class="style-red">*</span> 2. RedirectURL</div>
          <div class="left-info">The URL of the merchant page that is returned by default after the user order is completed</div>
          <input type="text" class="left-input">
        </div>
        <div class="item-list">
          <div class="left-title1">3. IP white list</div>
          <input type="text" class="left-input">
        </div>
        <div class="item-list">
          <div class="left-title"><span class="style-red">*</span> 2. RedirectURL</div>
          <div class="left-info1">Slippage refers to the range of risk loss set by the merchant. Once set, if the user’s payment amount/order amount falls within the slippage range, the transaction is successful; otherwise, it fails.If on slippage is set, the success condition is: User actually payamount ≥ Order amount.The merchant bears the risk of price fluctuations.</div>
          <input type="text" class="left-input1">
          <span class="style-add"> USD +</span>
          <input type="text" class="left-input1">
          <span class="style-add"> %</span>
        </div>
      </div>
      <div class="right-list">
        <div class="item-list">
          <div class="left-title">5. Support Payment method</div>
          <div>
            <el-checkbox v-model="data.checked1" label="Crypto Transfer" size="large" />
            <div class="crypto-list">
              <img src="./../../assets/img/crypto-icon1.png" class="crypto-icon">
              <img src="./../../assets/img/crypto-icon2.png" class="crypto-icon">
              <img src="./../../assets/img/crypto-icon3.png" class="crypto-icon">
              <img src="./../../assets/img/crypto-icon4.png" class="crypto-icon">
              <img src="./../../assets/img/crypto-icon5.png" class="crypto-icon">
            </div>
          </div>
        </div>
        <div class="item-list">
          <el-checkbox v-model="data.checked2" label="Exchange" size="large" />
          <div>
            <div class="crypto-list">
              <img src="./../../assets/img/exchange-icon.png" class="exchange-icon">
            </div>
          </div>
        </div>
        <div class="item-list">
          <el-checkbox v-model="data.checked3" label="Biannce Pay" size="large" />
          <div class="right-info">After selection Binance Pay, wait 1-2 days for ACH review.</div>
        </div>
        <div class="item-list">
          <div class="left-title">6. Remark</div>
          <div>
            <textarea name="text" class="textarea-style" v-model="data.remarkValue"></textarea>
          </div>
        </div>
        <div class="item-list">
          <div class="left-title">7. Status</div>
          <div class="status-box">
            <div :class="data.statusBar === 1?'status-left-box':'status-left-box1'" @click="statusBarBtn(1)">Available</div>
            <div :class="data.statusBar === 2?'status-left-box':'status-left-box1'" @click="statusBarBtn(2)">Close Service</div>
          </div>
        </div>
      </div>
    </div>
    <div class="submit" v-if="data.active === 2">Save</div>
  </div>
</template>

<script lang='ts' setup>
import {defineComponent, reactive, onMounted, getCurrentInstance } from 'vue'
import {useRouter,useRoute} from 'vue-router'
 const { proxy } = getCurrentInstance() as any
 const router = useRouter()
 const queryRoute = useRoute()
 const data = reactive({
  active:2,
  checked1:false,
  checked2:true,
  checked3:true,
  remarkValue:'',
  statusBar:1,
 })
 onMounted(() => {

 })
 const statusBarBtn = (id) =>{
  data.statusBar = id
 }
</script>

<style lang="scss">
.createMerchant-container{
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #344054;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #0059DA;
    border-color: #0059DA;
  }
}
</style>
<style scoped lang='scss'>
.title{
  font-size: 30px;
  color: #101828;
  line-height: 38px;
  font-family: "Inter-SemiBold";
}
.steps-box{
  margin-top: 40px;
  display: flex;
  align-items: center;
}
.item-menu{
  margin-right: 8px;
  height: 45px;
}
.menu-icon-active{
  width: 230px;
  height: 10px;
  background: #0059DA;
}
.menu-icon1{
  width: 230px;
  height: 10px;
  background: #00C06A;
}
.menu-icon-show{
  width: 230px;
  height: 10px;
  background: #DADADA;
}
.child-menu-row{
  display: flex;
  align-items: center;
  margin-top: 11px;
}
.menu-num{
  width: 18px;
  height: 18px;
  line-height: 18px;
  background: #0059DA;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  font-size: 12px;
  margin-right: 5px;
  font-family: 'Inter-SemiBold';
}
.success-logo{
  display: block;
  width: 19px;
  height: 19px;
  margin-right: 5px;
}
.menu-text{
  color: #101828;
  font-size: 16px;
  font-family: 'Inter-SemiBold';
}
.body-list{
  margin-top: 43px;
  display: flex;
}
.item-list{
  margin-bottom: 24px;
}
.left-title{
  font-size: 14px;
  color: #344054;
  font-family: 'Inter-Medium';
  margin-bottom: 6px;
}
.left-title1{
  font-size: 14px;
  color: #344054;
  font-family: 'Inter-Medium';
  margin-bottom: 6px;
  margin-left: 10px;
}
.left-info{
  width: 337px;
  color: #475467;
  font-size: 14px;
  font-family: 'Inter-Regular';
  line-height: 18px;
  margin-bottom: 10px;
  margin-left: 10px;
}
.left-info1{
  width: 337px;
  color: #475467;
  font-size: 14px;
  font-family: 'Inter-Regular';
  line-height: 20px;
  margin-bottom: 16px;
  margin-left: 10px;
}
.left-input{
  width: 337px;
  height: 44px;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  padding-left: 14px;
  box-sizing: border-box;
  color: #667085;
  font-size: 14px;
  margin-left: 10px;
}
.left-input1{
  width: 98px;
  height: 44px;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  padding-left: 14px;
  box-sizing: border-box;
  color: #667085;
  font-size: 14px;
  margin-left: 10px;
}
.style-red{
  color: #F23B3B;
}
.style-add{
  font-size: 14px;
  color: #344054;
  font-family: 'Inter-Medium';
}
.right-list{
  margin-left: 46px;
}
.crypto-list{
  display: flex;
  align-items: center;
  margin-left: 21px;
}
.crypto-icon{
  display: block;
  width: 36px;
  height: 36px;
  margin-right: 14px;
}
.exchange-icon{
  display: block;
  height: 15px;
  width: 230px;
}
.right-info{
  width: 337px;
  color: #475467;
  font-size: 14px;
  font-family: 'Inter-Regular';
  line-height: 18px;
  margin-bottom: 10px;
  margin-left: 21px;
}
.textarea-style{
  width: 337px;
  height: 113px;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  padding-left: 14px;
  padding-top: 10px;
  box-sizing: border-box;
  color: #667085;
  font-size: 14px;
}
.status-box{
  width: 337px;
  height: 44px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #EAECF0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.status-left-box{
  width: 160px;
  height: 36px;
  line-height: 36px;
  background: #0059DA;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-family: 'Inter-SemiBold';
  border-radius: 8px;
  cursor: pointer;
}
.status-left-box1{
  width: 160px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #667085;
  font-size: 14px;
  font-family: 'Inter-SemiBold';
  border-radius: 8px;
  cursor: pointer;
}
.submit{
  width: 480px;
  height: 48px;
  line-height: 48px;
  color: #fff;
  background: #0059DA;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0px 5% 152px;
  font-family: 'Inter-SemiBold';
}
</style>