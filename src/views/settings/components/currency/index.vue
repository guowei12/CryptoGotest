<template>
    <div class="currency-con">
      <HeaderBar  :title="headerTitle"  :defaultH="true"></HeaderBar>
      <div class="currency-list">
        <div class="currency-list-li">
          <div :class="nowCurrency==item.name?'set-currency':''" class="currency-li" @click="setCurrency(item)" v-for="item,index in currencyList" :key="index">
            <div class="currency-li-left">
              <img class="currency-li-left-icon" :src="item.img" alt="" srcset="">
              <div>{{ item.name }}</div>
            </div>
            <div>

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
  
  export default defineComponent({
      name: '',
      components:{HeaderBar},
      setup() {
         const route = useRoute();
         const router = useRouter();
         const data = reactive({
          headerTitle:'Displayed Currency',
          currencyList:[
            {
            name:'USD',
            value:'USD',
            img:new URL('@/assets/images/set/usd-icon.png', import.meta.url).href,
           },
           {
            name:'VND',
            value:'VND',
            img:new URL('@/assets/images/set/vnd-icon.png', import.meta.url).href,
           },
           {
            name:'THB',
            value:'THB',
            img:new URL('@/assets/images/set/thb-icon.png', import.meta.url).href,
           },
           {
            name:'EUR',
            value:'EUR',
            img:new URL('@/assets/images/set/eur-icon.png', import.meta.url).href,
           },
           {
            name:'HKD',
            value:'HKD',
            img:new URL('@/assets/images/set/hkd-icon.png', import.meta.url).href,
           },
           {
            name:'IDR',
            value:'IDR',
            img:new URL('@/assets/images/set/idr-icon.png', import.meta.url).href,
           },
           {
            name:'SGD',
            value:'SGD',
            img:new URL('@/assets/images/set/sgd-icon.png', import.meta.url).href,
           },
          ],
          nowCurrency:'USD'
         })
         onBeforeMount(() => {

         })
         onMounted(() => {
          let currency= window.localStorage.getItem('currency') as any;
          if(currency){
            data.nowCurrency=currency
          }else{
            window.localStorage.setItem('currency', 'USD');
          }
         })
         const setCurrency=(item:any)=>{
            data.nowCurrency=item.value
            window.localStorage.setItem('currency', item.value);
            router.replace({path:'/settings'})
         }
         watchEffect(()=>{
         })
         return {
          ...toRefs(data),
          setCurrency
         };
    },
  })
  </script>
  <style lang='scss' scoped src='./index.scss'>
  </style>