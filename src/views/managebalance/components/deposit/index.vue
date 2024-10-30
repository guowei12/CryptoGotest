<template>
  <div class="deposit-box">
    <HeaderBar :title="headerTitle" :balance="true"></HeaderBar>
    <div class="deposit-con">
    <div class="deposit-list">
        <div @click="setDeposit(index)" :class="noIndex==index?'deposit-list-li-set':''" class="deposit-list-li" v-for="(item, index) in depositList" :key="index">
          <div class="deposit-list-li-left">
          <img  class="currency-img" :src="item.img" alt="" srcset="">
          <div class="deposit-list-con">
            <div class="deposit-list-con-name">{{ item.name }}</div>
            <div class="deposit-list-con-time">{{ item.network}}</div>
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
        <div @click="setDeposit(index)" :class="noIndex==index?'network-li-set':''" class="network-list-li" v-for="(item, index) in depositList" :key="index">
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
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'

/**
* 仓库
*/
export default defineComponent({
    name: '',
    components:{HeaderBar},
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
        headerTitle:'Deposit',
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
        noIndex:0,
        show:false
       })
       const infoMethods ={
        setDeposit(idx:any){
          data.noIndex=idx
          data.show=true
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