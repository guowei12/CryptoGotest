<template>
  <div class='footerBar-container'>
    <div class="footerBar-list" v-if="false">
      <div v-for="(item, index) in footerList" :key="index" class="footerBar-li" @click="setFooter(item.url)">
        <img class="footerBar-li-img" :src="path==item.url?item.setIcon:item.icon" alt="" srcset="">
        <div :class="path==footerList[index].url?'footerBar-li-text-set':''" class="footerBar-li-text">{{ item.name }}</div>
      </div>
    </div>
    <div class="footerBar-list footerBar-list-home" v-else>
      <div class="footerBar-li-home"  @click="setFooter(footerList[0].url)">
        <img class="footerBar-li-img" :src="path==footerList[0].url?footerList[0].setIcon:footerList[0].icon" alt="" srcset="">
        <div :class="path==footerList[0].url?'footerBar-li-text-set':''" class="footerBar-li-text">{{ footerList[0].name }}</div>
      </div>
      <div class="scan-pay-icon-bg">
        <img class="scan-pay-icon-bg-icon" src="@/assets/images/footerBar/scan-pay-icon-bg.png" alt="" srcset="">
      </div>
      <div class="footerBar-li-scan" @click="setFooter(footerList[1].url)">
        <img class="footerBar-li-img scan-pay-icon" src="@/assets/images/footerBar/scan-pay-icon.png" alt="" srcset="">
        <!-- <div class="footerBar-li-text">Scan QR To Pay</div> -->
      </div>
      <div class="footerBar-li-home" @click="setFooter(footerList[2].url)">
        <img class="footerBar-li-img" :src="path==footerList[2].url?footerList[2].setIcon:footerList[2].icon" alt="" srcset="">
        <div :class="path==footerList[2].url?'footerBar-li-text-set':''" class="footerBar-li-text">{{ footerList[2].name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent,watch, reactive, toRefs, onMounted, getCurrentInstance } from 'vue'
import {useRouter,useRoute} from 'vue-router'
export default defineComponent({
  components: {},
  setup() {
    const { proxy } = getCurrentInstance() as any
    const router = useRouter()
    const queryRoute = useRoute()
    const data = reactive({
      merch:{} as any,
      footerList:[
        {
          name:'Home',
          icon:new URL('@/assets/images/footerBar/footer-home.png', import.meta.url).href,
          setIcon:new URL('@/assets/images/footerBar/footer-home-set.png', import.meta.url).href,
          url:'/'
        },
        {
          name:'Scan QR To Pay',
          icon:new URL('@/assets/images/footerBar/footer-scan.png', import.meta.url).href,
          setIcon:new URL('@/assets/images/footerBar/footer-scan-set.png', import.meta.url).href,
          url:'/scan'
        },
        {
          name:'Map',
          icon:new URL('@/assets/images/footerBar/footer-map.png', import.meta.url).href,
          setIcon:new URL('@/assets/images/footerBar/footer-map-set.png', import.meta.url).href,
          url:'/map'
        }
      ],
      path:'/'
    })
    watch(() => router,
    (newValue, oldValue) => {
      console.log(newValue.currentRoute.value.fullPath);
     newValue.currentRoute.value.fullPath=='/'||newValue.currentRoute.value.fullPath==''? data.path='/': data.path=newValue.currentRoute.value.fullPath
    },{ immediate: true });

    onMounted(() => {
      data.merch=JSON.parse(localStorage.getItem('merch') as any)
    })
    const infoMethods = {
      setFooter(toNext:any){
        console.log('toNext',toNext)
        router.push({ path:toNext,query: {}})
      }
    }
    return {
      ...toRefs(data),
      router,
      queryRoute,
      ...infoMethods,
    }
  },
})

</script>
<style scoped lang='scss' src='./index.scss'></style>