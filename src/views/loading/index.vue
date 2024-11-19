<template>
    <div class="loading-box">
        <headerBar :logo='headerLogo' :previousShow="true" @onBack="goHome" :headerLogo="true"></headerBar>
        <div class="ani-box">
            <LottieAni :src="lottieData" class="lottie-box" />
        </div>
        <div class="loading-con">
            <div class="loading-title">Convert Successful!</div>
            <div class="loading-text">The VND has been converted successfully and is being transferred to the merchant.
            </div>
            <div class="loading-progress">
                <div class="loading-progress-loader">
                    <div class="progress" id="progress"></div>
                </div>
                <div class="loading-progress-color">Sending fiat to merchant...</div>
                <div class="loading-progress-con">
                    <img class="loading-tiem-icon" src="@/assets/images/status/tiem-icon.png" alt="" srcset="" />
                    <div class="loading-progress-con-text">This process may take a few minutes due to network conditions
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, nextTick, toRefs, onBeforeMount, onMounted, onDeactivated, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import headerBar from '@/components/headerBar/index.vue'
import LottieAni from "@/components/lottie-web/index.vue";
import lottieData from '@/assets/js/aircraft.json';
import { getOrderDetail } from "@/apis/api"
export default defineComponent({
    name: 'Loading',
    components: { headerBar, LottieAni },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const data = reactive({
            headerLogo: new URL('@/assets/images/qr/aeon-logo.png', import.meta.url).href,
            headerTitle: '',
            orderNo: '' as any,
            orderDetail: {} as any,
            statusList: ['COMPLETED', 'FAILED', 'TIMEOUT', 'CLOSE'],
            timer: null as any
        })
        const onLoading = () => {
            const progressBar = document.getElementById('progress') as any;
            // 模拟加载完成后的状态
            nextTick(() => {
                setTimeout(() => {
                    // 加载完成后停止进度
                    progressBar.style.width = '98%';
                    // 添加闪烁效果
                    progressBar.classList.add('flash');
                }, 10000); // 2秒后加载完成
            })

        }
        const goUrl = (status: any) => {
            switch (status) {
                case 'COMPLETED':
                    setTimeout(() => {
                        router.replace({ path: '/complete', query: { orderNo: data.orderNo } })
                    }, 2000)
                    break;
                case 'FAILED':
                    setTimeout(() => {
                        router.replace({ path: '/failed', query: { orderNo: data.orderNo } })
                    }, 2000)
                    break;
                default:
                    router.replace({ path: '/timeOut', query: { orderNo: data.orderNo } })
                    break;
            }
        }
        const getOrder = async () => {
            let res = await getOrderDetail(data.orderNo)
            if (res.data.code == 0) {
                data.orderDetail = res.data.model
                if (data.orderDetail && data.orderDetail.status) {
                    if (data.statusList.includes(data.orderDetail.status)) {
                        goUrl(data.orderDetail.status)
                    }
                }
            } else {

            }
        }
        const goHome =(data: { cancel: any; })=>{
            if(data.cancel){
                router.push({path:'/'})
            }
        }
        onBeforeMount(() => {
            clearInterval(data.timer);
        })
        onMounted(async () => {
            onLoading()
            data.orderNo = route.query.orderNo|| route.query.orderNum
            await getOrder()
            data.timer = setInterval(() => {
                getOrder()
            }, 6000);
        })
        onDeactivated(() => {
            if (data.timer) {
                clearInterval(data.timer);
            }
        });
        watch(
            () => data.orderDetail?.status,
            (newVal) => {
                if (
                    data.orderDetail?.status == "SUCCESS" ||
                    data.orderDetail?.status == "TIMEOUT" ||
                    data.orderDetail?.status == "FAIL" ||
                    data.orderDetail?.status == "CLOSE"
                ) {
                    // console.log(newVal)
                    nextTick(() => {
                        clearInterval(data.timer);
                    });
                }
            }
        )
        return {
            ...toRefs(data),
            lottieData,
            onLoading,
            getOrder,
            goUrl,
            goHome
        };
    },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>