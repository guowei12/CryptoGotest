<template>
    <div class="complete-box">
        <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
        <div class="complete-con">
            <img class="status-icon" src="@/assets/images/status/completed-icon.png" alt="" sizes="" srcset="">
            <div class="complete-title">{{ detail.paymentAmount }} {{ detail.paymentUnit }}</div>
            <div class="complete-text">Success</div>
            <div class="complete-payment">
                <div class="complete-payment-header">
                    <div class="complete-payment-header-title">Receiving account</div>
                    <div class="complete-payment-header-con">
                        <div class="complete-payment-header-left">
                            <img src="@/assets/images/status/momo-logo.png" alt="" srcset="">
                        </div>
                        <div class="complete-payment-header-li">
                            <div class="complete-payment-header-li-title">{{ detail.bankAccountName }}</div>
                            <div class="complete-payment-header-li-text">
                                <div>{{ detail.bankAccountNumber }}</div>
                                <div class="complete-li-text-line">MB Bank</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dashed-line"></div>
                <div class="complete-payment-con">
                    <div class="complete-payment-con-li">
                        <div class="complete-payment-con-li-title">OrderID</div>
                        <div class="complete-payment-con-li-text">
                            {{ detail.orderNo }}
                            <copyCon :copyHtml="detail.orderNo" />
                        </div>
                    </div>
                    <div class="complete-payment-con-li matop-24">
                        <div class="complete-payment-con-li-title">Total Payment</div>
                        <div class="complete-payment-con-li-text">
                            {{ detail.orderId }}{{ detail.currency }}
                        </div>
                    </div>
                    <div class="complete-payment-con-li matop-24">
                        <div class="complete-payment-con-li-title">Payment time</div>
                        <div class="complete-payment-con-li-text">
                            {{ detail.paymentTime }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, onActivated, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import copyCon from '@/components/copy/index.vue'
import { useMain } from '@/store';
import { getOrderDetail } from "@/apis/api"

export default defineComponent({
    name: 'trCompleteResult',
    components: { HeaderBar, copyCon },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const couponStore = useMain();
        const { proxy } = getCurrentInstance() as any
        const data = reactive({
            headerTitle: 'Transaction details',
            headerLogo: new URL('@/assets/images/status/aeon-logo.png', import.meta.url).href,
            orderId: '661bbbc10cf7f20007e4ff48',
            detail: {} as any,
            orderNo: '' as any
        })
        const getOrder = async () => {
            let res = await getOrderDetail(data.orderNo)
            if (res.data.code == 0) {
                data.detail = res.data.model
            } else {
                proxy.$failToast(res.data.msg, 'failToast', 3000)
            }
        }
        onBeforeMount(() => {
        })
        onMounted(async () => {
            let orderNo = route.query.orderNo
            if (orderNo) {
                data.orderNo = orderNo
                await getOrder()
            } else {
                data.detail = couponStore.$state.orderDetail
            }
        })
        onActivated(async () => {
            let orderNo = route.query.orderNo
            if (orderNo) {
                data.orderNo = orderNo
                await getOrder()
            } else {
                data.detail = couponStore.$state.orderDetail
            }
        })
        return {
            ...toRefs(data)
        };
    },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>