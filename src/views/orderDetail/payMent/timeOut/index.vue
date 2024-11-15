<template>
    <div class="timeOut-box">
        <HeaderBar :logo="headerLogo" :headerLanguage="true"></HeaderBar>
        <div class="timeOut-list">
            <div class="timeOut-li">
                <div class="timeOut-li-title">Order NO.</div>
                <div class="timeOut-li-text">
                    {{ detail.orderNo }}
                </div>
            </div>
            <div class="timeOut-li line-t">
                <div class="timeOut-li-title">Order amount</div>
                <div class="timeOut-li-text">
                    <!-- 20,000 VND -->
                    {{ detail.total }} {{ detail.orderCurrency }}
                </div>
            </div>
            <div class="timeOut-li">
                <div class="timeOut-li-title">You need to pay</div>
                <div class="timeOut-li-text">
                    <img class="crypto-icon"
                        :src="'https://static.alchemypay.org/alchemypay/crypto-images/' + detail.currency + '.png'"
                        alt="">
                    <div class="timeOut-li-text-font">
                        {{ detail.number }} {{ detail.currency }}
                    </div>
                    <copyCon :copyHtml="detail.number" />
                </div>
            </div>
        </div>
        <div class="timeOut-con">
            <img class="status-icon" src="@/assets/images/detail/timeOut-icon.png" alt="" sizes="" srcset="">
            <div class="timeOut-title">Order Time Out</div>
            <div class="timeOut-con-text">If there is a valid payment later, it will be refunded to your wallet account.
            </div>
            <!-- <div class="timeOut-payment">
                <img class="info-circle" src="@/assets/images/status/info-circle.png" alt="" srcset="">
                <div class="timeOut-payment-content">
                    <div class="timeOut-payment-title">
                        fail reason
                    </div>
                    <div class="timeOut-payment-text">
                        Your real deposit amount is under our limit (5 USD), please
                        check the announcement email and get the refund.
                    </div>
                </div>
            </div> -->
        </div>
        <div class="timeOut-btn">
            <div class="timeOut-btn-box" @click="backHome">
                <div>Back home</div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import copyCon from '@/components/copy/index.vue'
import { getOrderDetail } from "@/apis/api"
import { useMain } from '@/store';

export default defineComponent({
    name: 'timeOutResult',
    components: { HeaderBar, copyCon },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const { proxy } = getCurrentInstance() as any
        const couponStore = useMain();

        const data = reactive({
            headerLogo: new URL('@/assets/images/status/aeon-logo.png', import.meta.url).href,
            orderId: '661bbbc10cf7f20007e4ff48',
            total: '20,000',
            currency: 'VND',
            time: '2024-04-14 18:19 (UTC+8)',
            detail: {
                orderNo: '76782112321321047696',
                total: '20,000',
                orderCurrency: 'VND',
                number: 0.263,
                currency: 'ETH',
            } as any,
            orderNo: '' as any
        })
        onBeforeMount(() => {
        })
        onMounted(async () => {
            data.detail = couponStore.$state.orderDetail
            if (data.detail) {
            } else {
                data.orderNo = route.query.orderNo
                await getOrder()
            }
        })
        const getOrder = async () => {
            let res = await getOrderDetail(data.orderNo)
            if (res.data.code == 0) {
                data.detail = res.data.model
            } else {
                proxy.$failToast(res.data.msg, 'failToast', 3000)
            }
        }
        watchEffect(() => {
        })
        const backHome = () => {
            router.replace({
                path: '/'
            })
        }
        return {
            ...toRefs(data),
            backHome
        };
    },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>