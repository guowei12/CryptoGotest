<!-- deposit submit -->
<template>
  <div class="deposit-detail">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="deposit-detail-box">
        <div class="deposit-detail-qrCode">

        </div>
        <div class="deposit-detail-address">
          <div class="deposit-detail-address-title">Wallet address</div>
          <div class="deposit-detail-address-hash-box">
            <div class="deposit-detail-address-hash">{{ hash }}</div>
            <copyCon :copyHtml="hash"/>
          </div>
        </div>
        <div class="deposit-detail-network">
          <div class="deposit-detail-network-title">
            Network
          </div>
          <div class="deposit-detail-network-con" @click="show=true">
            <div class="deposit-detail-network-con-left">
              <img class="currency-icon" src="@/assets/images/balance/currency-icon.png" alt="">
              <div class="deposit-detail-network-con-font">
                <div class="detail-currency-text">Ethereum</div>
                <div class="detail-network-text">ERC20</div>
              </div>
            </div>
            <img class="net-change-icon" src="@/assets/images/balance/net-change-icon.png" alt="" srcset="">
          </div>
          <div class="deposit-detail-network-tip">
            <img class="network-tip-icon" src="@/assets/images/balance/tip-icon.png" alt="" srcset="">
            <div class="network-tip-text">Sending coin or token other than USDT to this
              address may result in the loss of your deposit</div>
          </div>
        </div>
    </div>
    <div class="deposit-detail-btn" @click="backHome">
      Back Home
    </div>
    <div style="height: 68px;"></div>
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
        <div @click="setNetwork(item.network)" :class="nowIndex==index?'network-li-set':''" class="network-list-li" v-for="(item, index) in depositList" :key="index">
          <div class="network-li-left"> 
          <img  class="currency-img" :src="item.img" alt="" srcset="">
          <div class="network-list-con">
            <div class="network-list-con-name">{{ item.name }}</div>
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
    <!-- <showModel ></showModel> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent,ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import copyCon from '@/components/copy/index.vue'
import { useMain } from '@/store';
import showModel from '@/components/showModel/index.vue'
/**
* 仓库
*/
export default defineComponent({
    name: 'depositDetail',
    components:{HeaderBar,copyCon,showModel},
    setup() {
       const route = useRoute();
       const router = useRouter();
       const couponStore = useMain();
       const data = reactive({
        headerTitle:'Deposit USDT',
        hash:'0xe89bb7caa285672nbfe1v17bfcf85324b8b7f7af',
        show:false,
        depositList:[
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
        networkList:[{
          img:new URL('@/assets/images/home/BTC-icon.png', import.meta.url).href,
          network:'Bitcoin',
          name:'BTC',
        }],
        nowIndex:0,
        nowNetwork:''
       })
       const infoMethods ={
        setDeposit(idx:any){
          data.nowIndex=idx
          data.show=true
        },
        setNetwork(network:any){
          data.nowNetwork=network
          data.show=false
        },
        backHome(){
          router.replace({path:'/'})
        }
       }
       onBeforeMount(() => {
       })
       onMounted(() => {
        data.headerTitle='Deposit '+(route.query.currency?route.query.currency:'USDT')
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