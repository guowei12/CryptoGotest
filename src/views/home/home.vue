<template>
  <div class="QRPay-container">
    <fLoading class="fLoading-box" v-if="loading"/>
    <HeaderBar :home="true"></HeaderBar>
    <div class="QRPay-con">
      <div class="QRPay-balance">
        <div class="QRPay-balance-title">AEON balance <img class="QRPay-balance-title-img" src="@/assets/images/home/see-icon.png" alt=""></div>
        <div class="QRPay-balance-number">$ 1362.82</div>
      </div>
      <div class="QRPay-balance-btn" @click="goManagebalance">
        <img class="QRPay-balance-btn-img" src="@/assets/images/home/wallet-icon.png" alt="" srcset="">
        <div>Manage balance</div>
      </div>
    </div>
    <div class="QRPay-change-con">
      <div class="QRPay-change-tran">
        Transaction
      </div>
      <!-- <div class="QRPay-change">
        <div @click="onChange(1)" :class="listShow==1?'QRPay-change-btn-set':''" class="QRPay-change-btn btn-class">Transaction</div>
        <div @click="onChange(2)" :class="listShow==2?'QRPay-change-btn-set':''" class="QRPay-change-btn btn-class">Assets</div>
      </div> -->
      <div class="QRPay-list" v-if="listShow == 1">
        <div class="QRPay-list-li" v-for="(item, index) in transactionList" :key="index">
          <div class="QRPay-list-li-left">
          <img v-if="item.status=='Completed'" class="shopping-img" src="@/assets/images/home/shopping-com.png" alt="" srcset="">
          <img v-else class="shopping-img" src="@/assets/images/home/shopping-failed.png" alt="" srcset="">
          <div class="QRPay-list-con">
            <div class="QRPay-list-con-name">{{ item.name }}</div>
            <div class="QRPay-list-con-time">{{ item.time }}</div>
          </div>
          </div>
          <div class="QRPay-list-right">
            <div class="QRPay-list-con-num">{{ item.number }} {{ item.currency }}</div>
            <div class="QRPay-list-con-status">
              <div class="completed-color" v-if="item.status=='Completed'">Completed</div>
              <div class="failed-color" v-if="item.status=='Failed'">Failed</div>
            </div>
          </div>
        </div>
      </div>
      <div class="QRPay-list" v-if="listShow == 2">
        <div class="QRPay-list-li" v-for="(item, index) in assetsList" :key="index">
          <div class="QRPay-list-li-left">
          <img  class="currency-img" :src="item.img" alt="" srcset="">
          <div class="QRPay-list-con">
            <div class="QRPay-list-con-name">{{ item.network }}</div>
            <div class="QRPay-list-con-time">{{ item.name }}</div>
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
    <footerBar v-if="!loading"></footerBar >
    <!-- <qrcode/> -->

  </div>
</template>

<script lang='ts'>
import { defineComponent,ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import qrcode from "../QRcode/index.vue"
import fLoading from "@/components/fLoading/index.vue"
import HeaderBar from '@/components/headerBar/index.vue'
import footerBar from '@/components/footerBar/index.vue'

/**
* 仓库
*/
export default defineComponent({
    name: 'Home',
    components:{HeaderBar,footerBar,qrcode,fLoading},
    setup() {
       /**
       * 路由对象
       */
       const route = useRoute();
       /**
       * 路由实例
       */
       const router = useRouter();
       //console.log('1-开始创立组件-setup')
       /**
       * 数据局部
       */
       const data = reactive({
        loading:false,
        listShow:1,
        transactionList:[
          {
            name:'Mountain island coffee',
            time:'2023-02-06 01:56:45',
            status:'Completed',
            number:'-20,000',
            currency:'VND'
          },
          {
            name:'Mountain island coffee',
            time:'2023-02-06 01:56:45',
            status:'Failed',
            number:'-20,000',
            currency:'VND'
          }
        ],
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
        onChange(num: number){
          data.listShow=num
        },
        goManagebalance(){
          router.push({ path: '/balance' })
        }
       }
       onBeforeMount(() => {
       //console.log('2.组件挂载页面之前执行----onBeforeMount')
       })
       onMounted(() => {
      //console.log('3.-组件挂载到页面之后执行-------onMounted')
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