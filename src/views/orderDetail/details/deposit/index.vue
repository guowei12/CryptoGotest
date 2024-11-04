<template>
  <div class="detail-con">
    <HeaderBar :title="headerTitle"  :defaultH="true"></HeaderBar>
    <div class="detail-box">
        <div class="detail-box-title">
            <img class="detail-box-icon" :src="successIcon" alt="" srcset="">
            <div class="num">
                <div>+50 USDT</div>
                <div class="min-font">Success</div>
            </div>
        </div>
        <div class="detail-box-list">
            <div class="detail-box-li">
                <div class="detail-box-li-left">Network</div>
                <div class="detail-box-li-right">Ethereum ERC20</div>
            </div>
            <div class="detail-box-li">
                <div class="detail-box-li-left">Address</div>
                <div class="detail-box-li-right">
                    <div class="detail-box-li-right-text">{{ address }}</div> 
                    <copyCon :copyHtml="address"/>
                </div>
            </div>
            <div class="detail-box-li">
                <div class="detail-box-li-left">Hash</div>
                <div class="detail-box-li-right">
                   <div class="detail-box-li-right-text">{{ Hash }}</div> 
                    <copyCon :copyHtml="Hash"/>
                </div>
            </div>
            <div class="detail-box-li">
                <div class="detail-box-li-left">Time</div>
                <div class="detail-box-li-right">
                    2024-04-14 18:19 (UTC+8)
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import copyCon from '@/components/copy/index.vue'
import HeaderBar from '@/components/headerBar/index.vue'

export default defineComponent({
    name: 'depositResult',
    components:{HeaderBar,copyCon},
    setup() {
       const route = useRoute();
       const router = useRouter();
       const data = reactive({
        successIcon:new URL('@/assets/images/detail/success-icon.png', import.meta.url).href,
        failIcon:new URL('@/assets/images/detail/fail-icon.png', import.meta.url).href,
        headerTitle:'Deposit details',
        address:'0xe89bb7caa285672nbfe1v17bfcf85324b8b7f7af',
        Hash:'0x9265671e759f0e7cfc8451a089f747e0e8035b46e776cf2a948e814179b55585'
       })
       onBeforeMount(() => {
       })
       onMounted(() => {
       })
       watchEffect(()=>{
       })
      return {
        ...toRefs(data)
      };
  },
})

</script>
<style lang='scss' scoped src='./index.scss'>
</style>