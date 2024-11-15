<template>
    <div class="failed-box">
        <HeaderBar :logo="headerLogo" :headerLanguage="true"></HeaderBar>
        <div class="failed-con">
            <img class="status-icon" src="@/assets/images/status/failed-icon.png" alt="" sizes="" srcset="">
            <div class="failed-title">The payment failed</div>
            <div class="failed-payment">
                <img class="info-circle" src="@/assets/images/status/info-circle.png" alt="" srcset="">
                <div class="failed-payment-content">
                    <div class="failed-payment-title">
                        Failed reason
                    </div>
                    <div class="failed-payment-text">
                        Your real deposit amount is under our limit (5 USD), please
                        check the announcement email and get the refund.
                    </div>
                </div>
            </div>
        </div>
        <div class="failed-btn">
            <div class="failed-btn-box" @click="backHome">
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

export default defineComponent({
    name: 'failedResult',
    components: { HeaderBar, copyCon },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const { proxy } = getCurrentInstance() as any
        const data = reactive({
            headerLogo: new URL('@/assets/images/status/aeon-logo.png', import.meta.url).href,
            orderId: '661bbbc10cf7f20007e4ff48',
            total: '20,000',
            currency: 'VND',
            time: '2024-04-14 18:19 (UTC+8)',
            orderNo: '' as any,
            orderDetail: {} as any
        })
        onBeforeMount(() => {
        })
        onMounted( async () => {
            data.orderNo = route.query.orderNo
            await getOrder()
        })
        const getOrder = async () => {
            let res = await getOrderDetail(data.orderNo)
            if (res.data.code == 0) {
                data.orderDetail = res.data.model
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