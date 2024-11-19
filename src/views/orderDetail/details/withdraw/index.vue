<template>
    <div class="detail-con">
        <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
        <div class="detail-box">
            <div class="detail-box-title">
                <img class="detail-box-icon" :src="successIcon" alt="" srcset="">
                <div class="num">
                    <div>- {{ detail.confirmedNum }} {{ detail.crypto }}</div>
                    <div v-if="detail.status == 'SUCCESS'" class="min-font">Success</div>
                    <div v-if="detail.status == 'FAIL'" class="min-font">Fail</div>
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
                    <div class="detail-box-li-left">Withdraw amount</div>
                    <div class="detail-box-li-right">
                        {{ detail.confirmedNum }} {{ detail.crypto }}
                    </div>
                </div>
                <div class="detail-box-li">
                    <div class="detail-box-li-left">Network fee</div>
                    <div class="detail-box-li-right">
                        {{ detail.networkFee }} {{ detail.crypto }}
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
import { defineComponent, ref,getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, onActivated, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import copyCon from '@/components/copy/index.vue'
import HeaderBar from '@/components/headerBar/index.vue'
import { useMain } from '@/store';
import { getWalletRecordDetail } from '@/apis/api'

export default defineComponent({
    name: 'withdrawResult',
    components: { HeaderBar, copyCon },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const couponStore = useMain();
        const { proxy } = getCurrentInstance() as any
        const data = reactive({
            successIcon: new URL('@/assets/images/detail/success-icon.png', import.meta.url).href,
            failIcon: new URL('@/assets/images/detail/fail-icon.png', import.meta.url).href,
            headerTitle: 'Withdraw details',
            detail:{} as any,
            num: '' as any,
            type: '' as any
        })
        const getDetail = async () => {
            let res = await getWalletRecordDetail(data.num, data.type)
            if(res.data.code == 0){
                data.detail = res.data.model
            }else{
                proxy.$failToast(res.data.msg, 'failToast', 3000)
            }
        }
        onBeforeMount(() => {
        })
        onMounted(() => {
            data.detail = couponStore.$state.orderDetail
            console.log('orderDetail', couponStore.$state.orderDetail)
        })
        onActivated(() => {
            data.detail = couponStore.$state.orderDetail
        })
        watchEffect(() => {
        })
        return {
            ...toRefs(data),
            getDetail
        };
    },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>