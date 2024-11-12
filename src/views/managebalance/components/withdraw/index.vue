<template>
  <div class="deposit-box">
    <HeaderBar :title="headerTitle" :balance="true"></HeaderBar>
    <div class="deposit-con">
      <div class="deposit-list">
        <div @click="setWithdraw(item, index)" :class="nowIndex == index ? 'deposit-list-li-set' : ''"
          class="deposit-list-li" v-for="(item, index) in withdrawList" :key="index">
          <div class="deposit-list-li-left">
            <img class="currency-img" :src="item.cryptoLogoUrl" alt="" srcset="">
            <div class="deposit-list-con">
              <div class="deposit-list-con-name">{{ item.crypto }}</div>
              <div class="deposit-list-con-time">{{ item.cryptoFullName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import { useMain } from '@/store';
import { getTokens, getNetwork} from '@/apis/api'

export default defineComponent({
  name: 'withdraw',
  components: { HeaderBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const couponStore = useMain();
    const { proxy } = getCurrentInstance() as any

    const data = reactive({
      headerTitle: 'Withdraw',
      withdrawList: [] as any,
      networkList: [] as any,
      nowIndex: 0,
      currency:'' as any
    })
    const infoMethods = {
      async setWithdraw(itx: any, idx: any) {
        data.nowIndex = idx
        data.currency = itx.crypto
        await infoMethods.findNetwork(itx.crypto)
        couponStore.SET_WITHDRAW({
          networkList: data.networkList,
          network: '',
          currency: data.currency,
          url:itx.cryptoLogoUrl,
          address: ''
        })
        router.push({
          path: '/withdrawDetail', query: {
            currency: data.currency,
            url:itx.cryptoLogoUrl
          }
        })
      },
      async findNetwork(token: any) {
        let res = await getNetwork(token)
        if (res.data.code == 0) {
          data.networkList = res.data.model
        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
        }
      },
      async getList() {
        let res = await getTokens()
        if (res.data.code == 0) {
          data.withdrawList = res.data.model
        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
        }
      }
    }
    onBeforeMount(() => {
    })
    onMounted(async () => {
      await infoMethods.getList()
      console.log(couponStore.$state.withdraw)
    })
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      ...infoMethods
    };
  },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>