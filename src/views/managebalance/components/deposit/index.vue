<template>
  <div class="deposit-box">
    <HeaderBar :title="headerTitle" :balance="true"></HeaderBar>
    <div class="deposit-con">
    <div class="deposit-list">
        <div @click="setDeposit(index)" :class="nowIndex==index?'deposit-list-li-set':''" class="deposit-list-li" v-for="(item, index) in depositList" :key="index">
          <div class="deposit-list-li-left">
          <img  class="currency-img" :src="item.cryptoLogoUrl" alt="" srcset="">
          <div class="deposit-list-con">
            <div class="deposit-list-con-name">{{ item.crypto }}</div>
            <div class="deposit-list-con-time">{{ item.cryptoFullName}}</div>
          </div>
          </div>
        </div>
    </div>
    <van-action-sheet v-model:show="show" >
       <!-- 自定义 header 插槽 -->
      <view slot="header" >
        <div class="van-action-box-header">
          <div class="action-title-line"></div>
          <div>Select network</div>
          <img @click="show=false" class="back-icon" src="@/assets/images/balance/back-icon.png" alt="">
        </div>
      </view>  
      <div class="network-list">
        <div @click="setNetwork(item.network,index)" :class="nowIndext==index?'network-li-set':''" class="network-list-li" v-for="(item, index) in networkList" :key="index">
          <div class="network-li-left"> 
          <img  class="currency-img" :src="item.networkLogoUrl" alt="" srcset="">
          <div class="network-list-con">
            <div class="network-list-con-name">{{ item.network }}</div>
            <div class="network-list-con-time">{{ item.network}}</div>
          </div>
          </div>
    </div>
      </div>
      <div class='action-btm'>
        <img  class="tip-icon" src="@/assets/images/balance/tip-icon.png" alt="" srcset="">
        <div class="tip-con">
          When you recharge this currency, please only recharge through the supported networks below. If you recharge through other networks, funds will be lost.
        </div>
      </div>
    </van-action-sheet>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import { useMain } from '@/store';
import { getTokens, getNetwork } from '@/apis/api'


export default defineComponent({
    name: 'deposit',
    components:{ HeaderBar },
    setup() {
       const route = useRoute();
       const router = useRouter();
       const couponStore = useMain();
       const { proxy } = getCurrentInstance() as any
       const data = reactive({
        headerTitle:'Deposit',
        depositList:[] as any,
        networkList:[] as any,
        nowIndex:0,
        nowIndext:0,
        network:'',
        currency:'' as any,
        show:false
       })
       const infoMethods ={
        setDeposit(idx:any){
          data.currency = data.depositList[idx].crypto
          infoMethods.findNetwork(data.depositList[idx].crypto)
          data.nowIndex=idx
          data.show=true
        },
        setNetwork(network:any,index:any){
          couponStore.SET_DEPOSIT({
            networkList:data.networkList,
            network:network,
            currency:'',
            address:''
          })
          data.nowIndext = index
          data.network=network
          data.show=false
          router.push({ path: '/depositDetail',query:{
            currency:data.currency,
            network:network
          }})
        },
        async getList(){
          let res = await getTokens()
          if(res.data.code == 0){
            data.depositList = res.data.model
          }else{
            proxy.$failToast(res.data.msg, 'failToast', 3000)
          }
        },
        async findNetwork(token: any){
          let res = await getNetwork(token)
          if(res.data.code == 0){
            data.networkList = res.data.model
            data.nowIndext = 0
          }else{
            proxy.$failToast(res.data.msg, 'failToast', 3000)
          }
        }
       }
       onBeforeMount(() => {
       })
       onMounted(async() => {
         await infoMethods.getList()
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