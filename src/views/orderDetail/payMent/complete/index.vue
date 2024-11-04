<template>
    <div class="complete-box">
        <HeaderBar :logo="headerLogo" :headerLanguage="true"></HeaderBar>
        <div class="complete-con">
            <img class="status-icon" src="@/assets/images/status/completed-icon.png" alt="" sizes="" srcset="">
            <div class="complete-title">20,000 VND</div>
            <div class="complete-text">Order Completed
            </div>
            <div class="complete-payment">
                <div class="complete-payment-header">
                    <div class="complete-payment-header-title">Receiving account</div>
                    <div class="complete-payment-header-con">
                        <div class="complete-payment-header-left">
                            <img src="@/assets/images/status/momo-logo.png" alt="" srcset="">
                        </div>
                        <div class="complete-payment-header-li">
                                <div class="complete-payment-header-li-title">NGUYEN VANA</div>
                                <div class="complete-payment-header-li-text">
                                    <div>9019948815</div>
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
                            {{orderId}}
                            <copyCon :copyHtml="orderId"/>
                        </div>
                    </div>
                    <div class="complete-payment-con-li matop-24">
                        <div class="complete-payment-con-li-title">Total Payment</div>
                        <div class="complete-payment-con-li-text">
                            {{ orderId }}{{ currency }}
                        </div>
                    </div>
                    <div class="complete-payment-con-li matop-24">
                        <div class="complete-payment-con-li-title">Payment time</div>
                        <div class="complete-payment-con-li-text">
                            {{ time }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="complete-btn">
            <div class="complete-btn-box">
                <img class="complete-btn-icon" src="@/assets/images/status/save-icon.png" alt="" srcset="">
                <div>Save</div>
            </div>
            <div class="complete-btn-box">
                <img class="complete-btn-icon" src="@/assets/images/status/home-icon.png" alt="" srcset="">
                <div>Back home</div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import copyCon from '@/components/copy/index.vue'

export default defineComponent({
    name: 'completeResult',
    components: { HeaderBar, copyCon},
    setup() {
        const route = useRoute();
        const router = useRouter();
        const data = reactive({
            headerLogo: new URL('@/assets/images/status/aeon-logo.png', import.meta.url).href,
            orderId:'661bbbc10cf7f20007e4ff48',
            total:'20,000',
            currency:'VND',
            time:'2024-04-14 18:19 (UTC+8)'
        })
        onBeforeMount(() => {
        })
        onMounted(() => {
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