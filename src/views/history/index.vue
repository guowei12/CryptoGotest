<template>
    <div class="history-box">
        <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
        <tranList class="tranList" :type="tranList.type" :currency="tranList.currency"></tranList>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import tranList from './components/index.vue'

export default defineComponent({
    name: '',
    components: { HeaderBar,tranList },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const data = reactive({
            headerTitle: 'History',
            tranList:{
                type:'Deposit',
                currency:'USDT'
            },
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
            changeTab
        };
    },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>