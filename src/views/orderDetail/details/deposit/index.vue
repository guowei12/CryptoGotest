<template>
    <div class="detail-con">
        <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
        <div class="detail-box">
            <div class="detail-box-title">
                <img v-if="detail.status == 'SUCCESS'" class="detail-box-icon" :src="successIcon" alt="" srcset="">
                <img v-else class="detail-box-icon" :src="failIcon" alt="" srcset="">
                <div class="num">
                    <div>+{{ detail.confirmedNum }} {{ detail.crypto }}</div>
                    <div v-if="detail.status == 'SUCCESS'" class="min-font">Success</div>
                    <div v-else class="min-font">Fail</div>
                </div>
            </div>
            <div class="detail-box-list">
                <div class="detail-box-li" v-if="detail.network">
                    <div class="detail-box-li-left">Network</div>
                    <div class="detail-box-li-right">{{ detail.network }}</div>
                </div>
                <div class="detail-box-li" v-if="detail.address">
                    <div class="detail-box-li-left">Address</div>
                    <div class="detail-box-li-right">
                        <div class="detail-box-li-right-text">{{ detail.address }}</div>
                        <copyCon :copyHtml="detail.address" />
                    </div>
                </div>
                <div class="detail-box-li" v-if="detail.txHash">
                    <div class="detail-box-li-left">Hash</div>
                    <div class="detail-box-li-right">
                        <div class="detail-box-li-right-text">{{ detail.txHash }}</div>
                        <copyCon :copyHtml="detail.txHash" />
                    </div>
                </div>
                <div class="detail-box-li">
                    <div class="detail-box-li-left">Time</div>
                    <div class="detail-box-li-right">
                        {{ detail.UTCTime }} (UTC+8)
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect, onActivated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import copyCon from '@/components/copy/index.vue'
import HeaderBar from '@/components/headerBar/index.vue'
import { useMain } from '@/store';
import { getWalletRecordDetail } from '@/apis/api'


export default defineComponent({
    name: 'depositResult',
    components: { HeaderBar, copyCon },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const couponStore = useMain();
        const { proxy } = getCurrentInstance() as any
        const data = reactive({
            successIcon: new URL('@/assets/images/detail/success-icon.png', import.meta.url).href,
            failIcon: new URL('@/assets/images/detail/fail-icon.png', import.meta.url).href,
            detail: {} as any,
            headerTitle: 'Deposit details',
            num: '' as any,
            type: '' as any
        })
        onBeforeMount(() => {
        })
        const getDetail = async () => {
            let res = await getWalletRecordDetail(data.num, data.type)
            if(res.data.code == 0){
                data.detail = res.data.model
            }else{
                proxy.$failToast(res.data.msg, 'failToast', 3000)
            }
        }
        onMounted(async () => {
            data.num=route.query.num
            data.type=route.query.type
            data.detail = couponStore.$state.orderDetail
            console.log('orderDetail',couponStore.$state.orderDetail)
            await getDetail()
        })
        onActivated(() => {
            data.detail = couponStore.$state.orderDetail
        })
        return {
            ...toRefs(data)
        };
    },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>