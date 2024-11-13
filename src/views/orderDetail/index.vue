<template>
  <div class="detail-con">
    <HeaderBar :title="headerTitle"  :defaultH="true"></HeaderBar>
    <div class="detail-box">
        <div class="detail-box-title">
            <img v-if="detail.status == 'SUCCESS'" class="detail-box-icon" :src="successIcon" alt="" srcset="">
            <img v-if="detail.status == 'FAIL'" class="detail-box-icon" :src="failIcon" alt="" srcset="">           
             <div class="num">
                <div>{{ detail.confirmedNum }} {{ detail.crypto }}</div>
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
                    <div class="detail-box-li-right-text">{{ detail.address }}</div> 
                    <copyCon :copyHtml="address"/>
                </div>
            </div>
            <div class="detail-box-li">
                <div class="detail-box-li-left">Hash</div>
                <div class="detail-box-li-right">
                   <div class="detail-box-li-right-text">{{ detail.Hash }}</div> 
                    <copyCon :copyHtml="detail.Hash"/>
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
import { defineComponent,ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, onActivated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import copyCon from '@/components/copy/index.vue'
import HeaderBar from '@/components/headerBar/index.vue'
import { useMain } from '@/store';


export default defineComponent({
    name: 'payWithdraw',
    components:{HeaderBar,copyCon},
    setup() {
       const route = useRoute();
       const router = useRouter();
       const couponStore = useMain();
       const data = reactive({
        successIcon:new URL('@/assets/images/detail/success-icon.png', import.meta.url).href,
        failIcon:new URL('@/assets/images/detail/fail-icon.png', import.meta.url).href,
        headerTitle:'Deposit details',
        detail: {} as any,
       })
       onBeforeMount(() => {
       })
       onMounted(() => {
        data.detail = couponStore.$state.orderDetail
       })
       onActivated(()=>{
        data.detail = couponStore.$state.orderDetail
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