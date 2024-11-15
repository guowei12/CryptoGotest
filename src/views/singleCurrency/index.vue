<template>
  <div class="managebalance-box">
    <HeaderBar :title="headerTitle" :currency="currencyImg" :defaultH="true"></HeaderBar>
    <div class="QRPay-con">
      <div class="QRPay-balance">
        <!-- <div class="QRPay-balance-title">AEON balance <img class="QRPay-balance-title-img" src="@/assets/images/home/see-icon.png" alt=""></div> -->
        <div class="QRPay-balance-number">{{ userBalances.faitIcon }}{{ userBalances.balances }}</div>
        <div class="QRPay-balance-number-text">{{ userBalances.faitAmount }} {{ userBalances.name }}</div>
      </div>
      <div class="balance-btn-box">
        <div class="balance-btn-df" @click="goUrl('depositDetail')">
          <img class="balance-btn-img" src="@/assets/images/balance/import.png" alt="" srcset="">
          <div>DEPOSIT</div>
        </div>
        <div class="balance-btn-df" @click="goUrl('withdrawDetail')">
          <img class="balance-btn-img" src="@/assets/images/balance/import.png" alt="" srcset="">
          <div>WITHDRAW</div>
        </div>

      </div>
      <tranList class="tranList" :type="tran.type" :currency="tran.currency"></tranList>

      <!-- <div class="QRPay-list" >
        <div class="QRPay-list-li" v-for="(item, index) in assetsList" :key="index">
          <div class="QRPay-list-li-left">
          <img  class="currency-img" :src="item.img" alt="" srcset="">
          <div class="QRPay-list-con">
            <div class="QRPay-list-con-name">{{ item.name }}</div>
            <div class="QRPay-list-con-time">{{ item.network}}</div>
          </div>
          </div>
          <div class="QRPay-list-right">
            <div class="QRPay-list-con-num">${{ item.balance }}</div>
            <div class="QRPay-list-con-status">
              {{ item.number }} {{ item.currency }}
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import { useMain } from '@/store';
import tranList from '@/views/history/components/index.vue'
import { getBalances } from '@/apis/api'

export default defineComponent({
  name: 'singleCurrency',
  components: { HeaderBar, tranList },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const couponStore = useMain();
    const { proxy } = getCurrentInstance() as any
    const data = reactive({
      tran: {
        type: 'DEPOSIT',
        currency: 'USDT'
      },
      headerTitle: "USDT" as any,
      faitCurrency: "USDT" as any,
      currencyImg: new URL('@/assets/images/home/BTC-icon.png', import.meta.url).href,
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
        balances: 0,
        faitAmount: '0',
        name: 'USDT'
      } as any,
    })
    const infoMethods = {
      async onBalances() {
        let currency = localStorage.getItem('currency') || 'USD'
        let res = await getBalances(currency)
        if (res.data.code == 0) {
          let model = res.data.model
          let list = model?.tropertyList.length > 0 ? model.tropertyList : []
          list.forEach((item: { number: any, faitAmount: any, name: any; }) => {
            if (item.name == data.faitCurrency) {
              data.userBalances = {
                faitIcon: model.faitIcon,
                balances: item.number,
                faitAmount: item.faitAmount,
                name: item.name
              }
            }
          })

        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
        }
      },
      goUrl(url: any) {
        router.push({
          path: '/' + url, query: {
            currency: data.faitCurrency
          }
        })
      }
    }
    onBeforeMount(() => {
      couponStore.SET_WITHDRAW({})
      couponStore.SET_DEPOSIT({})
    })
    onMounted(async () => {
      data.faitCurrency = route.query.currency
      data.currencyImg=couponStore.$state.singleCurrency.logoUrl
      data.headerTitle = route.query.currency
      await infoMethods.onBalances()
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