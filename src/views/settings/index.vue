<template>
  <div class="settings-con">
    <HeaderBar  :title="headerTitle"  :defaultH="true"></HeaderBar>
    <div class="settings-list">
      <div class="settings-list-title">
        General
      </div>
      <div class="settings-list-li" >
        <div class="settings-li" @click="goCurrency">
          <div class="settings-li-left">
            <img class="settings-li-left-icon" src="@/assets/images/set/currency-icon.png" alt="" srcset="">
            <div>Displayed Currency</div>
          </div>
          <div class="settings-li-right">
            <div>USD</div>
            <img class="arow-right" src="@/assets/images/set/arow-right.png"  alt="" srcset="">
          </div>
        </div>
        <div class="settings-li" @click="goLanguage">
          <div class="settings-li-left">
            <img class="settings-li-left-icon" src="@/assets/images/set/language-icon.png" alt="" srcset="">
            <div>Language</div>
          </div>
          <div class="settings-li-right">
            <div>EN-US</div>
            <img class="arow-right" src="@/assets/images/set/arow-right.png"  alt="" srcset="">
          </div>
        </div>
      </div>
      <div class="settings-list-title">
        Security
      </div>
      <div class="settings-list-li">
        <div class="settings-li">
          <div class="settings-li-left">
            <img class="settings-li-left-icon" src="@/assets/images/set/email-icon.png" alt="" srcset="">
            <div>Email</div>
          </div>
          <div class="settings-li-right">
            <div>sh****@example.com</div>
            <img class="already-icon" src="@/assets/images/set/already-icon.png"  alt="" srcset="">
          </div>
        </div>
        <div class="settings-li">
          <div class="settings-li-left">
            <img class="settings-li-left-icon" src="@/assets/images/set/authenticator-icon.png" alt="" srcset="">
            <div>Google Authenticator</div>
          </div>
          <div class="settings-li-right">
            <div class="settings-li-btn">Activate</div>
          </div>
        </div>
      </div>
      <div class="settings-list-li">
        <div class="settings-li">
          <div class="settings-li-left">
            <img class="settings-li-left-icon" src="@/assets/images/set/logout-icon.png" alt="" srcset="">
            <div>Log Out</div>
          </div>
          <div class="settings-li-right">
            <img class="arow-right" src="@/assets/images/set/arow-right.png"  alt="" srcset="">
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
        headerTitle:'Settings'
       })
       onBeforeMount(() => {
       })
       onMounted(() => {
       })
       const goCurrency=()=>{
        router.push({ path: '/currency' })
       }
       const goLanguage=()=>{
        router.push({ path: '/language' })
       }
       watchEffect(()=>{
       })
       return {
        ...toRefs(data),
        goCurrency,
        goLanguage
       };
  },
})
</script>
<style lang='scss' scoped src='./index.scss'>
</style>