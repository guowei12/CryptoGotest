<template>
  <div class='footerBar-container'>
    <div class="footerBar-list" v-if="false">
      <div class="footerBar-li" @click="setFooter('home')">
        <img class="footerBar-li-img" src="@/assets/images/footerBar/footer-home.png" alt="" srcset="">
        <div class="footerBar-li-text">Home</div>
      </div>
      <div class="footerBar-li" @click="setFooter('scan')">
        <img class="footerBar-li-img" src="@/assets/images/footerBar/footer-scan.png" alt="" srcset="">
        <div class="footerBar-li-text">Scan QR To Pay</div>
      </div>
      <div class="footerBar-li" @click="setFooter('discover')">
        <img class="footerBar-li-img" src="@/assets/images/footerBar/footer-discover.png" alt="" srcset="">
        <div class="footerBar-li-text">Discover</div>
      </div>
    </div>
    <div class="footerBar-list footerBar-list-home" v-else>
      <div class="footerBar-li-home" @click="setFooter('home')">
        <img class="footerBar-li-img" src="@/assets/images/footerBar/footer-home.png" alt="" srcset="">
        <div class="footerBar-li-text">Home</div>
      </div>
      <div class="footerBar-li-scan" @click="setFooter('scan')">
        <img class="footerBar-li-img" src="@/assets/images/footerBar/footer-scan.png" alt="" srcset="">
        <div class="footerBar-li-text">Scan QR To Pay</div>
      </div>
      <div class="footerBar-li-home" @click="setFooter('discover')">
        <img class="footerBar-li-img" src="@/assets/images/footerBar/footer-discover.png" alt="" srcset="">
        <div class="footerBar-li-text">Discover</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs, onMounted, getCurrentInstance } from 'vue'
import {useRouter,useRoute} from 'vue-router'
export default defineComponent({
  components: {},
  setup() {
    const { proxy } = getCurrentInstance() as any
    const router = useRouter()
    const queryRoute = useRoute()
    const data = reactive({
      merch:{} as any
    })
    onMounted(() => {
      data.merch=JSON.parse(localStorage.getItem('merch') as any)
    })
    const infoMethods = {
      setFooter(toNext:any){
        console.log('toNext',toNext)
        // router.push({ path:'/',query: {}})
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