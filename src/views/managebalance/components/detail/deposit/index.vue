<template>
  <div class="deposit-detail">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="deposit-detail-box">
      <div class="deposit-detail-qrCode">

      </div>
      <div class="deposit-detail-address">
        <div class="deposit-detail-address-title">Wallet address</div>
        <div class="deposit-detail-address-hash-box">
          <div class="deposit-detail-address-hash">{{ address }}</div>
          <copyCon :copyHtml="address" />
        </div>
      </div>
      <div class="deposit-detail-network">
        <div class="deposit-detail-network-title">
          Network
        </div>
        <div class="deposit-detail-network-con" @click="show = true">
          <div class="deposit-detail-network-con-left">
            <img class="currency-icon" src="@/assets/images/balance/currency-icon.png" alt="">
            <div class="deposit-detail-network-con-font">
              <div class="detail-currency-text">Ethereum</div>
              <div class="detail-network-text">ERC20</div>
            </div>
          </div>
          <img class="net-change-icon" src="@/assets/images/balance/net-change-icon.png" alt="" srcset="">
        </div>
        <div class="deposit-detail-network-tip">
          <img class="network-tip-icon" src="@/assets/images/balance/tip-icon.png" alt="" srcset="">
          <div class="network-tip-text">Sending coin or token other than USDT to this
            address may result in the loss of your deposit</div>
        </div>
      </div>
    </div>
    <div class="deposit-detail-btn" @click="backHome">
      Back Home
    </div>
    <van-action-sheet v-model:show="show">
      <!-- 自定义 header 插槽 -->
      <view slot="header">
        <div class="van-action-box-header">
          <div class="action-title-line"></div>
          <div>Select network</div>
          <img @click="show = false" class="back-icon" src="@/assets/images/balance/back-icon.png" alt="">
        </div>
      </view>
      <div class="network-list">
        <div @click="setNetwork(item, index)" :class="nowIndex == index ? 'network-li-set' : ''" class="network-list-li"
          v-for="(item, index) in networkList" :key="index">
          <div class="network-li-left">
            <img class="currency-img" :src="item.networkLogoUrl" alt="" srcset="">
            <div class="network-list-con">
              <div class="network-list-con-name">{{ item.chainType }}</div>
              <div class="network-list-con-time">{{ item.network }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class='action-btm'>
        <img class="tip-icon" src="@/assets/images/balance/tip-icon.png" alt="" srcset="">
        <div class="tip-con">
          When you recharge this currency, please only recharge through the supported networks below. If you recharge
          through other networks, funds will be lost.
        </div>
      </div>
    </van-action-sheet>
    <!-- <showModel ></showModel> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, getCurrentInstance, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import copyCon from '@/components/copy/index.vue'
import { useMain } from '@/store';
import showModel from '@/components/showModel/index.vue'
import { getAddress, getNetwork } from '@/apis/api'

export default defineComponent({
  name: 'depositDetail',
  components: { HeaderBar, copyCon, showModel },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const couponStore = useMain();
    const { proxy } = getCurrentInstance() as any
    const data = reactive({
      headerTitle: 'Deposit USDT',
      address: '',
      show: false,
      networkList: [] as any,
      nowIndex: 0,
      currency: '' as any,
      network: '' as any,
    })
    const infoMethods = {
      async findAddress(token: any, network: any) {
        let res = await getAddress(token, network)
        if (res.data.code == 0) {
          data.address = res.data.model
          data.nowIndex = 0
        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
        }
      },
      async findNetwork(token: any) {
        let res = await getNetwork(token)
        if (res.data.code == 0) {
          data.networkList = res.data.model
          data.nowIndex = 0
        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
        }
      },
      async setNetwork(network: any, index: number) {
        data.nowIndex = index
        data.network = network
        await infoMethods.findAddress(data.currency, data.network)
        data.show = false
      },
      backHome() {
        router.replace({ path: '/' })
      }
    }
    onBeforeMount(() => {
    })
    onMounted(async() => {
      console.log(couponStore.$state.deposit)
      let deposit = couponStore.$state.deposit
      if (route.query.currency) {
        data.headerTitle = 'Deposit ' + route.query.currency
        data.currency = route.query.currency
        data.network = route.query.network
        await infoMethods.findNetwork(data.currency)
        await infoMethods.findAddress(data.currency,data.network)
      } else {
        if (deposit) {
          data.headerTitle = 'Deposit ' + deposit
          data.currency = deposit.currency
          data.network = deposit.network
          await infoMethods.findNetwork(data.currency)
          await infoMethods.findAddress(data.currency,data.network)
        }
      }
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