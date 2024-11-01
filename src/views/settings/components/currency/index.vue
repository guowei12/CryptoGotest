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
            img:new URL('@/assets/images/set/usd-icon.png', import.meta.url).href,
           },
           {
            name:'VND',
            img:new URL('@/assets/images/set/vnd-icon.png', import.meta.url).href,
           },
           {
            name:'THB',
            img:new URL('@/assets/images/set/thb-icon.png', import.meta.url).href,
           },
         
          ],
          nowCurrency:'USD'
         })
         onBeforeMount(() => {
         })
         onMounted(() => {
         })
         const setCurrency=(item:any)=>{
            data.nowCurrency=item.name
        //   router.go(-1)
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