<template>
  <div class="managebalance-box">
    <HeaderBar  :title="headerTitle" :balance="true"></HeaderBar>
    <div class="QRPay-con">
      <div class="QRPay-balance">
        <div class="QRPay-balance-title">AEON balance <img class="QRPay-balance-title-img" src="@/assets/images/home/see-icon.png" alt=""></div>
        <div class="QRPay-balance-number">$ 1362.82</div>
      </div>
      <div class="balance-btn-box" >
        <div class="balance-btn-df" @click="goUrl('deposit')">
            <img class="balance-btn-img" src="@/assets/images/balance/import.png" alt="" srcset="">
            <div>Deposit</div>
        </div>
        <div class="balance-btn-df" @click="goUrl('withdraw')">
            <img class="balance-btn-img" src="@/assets/images/balance/import.png" alt="" srcset="">
            <div>Withdraw</div>
        </div>
     
      </div>
      <div class="QRPay-list" >
        <div class="QRPay-list-li" v-for="(item, index) in assetsList" :key="index" @click="goCurrency(item.currency)">
          <div class="QRPay-list-li-left">
          <img  class="currency-img" :src="item.img" alt="" srcset="">
          <div class="QRPay-list-con">
            <div class="QRPay-list-con-name">{{ item.name }}</div>
            <div class="QRPay-list-con-time">{{ item.network}}</div>
          </div>
          </div>
          <div class="QRPay-list-right">
            <div class="QRPay-list-con-num">${{ item.balance }}</div>
            <div class="QRPay-list-con-status">
              {{ item.number }} {{ item.currency }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import { useMain } from '@/store';

/**
* 仓库
*/
export default defineComponent({
    name: '',
    components:{HeaderBar},
    setup() {
       const route = useRoute();
       const router = useRouter();
       const couponStore = useMain();
       const data = reactive({
        headerTitle:"Manage balance",
        assetsList:[
          {
            img:new URL('@/assets/images/home/BTC-icon.png', import.meta.url).href,
            network:'Bitcoin',
            name:'BTC',
            balance:'1191.71',
            number:'0.0185',
            currency:'VND'
          },
          {
            img:new URL('@/assets/images/home/BTC-icon.png', import.meta.url).href,
            network:'Bitcoin',
            name:'BTC',
            balance:'1191.71',
            number:'0.0185',
            currency:'VND'
          },
        ],
       })
       const infoMethods = {
        goUrl(url:any){
            router.push({ path: '/'+url })
        },
        goCurrency(currency:any){
          router.push({ path: '/currency',query:{currency:currency} })
        },
       }
       onBeforeMount(() => {
        couponStore.SET_WITHDRAW({})
        couponStore.SET_DEPOSIT({})
       })
       onMounted(() => {
    
       })
       watchEffect(()=>{
       })
      return {
        ...toRefs(data),
        ...infoMethods
      };
  },
})

</script>
<style lang='scss' scoped src='./index.scss'>
</style>