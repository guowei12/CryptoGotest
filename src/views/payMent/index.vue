<!-- 支付金额 -->
<template>
  <div class="pay-box">
    <headerBar></headerBar>
    <div class="pay-box-num" v-if="!mechShow">
      <div class="pay-box-num-top">
        <!-- <div class="pay-box-num_title">
          <div>Pay to Store Name</div>
          <div class="pay-box-num_name">{{ merchantName }}</div>
        </div> -->
        <div class="pay-box-num_title">
          Pay to <div class="pay-box-num_name"> {{ merchantName }}</div>
        </div>
        <img class="pay-box-num_img" :src="scanLogo?scanLogo:merchantLogo" alt="" srcset="">
      </div>
      <div class="pay-box-amount">
        <div class="pay-box-amount-title">
          Amount
        </div>
        <!-- 允许输入正整数，调起纯数字键盘 -->
        <div  v-if="currencyResponseList?.scale == 0" >
        <!-- <van-field ref="inputField" :input-class="'van-field-input' + (showCursor ? ' show-cursor' : '')"  readonly unselectable="on" @click="show = true" @touchstart.stop="show = true"    autofocus class="field-class" v-model="digit" type="digit"
          label-class="field-label-class"  :label="currencyResponseList?.faitIcon" >
          <span class="custom" id="cursor"></span>
        </van-field> -->
        <div class="custom-field">
          <span class="faitIcon">{{ currencyResponseList?.faitIcon }}</span>
          <div class="custom-list">
           <span v-if="displayChars.length==0" id="cursor"></span>
          <span  class="custom-list-li" v-for="(char, index) in displayChars" :key="index">
          <span>{{ char }}</span>
          <span v-if="displayChars.length>0&&index === displayChars.length-1" id="cursor"></span>
          </span>
           </div>
        </div>
        <div class="field-wrong" v-if="digit && digit < currencyResponseList?.faitMin">The minimum transaction amount is
          {{currencyResponseList?.faitMin }} {{ currencyResponseList?.faitCurrency }}.</div>
        <div class="field-wrong" v-if="digit && digit > currencyResponseList?.faitMax">The maximum transaction amount is
          {{currencyResponseList?.faitMax }} {{ currencyResponseList?.faitCurrency }}.</div>
       <van-number-keyboard @input="onInputKeyd"  theme="custom" extra-key="."   close-button-text="pay" :show="show" :maxlength="16"
       @close="pustPay" @delete="onDeleted" />
        </div>
        <!-- 允许输入正整数 小数，调起纯数字键盘 -->
        <!-- :formatter="payAmountFormatter" -->
         <div v-if="currencyResponseList?.scale > 0" >
        <!-- <van-field ref="inputField" :input-class="'van-field-input' + (showCursor ? ' show-cursor' : '')"  readonly unselectable="on" @click="show1 = true" @touchstart.stop="show1 = true"  autofocus class="field-class"  v-model="number" type="number" 
          label-class="field-label-class" :label="currencyResponseList?.faitIcon" >
         <span class="custom" id="cursor"></span>
        </van-field> -->
        <div class="custom-field">
          <span class="faitIcon">{{ currencyResponseList?.faitIcon }}</span>
          <span v-if="displayChars.length==0" id="cursor"></span>
          <div class="custom-list">
          <span  class="custom-list-li" v-for="(char, index) in displayChars" :key="index">
          <span>{{ char }}</span>
          <span v-if="displayChars.length>0&&index === displayChars.length-1" id="cursor"></span>
          </span>
           </div>
        </div>
        <div class="field-wrong" v-if="number && number && number < currencyResponseList?.faitMin">The minimum
          transaction
          amount is {{ currencyResponseList?.faitMin }} {{ currencyResponseList?.faitCurrency }}.</div>
        <div class="field-wrong" v-if="number && number > currencyResponseList?.faitMax">The maximum transaction amount
          is
          {{ currencyResponseList?.faitMax }} {{ currencyResponseList?.faitCurrency }}.</div>
          <van-number-keyboard @input="onInputKey" theme="custom" extra-key="." close-button-text="pay"  :show="show1"
          :maxlength="16" @delete="onDelete" @close="pustPay" />
        </div>
      
      </div>

    </div>
    <loading v-if="mechShow"></loading>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, nextTick, reactive, toRefs, onBeforeMount,onActivated,onMounted, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import headerBar from './components/headerBar/index.vue'
import { getQrInfor, pustQrPay } from '../../apis/api'
import loading from './components/loading/index.vue'
import  {getUrlData}  from '../../common/index'

/**
* 仓库
*/
export default defineComponent({
  name: 'payMent',
  components: { headerBar, loading },
  setup() {
    /**
    * 路由对象
    */
    const route = useRoute();
    /**
    * 路由实例
    */
    const router = useRouter();
    const { proxy } = getCurrentInstance() as any
    const inputValue = ref('');
    //console.log('1-开始创立组件-setup')
    /**
    * 数据局部
    */
    const data = reactive({
      displayChars:[]
,      showCursor: false,
      cursorPosition: 0,
      isShowCursor:false,
      intervalId:null as any,
      inputA: false,
      faitCurrency:null as any,
      appid: null as any,
      digit: null as any,
      show: false,
      number: '' as any,
      show1: false,
      mechShow: false,
      currencyResponseList: null as any,
      merchantName: null as any,
      merchantLogo: null as any,
      scanLogo: null as any,
    })
    onBeforeMount(() => {
      //console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    const infoMethods = {
      showInputMethod() {
        // 使用 $refs 访问 DOM 元素
        inputValue.$refs.input.focus();
        // 以下代码是针对不同浏览器的输入法显示触发
        const inputField = this.$refs.inputField.$refs.input;
        if (inputField.setComposition) {
          inputField.setComposition();
        } else {
          inputField.focus();
        }
      },
    measureCursorOffset(position) {
      const inputField = this.$refs.inputField.$el.querySelector('.van-field-input');
      const textBeforeCursor = this.inputValue.substring(0, position);
      const dummy = document.createElement('span');
      dummy.textContent = textBeforeCursor;
      inputField.parentNode.appendChild(dummy);
      const offsetLeft = dummy.offsetWidth;
      inputField.parentNode.removeChild(dummy);
      return offsetLeft;
    },
      onFocus() {
        nextTick(() => {
          document.getElementsByClassName('van-field__control')[0]?.focus();
          document.getElementsByTagName("input")[0].focus();
        });

      },
      // digit 正整数
      inputd(value: any) {
        value = value.replace(/[^\d.]/g, "");  
        value = value.replace(/^\./g, ''); 
        value = value.replace(/^\0/g, '');
        return value
      },
      // number
      inputv(value: any) {
        value = value.replace(/[^\d.]/g, ""); 
        value = value.replace(/\.{2,}/g, "."); 
        value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        // value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        value = value.replace(/^\./g, ''); 
        let num=data.currencyResponseList.scale|| 0;
        // not input 0
        let zeroLimit=[] as any
        if(num>0){
          zeroLimit.length=num
          for(var i = 0; i < num; i++){
            zeroLimit[i]='0'
          }
        }
        zeroLimit=zeroLimit.join('')
        value = value.replace(new RegExp(`^(-)?(\\d*\\.?\\d{0,${num}}).*$`), "$2"); 
        value=value+''
        if (value.indexOf(".") != -1&&num>=1&& value.split('.')[1] === zeroLimit) {
          value = parseFloat(value)
        }
        // if (value.indexOf(".") != -1 && (value.split('.')[1] === '00'||value.split('.')[1] === '000')) {
        //   value = parseFloat(value)
        // }
         value=value+''
        if (value.indexOf(".") < 0 && value != "") {//如果没有小数点，首位不能为0，如01、02...
          value = parseFloat(value);
        }
        return value
        // nextTick(() => {
        //   data.number = value
        // })
      },
      // 输入方法校验多少位数
      onInput(e: { target: { value: string | number; }; }) {
        // console.log(e)
        e.target.value = e.target.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        e.target.value = e.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        e.target.value = e.target.value.replace(/^\./g, ''); //首位不能输入“.”
        //e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
        let num=data.currencyResponseList.scale|| 0;
        e.target.value =  e.target.value.replace(new RegExp(`^(-)?(\\d*\\.?\\d{0,${num}}).*$`), "$2"); //动态限制小数位数
        // console.log(e.target.value.indexOf("."))
        if (e.target.value.indexOf(".") != -1 && (e.target.value.split('.')[1] === '00')) {
          e.target.value = parseFloat(e.target.value);
        }
        if (e.target.value.indexOf(".") < 0 && e.target.value != "") {//如果没有小数点，首位不能为0，如01、02...
          e.target.value = parseFloat(e.target.value);
        }
        nextTick(() => {
          data.number = e.target.value
        })
              // 处理键盘输入事件
      // const start = this.inputValue.substring(0, this.cursorPosition);
      // const end = this.inputValue.substring(this.cursorPosition);
      // d.inputValue = start + value + end;
      },
      updateDisplayCharsd(){
         let digit=data.digit
        typeof digit === 'number'?digit=digit.toString():''
        data.displayChars = digit.split('');
      },
      updateDisplayChars(){
        let nun=data.number
        typeof nun === 'number'?nun=nun.toString():''
        data.displayChars = nun.split('');
      },
      onInputKey(val: { toString: () => any; }) {
        if(data.cursorPosition>=20){
          return
        }
        data.number = data.number + val.toString();
        if(data.number){
          data.number=infoMethods.inputv(data.number)
        }
        data.number=data.number.toString()
        if (data.number.split('.')[0]!== -1&&data.number.split('.')[1]?.length == data.currencyResponseList?.scale ) {
           data.number= (parseFloat(data.number)).toString()
        }
        data.cursorPosition= data.number.toString().length; 
        infoMethods.updateDisplayChars();
       
      },
      onInputKeyd(val: { toString: () => any; }) {
        if(val=='.'){
          return
        }
        if(data.cursorPosition>=20){
          return
        }
        data.digit = data.digit + val.toString();
        if(data.digit){
          data.digit=Number(infoMethods.inputd(data.digit))
        }
        data.cursorPosition=data.digit.toString().length;  // 更新光标位置
        infoMethods.updateDisplayCharsd();
      },
      
      onDeleted(){
        if (data.cursorPosition > 0) {
          let digit=data.digit
          typeof digit === 'number'?digit=digit.toString():''
          digit =  digit.slice(0, data.cursorPosition - 1) + digit.slice(data.cursorPosition);
          data.digit=digit
          // console.log(digit)
          if(digit){
            data.cursorPosition--;
          }else{
            data.cursorPosition=0
            data.displayChars=[]
          }
          infoMethods.updateDisplayCharsd();
       }
      },
      onDelete(){
        if (data.cursorPosition > 0) {
          let nun=data.number
          typeof nun === 'number'?nun=nun.toString():''
          nun= nun.slice(0, data.cursorPosition - 1)
          data.number=nun
         data.cursorPosition--;
        infoMethods.updateDisplayChars();
      }
      },
      // 获取商户信息
      async getInfor() {
        let params = {
          appid: data.appid,
          faitCurrency:data.faitCurrency
        }
        let res = await getQrInfor(params)
        if (res.data.code == 0) {
          if(res.data.model){
            if(res.data.model.scanPayStatus===false){
              proxy.$failToast('404 error', 'failToast', 3000)
              // data.mechShow = false
              return
            }
            localStorage.setItem("merchantNo", res.data.model.merchantNo);
            data.currencyResponseList = res.data.model.currencyResponseList
            data.merchantName = res.data.model.merchantName
            data.merchantLogo = res.data.model?.ui ? JSON.parse(res.data.model.ui).merchantLogo : ''
            data.scanLogo = res.data.model?.ui ? JSON.parse(res.data.model.ui).scanLogo : ''

            if(data.faitCurrency){
              const exists = data.currencyResponseList.some(item => item.faitCurrency === data.faitCurrency);
              if(exists){
               data.currencyResponseList.forEach(item =>{
                if(data.faitCurrency==item.faitCurrency){
                data.currencyResponseList=item
                }
               })}else{
                data.show = false
                data.show1 = false
                data.mechShow = false
                proxy.$failToast('fait error', 'failToast', 6000)
                return
               }
            }else{
               data.show = false
               data.show1 = false
               data.mechShow = false
               proxy.$failToast('fait error', 'failToast', 6000)
                return
              // data.currencyResponseList = res.data.model.currencyResponseList[0]
            }
            // data.currencyResponseList.scale=1
            data.mechShow = false
          }else{
            proxy.$failToast('fait error', 'failToast', 3000)
          }
        }else if(res.data.code == '8025'){
          // proxy.$failToast(res.data.msg, 3000)
          router.replace({ path: '/ip'})
          return
        }else {
          data.mechShow = false
          proxy.$failToast(res.data.msg, 'failToast', 3000)
        }
        setTimeout(() => {
          data.mechShow = false
        }, 9000)
      },
      async pustPay() {
        // console.log(data.number,data.digit)
        // return
        if(!data.digit&&data.currencyResponseList.scale==0){
          data.show = true
         // proxy.$failToast('Please enter the amount', 'failToast', 3000)
          return
        }
        if (!data.number&&data.currencyResponseList.scale>0) {
          data.show1 = true
         // proxy.$failToast('Please enter the amount', 'failToast', 3000)
          return
        }
      
        if ((data.number && data.number < data.currencyResponseList?.faitMin) || (data.number && data.number > data.currencyResponseList?.faitMax)) {
          data.show1= true
          return
        }
        if ((data.digit && data.digit < data.currencyResponseList?.faitMin) || (data.digit && data.digit > data.currencyResponseList?.faitMax)) {
          data.show= true
          return
        }
        if (!data.appid) {
          return
        }
        data.mechShow = true
        let params = {
          orderAmount: data.digit ? data.digit : data.number,
          appId: data.appid,
          payCurrency: data.currencyResponseList.faitCurrency,
          redirectUrl: window.location.href
        }
        let res = await pustQrPay(params)
        if (res.data.code == 0) {
          data.number=null
          data.digit=null
          window.location.href=res.data.model.webUrl
          // data.mechShow = false
        } else {

          proxy.$failToast(res.data.msg, 'failToast', 3000)
          data.mechShow = false
          // setTimeout(()=>{
          //   window.location.replace(data.orderDetail?.homeRedirectUrl+"?error="+res.data.msg)
          // },5000)

        }
      },
    }
    onMounted(async () => {
      data.mechShow = true
      if(getUrlData()?.faitCurrency){
        data.faitCurrency=getUrlData()?.faitCurrency
      }
      if (getUrlData()?.appid) {
        data.appid = getUrlData()?.appid
        await infoMethods.getInfor()
      } else {
        data.mechShow = false
      }
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === 'Go') {
          console.log('手机输入法的回车或Go操作被触发');
          infoMethods.pustPay()
        }
      });
      //console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    onActivated(async () => {
      data.mechShow = true
      if(getUrlData()?.faitCurrency){
        data.faitCurrency=getUrlData()?.faitCurrency
      }
      if (getUrlData()?.appid) {
        data.appid = getUrlData()?.appid
        await infoMethods.getInfor()
      } else {
        data.mechShow = false
      }
      //console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    watch(data, (_newVal, _oldVal) => {
      // console.log('11',newVal,oldVal)
      if(data?.digit){
        data.digit=(Number(data.digit)).toString()
      }
  
     if(data?.number=='0.00'&&data.currencyResponseList?.scale==2) {
        data.number='0'
     }
     if(data.number&&(data.number % 1 !== 0)){
        if (data.number.split('.')[0]!== -1 && (data.number.split('.')[1] === '0')) {
          data.number = data.number.split('.')[0].toString();
          // infoMethods.updateDisplayChars()
          return
        }
        // scale 位小数 校验最后一位 0 处理
        if (data.number.split('.')[0]!== -1&&data.number.split('.')[1]?.length == data.currencyResponseList?.scale ) {
           data.number= (parseFloat(data.number)).toString()
          //  infoMethods.updateDisplayChars()
          return;
        }
     }
    })

    watch(
      () => data.currencyResponseList,
      (_newVal, _oldVal) => {
        if (data.currencyResponseList && data.currencyResponseList?.scale > 0) {
      
        //   proxy.$nextTick(() => {
        //     setTimeout(() => {
        //       document.getElementsByTagName("input")[0].focus();
        //     }, 900);
        //   });
          data.show1 = true
        } else if (data.currencyResponseList && data.currencyResponseList?.scale == 0) {
        
        //   proxy.$nextTick(() => {
        //     setTimeout(() => {
        //       document.getElementsByTagName("input")[0].focus();
        //     }, 900);
            data.show = true
        //   });
        }
      }
    )
    return {
      ...toRefs(data),
      ...infoMethods,
      inputValue
    };
  },
})

</script>
<style lang='scss'>
.pay-box {
  input {
    caret-color: #1A72F6 !important;
    /*光标颜色*/
  }

  .van-field__label {
    width: auto;
    // max-width: 100px !important;
    margin-right: 5px !important;
  }
  .van-number-keyboard__body {
    font-family: 'sf-pro-display_medium_500' !important;
  }

  .van-key {
    font-size: 16px !important;
  }
}
</style>
<style lang='scss' scoped src='./index.scss'></style>