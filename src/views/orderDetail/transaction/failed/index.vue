<template>
    <div class="failed-box">
        <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
        <div class="failed-con">
            <img class="status-icon" src="@/assets/images/status/failed-icon.png" alt="" sizes="" srcset="">
            <div class="failed-title">
                <!-- 20,000 VND -->
                {{ detail.faitAmount }} {{ detail.fait }}
            </div>
            <div class="failed-text">Failed</div>
            <div class="failed-payment">
                <img class="info-circle" src="@/assets/images/status/info-circle.png" alt="" srcset="">
                <div class="failed-payment-content">
                    <div class="failed-payment-title">
                        Failed reason
                    </div>
                    <div class="failed-payment-text">
                        {{ detail.failReason }}
                        <!-- Your real deposit amount is under our limit (5 USD), please
                                check the announcement email and get the refund. -->
                    </div>
                </div>
            </div>
            <div class="failed-payment-con">
                    <div class="failed-payment-con-li">
                        <div class="failed-payment-con-li-title">OrderID</div>
                        <div class="failed-payment-con-li-text">
                            {{orderId}}
                            <copyCon :copyHtml="orderId"/>
                        </div>
                    </div>
                    <div class="failed-payment-con-li matop-24">
                        <div class="failed-payment-con-li-title">Payment time</div>
                        <div class="failed-payment-con-li-text">
                            {{ time }}
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, onActivated, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import copyCon from '@/components/copy/index.vue'
import { useMain } from '@/store';

export default defineComponent({
    name: 'trFailedResult',
    components: { HeaderBar, copyCon},
    setup() {
        const route = useRoute();
        const router = useRouter();
        const couponStore = useMain();
        const data = reactive({
            headerTitle:'Transaction details',
            headerLogo: new URL('@/assets/images/status/aeon-logo.png', import.meta.url).href,
            orderId:'661bbbc10cf7f20007e4ff48',
            total:'20,000',
            currency:'VND',
            time:'2024-04-14 18:19 (UTC+8)',
            detail: {} as any
        })
        onBeforeMount(() => {
        })
        onMounted(() => {
            data.detail = couponStore.$state.orderDetail
        })
        onActivated(() => {
            data.detail = couponStore.$state.orderDetail
        })
        watchEffect(() => {
        })
        return {
            ...toRefs(data)
        };
    },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>