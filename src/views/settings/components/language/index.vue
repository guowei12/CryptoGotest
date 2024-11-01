<template>
    <div class="language-con">
      <HeaderBar  :title="headerTitle"  :defaultH="true"></HeaderBar>
      <div class="language-list">
        <div class="language-list-li">
          <div :class="nowLanguage==item.name?'set-language':''" class="language-li" @click="setLanguage(item)" v-for="item,index in LanguageList" :key="index">
            <div class="language-li-left">
              <img class="language-li-left-icon" :src="item.img" alt="" srcset="">
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
          LanguageList:[
            {
            name:'English(US)',
            img:new URL('@/assets/images/set/US-icon.png', import.meta.url).href,
           },
           {
            name:'Vietnamese',
            img:new URL('@/assets/images/set/VN-icon.png', import.meta.url).href,
           },
           {
            name:'Thai',
            img:new URL('@/assets/images/set/TH-icon.png', import.meta.url).href,
           },
          ],
          nowLanguage:"English(US)"
         })
         onBeforeMount(() => {
         })
         onMounted(() => {
         })
         const setLanguage=(item:any)=>{
            data.nowLanguage=item.name
            // router.go(-1)
         }
         watchEffect(()=>{
         })
         return {
          ...toRefs(data),
          setLanguage
         };
    },
  })
  </script>
  <style lang='scss' scoped src='./index.scss'>
  </style>