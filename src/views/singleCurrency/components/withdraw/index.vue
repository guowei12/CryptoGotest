<!-- withdraw List -->
<template>
  <div class="deposit-box">
    <HeaderBar :title="headerTitle" :balance="true"></HeaderBar>
    <div class="deposit-con">
    <div class="deposit-list">
        <div @click="setWithdraw(index)" :class="nowIndex==index?'deposit-list-li-set':''" class="deposit-list-li" v-for="(item, index) in depositList" :key="index">
          <div class="deposit-list-li-left">
          <img  class="currency-img" :src="item.img" alt="" srcset="">
          <div class="deposit-list-con">
            <div class="deposit-list-con-name">{{ item.name }}</div>
            <div class="deposit-list-con-time">{{ item.network}}</div>
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
    name: 'withdrawList',
    components:{HeaderBar},
    setup() {
       const route = useRoute();
       const router = useRouter();
       const couponStore = useMain();
       const data = reactive({
        headerTitle:'Withdraw',
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
       })
       const infoMethods ={
        setWithdraw(idx:any){
          data.nowIndex=idx
          couponStore.SET_WITHDRAW({
            networkList:[],
            network:'',
            currency:'',
            address:''
          })
          router.push({ path: '/withdrawDetail'})
        },
       }
       onBeforeMount(() => {
       })
       onMounted(() => {
        console.log(couponStore.$state.withdraw)
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