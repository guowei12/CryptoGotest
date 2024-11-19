<template>
  <div class="managebalance-box">
    <HeaderBar :title="headerTitle" :balance="true"></HeaderBar>
    <div class="QRPay-con">
      <div class="QRPay-balance">
        <div class="QRPay-balance-title">AEON balance <img class="QRPay-balance-title-img"
            src="@/assets/images/home/see-icon.png" alt=""></div>
        <div class="QRPay-balance-number">{{ userBalances.faitIcon }}{{ userBalances.balances }}</div>
      </div>
      <div class="balance-btn-box">
        <div class="balance-btn-df" @click="goUrl('depositDetail')">
          <img class="balance-btn-img" src="@/assets/images/balance/import.png" alt="" srcset="">
          <div>Deposit</div>
        </div>
        <div class="balance-btn-df" @click="goUrl('withdrawDetail')">
          <img class="balance-btn-img" src="@/assets/images/balance/import.png" alt="" srcset="">
          <div>Withdraw</div>
        </div>

      </div>
      <div class="QRPay-list" v-if="userBalances?.tropertyList">
        <div class="QRPay-list-li" v-for="(item, index) in userBalances.tropertyList" :key="index" @click="goCurrency(item.name,item.logoUrl)">
          <div class="QRPay-list-li-left">
            <img class="currency-img" :src="item.logoUrl" alt="" srcset="">
            <div class="QRPay-list-con">
              <div class="QRPay-list-con-name">{{ item.name }}</div>
              <div class="QRPay-list-con-time">{{ item.fullName }}</div>
            </div>
          </div>
          <div class="QRPay-list-right">
            <div class="QRPay-list-con-num">${{ item.number }}</div>
            <div class="QRPay-list-con-status">
              {{ item.faitAmount }} {{ item.name }}
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
import { useMain } from '@/store';
import { getTokenInfo, initWattle, getTransHistory, getBalances } from '@/apis/api'
export default defineComponent({
  name: '',
  components: { HeaderBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const couponStore = useMain();
    const { proxy } = getCurrentInstance() as any
    const data = reactive({
      headerTitle: "Manage balance",
      assetsList: [
        {
          img: new URL('@/assets/images/home/BTC-icon.png', import.meta.url).href,
          network: 'Bitcoin',
          name: 'BTC',
          balance: '1191.71',
          number: '0.0185',
          currency: 'VND'
        },
        {
          img: new URL('@/assets/images/home/BTC-icon.png', import.meta.url).href,
          network: 'Bitcoin',
          name: 'BTC',
          balance: '1191.71',
          number: '0.0185',
          currency: 'VND'
        },
      ],
      userBalances: {
        faitIcon: '$',
        balances: '0',
        tropertyList: []
      } as any,
      faitCurrency:'' as any
    })
    const infoMethods = {
      async onBalances() {
        let currency= localStorage.getItem('currency')||'USD'
        let res = await getBalances(currency)
        if (res.data.code == 0) {
          data.userBalances = res.data.model
        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
        }
      },
      goUrl(url: any) {
        router.push({ path: '/' + url })
      },
      goCurrency(currency: any,logoUrl: any) {
        couponStore.SET_SINGLECURRENCY({
          currency:currency,
          logoUrl:logoUrl
        })
        router.push({ path: '/siCurrency', query: { currency: currency } })
      },
    }
    onBeforeMount(() => {
      couponStore.SET_WITHDRAW({})
      couponStore.SET_DEPOSIT({})
      couponStore.SET_SINGLECURRENCY({})
    })
    onMounted(() => {
      infoMethods.onBalances()
    })
    onActivated(() => {
      infoMethods.onBalances()
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