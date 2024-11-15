<template>
    <div class="history-ccontent">
        <div class="history-btn ">
            <n-tabs type="line" animated default-value="DEPOSIT" justify-content="space-between"
                :on-update:value="changeTab">
                <n-tab name="DEPOSIT">
                    <div class="tab-header">
                        <div class="tab-header-text">Deposits</div>
                    </div>
                </n-tab>
                <n-tab name="WITHDRAW">
                    <div class="tab-header">
                        <div class="tab-header-text">Withdrawals</div>
                    </div>
                </n-tab>
            </n-tabs>
        </div>
        <van-pull-refresh :pulling-text="loadingText" :loosing-text="loadingText" :loading-text="loadingText"
            v-model="refLoading" @refresh="onRefresh">
            <van-list class="QRPay-list" v-show="transactionList?.length > 0" v-model:loading="dataLoading"
                :finished="finished" finished-text="no data" @load="onRefresh">
                <div class="QRPay-list-li" v-for="(item, index) in transactionList" :key="index"
                    @click="goDetail(item)">
                    <div class="QRPay-list-li-left">
                        <img v-if="activeTab == 'DEPOSIT'" class="shopping-img" :src="img2" alt="" srcset="">
                        <img v-else-if="activeTab == 'DEPOSIT' && item.type == 2" class="shopping-img" :src="img2"
                            alt="" srcset="">
                        <img v-else class="shopping-img" :src="img3" alt="" srcset="">
                        <div class="QRPay-list-con">
                            <div class="QRPay-list-con-name">{{ item.crypto }}</div>
                            <div class="QRPay-list-con-time">{{ item.createTime }}</div>
                        </div>
                    </div>
                    <div class="QRPay-list-right">
                        <div class="QRPay-list-con-num"> {{ activeTab == "DEPOSIT" ? "+" : "-"}} {{ item.confirmedNum }} </div>
                        <div class="QRPay-list-con-status">
                            <div class="completed-color" v-if="item.type !='REFUND'&&item.status == 'SUCCESS'">Completed</div>
                            <div class="failed-color" v-if="item.type !='REFUND'&&item.status == 'FAIL'">Failed</div>
                            <div class="Refund-color" v-if="item.type =='REFUND' && item.status == 'SUCCESS'">Refund</div>
                        </div>
                    </div>
                </div>
            </van-list>
            <div class="no-data" v-if="transactionList.length == 0">
                <img class="no-data-img" src="@/assets/images/balance/no-data-icon.png" alt="" srcset="">
                <div class="no-data-title">You haven't topped up yet</div>
                <div class="no-data-text">Please complete the first top-up to activate the card</div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect, onDeactivated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import { NTabs, NTab } from 'naive-ui'
import { getHistory } from '@/apis/api'
import { useMain } from '@/store';

export default defineComponent({
    name: '',
    props: {
        type: {
            type: [Number, String],
            required: false,
        },
        currency: {
            type: [Number, String],
            required: false,
        },
    },
    components: { HeaderBar, NTabs, NTab },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const finished = ref(false);
        const { proxy } = getCurrentInstance() as any
        const couponStore = useMain();

        const data = reactive({
            refLoading: false,
            loadingText: '...',
            img1: new URL('@/assets/images/balance/arrow-retract-icon.png', import.meta.url).href,
            img2: new URL('@/assets/images/balance/arrow-down-icon.png', import.meta.url).href,
            img3: new URL('@/assets/images/balance/arrow-up-icon.png', import.meta.url).href,
            transactionList: [] as any,
            pageNo: 0,
            pageSize: 10,
            dataLoading: false,
            lastPage: false
        })
        const activeTab = ref();
        activeTab.value = 'DEPOSIT';
        const changeTab = async (tab: string | number) => {
            activeTab.value = tab;
            await onRefresh()
        };
        const goDetail = (obj: any) => {
            if (activeTab.value == 'DEPOSIT') {
                couponStore.SET_ORDERDETAIL(obj)
                console.log(couponStore.$state.orderDetail)
                router.push({
                    path: '/deposit',
                    query:{
                        id:obj.id,
                        type:"DEPOSIT"
                    }
                })
            } else if (activeTab.value == 'WITHDRAW') {
                couponStore.SET_ORDERDETAIL(obj)
                router.push({
                    path: '/withdraw',
                    query:{
                        id:obj.id,
                        type:"WITHDRAW"
                    }
                })
            }

        }
        const onHistory = async () => {
            let res = await getHistory(data.pageNo, data.pageSize, props.type)
            if (res.data.code == 0) {
                if (res.data.model.data && res.data.model.data.length > 0) {
                    data.transactionList = res.data.model.data
                    data.transactionList.forEach((item: { createTime: any; }) => {
                        item.createTime = proxy.$moment(item.createTime).local().format('YYYY-MM-DD HH:mm:ss')
                        item.UTCTime = proxy.$moment.utc(item.createTime).local().format('YYYY-MM-DD HH:mm:ss')
                    })
                } else {
                    data.transactionList = []
                }
                // console.log(data.transactionList)
                // 加载状态结束
                data.dataLoading = false
                data.refLoading = false
                // 数据全部加载完成
                if (data.lastPage && res.data.model.sumPage == res.data.model.pageNo) {
                    finished.value = true;
                }

            } else {
                data.dataLoading = false
                data.refLoading = false
                finished.value = true;
            }
        }
        const onRefresh = async () => {
            data.refLoading = true
            data.pageNo = 0
            data.pageSize = 1
            data.refLoading = false
            onHistory()
        }
        onBeforeMount(() => {
            couponStore.SET_ORDERDETAIL({})
        })
        onMounted(async () => {
            activeTab.value = 'DEPOSIT';
            // console.log(props.currency)
            await onRefresh()
        })
        watchEffect(() => {
        })
        return {
            ...toRefs(data),
            finished,
            activeTab,
            changeTab,
            goDetail,
            onHistory,
            onRefresh
        };
    },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>