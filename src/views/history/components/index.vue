<template>
    <div class="history-ccontent">
        <div class="history-btn ">
            <n-tabs type="line" animated default-value="Deposits" justify-content="space-between"
                :on-update:value="changeTab">
                <n-tab name="Deposits">
                    <div class="tab-header">
                        <div class="tab-header-text">Deposits</div>
                    </div>
                </n-tab>
                <n-tab name="Withdrawals">
                    <div class="tab-header">
                        <div class="tab-header-text">Withdrawals</div>
                    </div>
                </n-tab>
            </n-tabs>
        </div>
        <div class="QRPay-list">
            <div class="QRPay-list-li" v-for="(item, index) in transactionList" :key="index" @click="goDetail(item)">
                <div class="QRPay-list-li-left">
                    <img v-if="item.status == 'Completed'" class="shopping-img"
                        :src="img1" alt="" srcset="">
                    <img v-else class="shopping-img" :src="img2" alt="" srcset="">
                    <div class="QRPay-list-con">
                        <div class="QRPay-list-con-name">{{ item.name }}</div>
                        <div class="QRPay-list-con-time">{{ item.time }}</div>
                    </div>
                </div>
                <div class="QRPay-list-right">
                    <div class="QRPay-list-con-num">{{ item.number }} {{ item.currency }}</div>
                    <div class="QRPay-list-con-status">
                        <div class="completed-color" v-if="item.status == 'Completed'">Completed</div>
                        <div class="failed-color" v-if="item.status == 'Failed'">Failed</div>
                        <div class="Refund-color" v-if="item.status == 'Refund'">Refund</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import { NTabs, NTab } from 'naive-ui'

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
    setup() {
        const route = useRoute();
        const router = useRouter();
        const data = reactive({
            img1:new URL('@/assets/images/balance/arrow-retract-icon.png', import.meta.url).href,
            img2:new URL('@/assets/images/balance/arrow-down-icon.png', import.meta.url).href,
            transactionList: [
                {
                    name: 'Mountain island coffee',
                    time: '2023-02-06 01:56:45',
                    status: 'Completed',
                    number: '-20,000',
                    currency: 'VND'
                },
                {
                    name: 'Mountain island coffee',
                    time: '2023-02-06 01:56:45',
                    status: 'Refund',
                    number: '-20,000',
                    currency: 'VND'
                },
                {
                    name: 'Mountain island coffee',
                    time: '2023-02-06 01:56:45',
                    status: 'Failed',
                    number: '-20,000',
                    currency: 'VND'
                }
            ],
        })
        const activeTab = ref();
        activeTab.value = 'Deposits';
        const changeTab = (tab: string | number) => {
            activeTab.value = tab;
        };
        const goDetail=()=>{
            router.push({
                path:'/refund',
                query:{
                    no:'1111'
                }
            })
        }
        onBeforeMount(() => {
            //console.log('2.组件挂载页面之前执行----onBeforeMount')
        })
        onMounted(() => {
            //console.log('3.-组件挂载到页面之后执行-------onMounted')
        })
        watchEffect(() => {
        })
        return {
            ...toRefs(data),
            activeTab,
            changeTab,
            goDetail
        };
    },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>