<template>
    <div class="detail-withdraw-content">
        <!-- result -->
        <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
        <div class="withdraw-result">
            <!-- withdraw successful! -->
            <div class="withdraw-schedule" v-if="orderDetail?.status == 'COMPLETED'">
                <div class="withdraw-top">
                    <img src="@/assets/images/status/withdraw-successful-top.png" alt="" srcset="" />
                </div>
                <div class="withdraw-center">
                    <img class="confirmedCenter" src="@/assets/images/status/withdraw-confirmed-success.png" alt=""
                        srcset="" />
                    <div class="completed-font">withdraw confirmed</div>
                </div>
                <div class="withdraw-center">
                    <img class="confirmedCenter" src="@/assets/images/status/withdraw-confirmed-success.png" alt=""
                        srcset="" />
                    <div class="completed-font">withdraw completed</div>
                </div>
            </div>
            <!-- withdraw in progress... -->
            <div class="withdraw-schedule" v-else>
                <div class="withdraw-top">
                    <img class="progress-img" src="@/assets/images/status/withdraw-progress-top.png" alt="" srcset="" />
                </div>
                <div class="withdraw-center">
                    <img class="confirmedCenter" src="@/assets/images/status/withdraw-confirmed-success.png" alt=""
                        srcset="" />
                    <div class="completed-font">withdraw confirmed</div>
                </div>
                <div class="withdraw-center">
                    <img class="confirmedLoading rotating-image"
                        src="@/assets/images/status/withdraw-confirmed-loading.png" alt="" srcset="" />
                    <div class="completed-font">withdraw completed</div>
                </div>
            </div>
            <div class="withdraw-list">
                <div class="withdraw-li">
                    <div class="withdraw-li-title">withdraw amount</div>
                    <div class="withdraw-li-txt">
                        <!-- <img v-if="cryptoLogoUrl" class="withdraw-li-img" :src="cryptoLogoUrl" alt="" srcset="" /> -->
                        <img v-if="detail?.cryptoCurrency" class="withdraw-li-img"
                            :src="'https://static.alchemypay.org/alchemypay/crypto-images/' + detail.cryptoCurrency + '.png'"
                            alt="" srcset="">
                        <img v-else class="withdraw-li-img"
                            :src="'https://static.alchemypay.org/alchemypay/crypto-images/' + payDetail?.cryptoCurrency + '.png'"
                            alt="" srcset="">
                        {{ detail?.cryptoAmount ? detail?.cryptoAmount : payDetail?.cryptoAmount }} {{
                            detail?.cryptoCurrency ? detail?.cryptoCurrency : payDetail?.cryptoCurrency }}
                    </div>
                </div>
                <div class="withdraw-li" v-if="detail?.network">
                    <div class="withdraw-li-title">Network</div>
                    <div class="withdraw-li-txt">{{ detail?.network }} </div>
                </div>
            </div>
            <!-- Hash -->
            <div class="detail-result-con" v-if="detail?.hashId">
                <div class="detail-result-con-title">
                    Hash
                </div>
                <div class="detail-result-con-tx">
                    <div class="detail-result-con-tx-nu">{{ detail.hashId }}</div>
                    <copyCon :copyHtml="detail?.hashId" />
                </div>
            </div>
        </div>
        <div class="withdraw-btn" @click="backHome">
            <div class="withdraw-btn-box">
                <div>Back home</div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, nextTick, getCurrentInstance, reactive, toRefs, onBeforeMount, watch, onMounted, onDeactivated, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
// import { useMain } from '../../../../../../src/store';
// import getUrlData from '@/util/common'
import copyCon from '@/components/copy/index.vue'
import { getWalletRecordDetail } from '@/apis/api'
export default defineComponent({
    name: 'paywithdraw',
    components: { HeaderBar, copyCon },
    props: {

    },
    setup(props) {
        // const couponStore = useMain();
        const route = useRoute();
        const router = useRouter();
        const { proxy } = getCurrentInstance() as any
        const data = reactive({
            num: '' as any,
            detail: '' as any,
            orderDetail: '' as any,
            payDetail: null as any,
            headerTitle: 'Withdraw',
            timer: null as any
        })
        onBeforeMount(() => {
            clearInterval(data.timer);
        })
        onMounted(async () => {
            data.num = route.query.orderNo
            await getDetail()
            data.timer = setInterval(() => {
                getDetail();
            }, 6000);
        })
        onDeactivated(() => {
            if (data.timer) {
                clearInterval(data.timer);
            }
        });
        const getDetail = async () => {
            let res = await getWalletRecordDetail(data.num, 'WITHDRAW')
            if (res.data.code == 1) {
                data.orderDetail = res.data.code
            } else {
                proxy.$failToast(res.data.msg, 'failToast', 3000)
                return
            }
        }
        const stopTimer = () => {
            clearInterval(data.timer);
        };
        const backHome = () => {
            router.replace({ path: '/' })
        }
        watch(
            () => data.orderDetail?.status,
            (newVal) => {
                if (
                    data.orderDetail?.status == "COMPLETED" ||
                    data.orderDetail?.status == "TIMEOUT" ||
                    data.orderDetail?.status == "DELAY_FAILED" ||
                    data.orderDetail?.status == "DELAY_SUCCESS" ||
                    data.orderDetail?.status == "CLOSE" ||
                    data.orderDetail?.status == "ORDER_EXCEPTION"
                ) {
                    nextTick(() => {
                        stopTimer();
                    });
                }
            },
            { deep: false, immediate: true }
        );
        return {
            ...toRefs(data),
            ...props,
            backHome,
            stopTimer,
            getDetail
        };
    },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>