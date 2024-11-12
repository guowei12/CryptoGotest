<template>
  <div class="withdraw-detail">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="withdraw-detail-box">
      <div class="withdraw-detail-con">
        <div class="withdraw-detail-con-li">
          <div class="withdraw-detail-con-title">Transfer network</div>
          <div class="withdraw-detail-con-text" @click="networkShow = !networkShow">
            <div v-if="nowNetwork" class="network-list-li">
              <div class="network-li-left">
                <img class="currency-img" :src="nowUrl" alt="" srcset="">
                <div class="network-list-con">
                  <div class="network-list-con-name">{{ nowChainType }}</div>
                  <div class="network-list-con-time">{{ nowNetwork }}</div>
                </div>
              </div>

            </div>
            <div v-else>Select Network</div>
            <img :class="networkShow ? 'arrow-btm-set' : 'arrow-btm'" src="@/assets/images/balance/arrow-btm.png"
              alt="">
          </div>
        </div>
        <div class="withdraw-detail-con-li">
          <div class="withdraw-detail-con-title">Wallet address</div>
          <div class="withdraw-detail-con-text">
            <textarea @input="FormValidation('address', 'input')" @focus="FormValidClone('address')"
              @blur="FormValidation('address', 'blur')" :class="formError.address ? 'receive-con-input-wrong' : ''"
              class="receive-con-input" type="text" v-model="formData.address" placeholder="Address"></textarea>
            <div v-if="formError.address" class="wrong-text">Your address is wrong</div>
          </div>
        </div>
        <div class="withdraw-detail-con-li">
          <div class="withdraw-detail-con-title">Withdraw amount</div>
          <div class="withdraw-detail-con-text">
            <div class="withdraw-detail-con-li-left">
              <input type="number" class="amount-text" v-model="formData.amount" placeholder="At least 1" />
            </div>
            <div class="withdraw-detail-con-li-right">
              <img class="currency-icon" :src="currencyUrl" alt="">
              <div>{{ currency }}</div>
            </div>
          </div>
        </div>
        <div class="withdraw-detail-con-btm">
          <div>Available</div>
          <div class="withdraw-detail-con-btm-right">{{ balances }} {{ currency }}</div>
        </div>
      </div>
    </div>
    <div class="withdraw-detail-quantity">
      <div class="withdraw-detail-quantity-title">
        Estimated arrival quantity <span class="font-strong">0.00 USDT</span>
      </div>
      <div class="withdraw-detail-quantity-con">
        <div>Network fee</div>
        <div>0.00 USDT</div>
      </div>
    </div>
    <div class="withdraw-detail-btn" @click="backHome">
      Withdraw
    </div>
    <van-action-sheet v-model:show="networkShow">
      <!-- 自定义 header 插槽 -->
      <view slot="header">
        <div class="van-action-box-header">
          <div class="action-title-line"></div>
          <div>Select network</div>
          <img @click="networkShow = false" class="back-icon" src="@/assets/images/balance/back-icon.png" alt="">
        </div>
      </view>
      <div class="network-list">
        <div @click="setNetwork(item)" :class="nowIndex == index ? 'network-li-set' : ''" class="network-list-li"
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
    <showModel :showModal="showModal" @closeModel="closeDialog"></showModel>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import copyCon from '@/components/copy/index.vue'
import { useMain } from '@/store';
import showModel from '@/components/showModel/index.vue'
import { getNetworkFree, getNetwork, getBalances, putWithdraw } from '@/apis/api'

export default defineComponent({
  name: 'withdrawDetail',
  components: { HeaderBar, copyCon, showModel },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const couponStore = useMain();
    const { proxy } = getCurrentInstance() as any
    const showModal= ref(false)
    const data = reactive({
      headerTitle: 'Withdraw USDT',
      address: '',
      networkShow: false,
      networkList: [{
        networkLogoUrl: new URL('@/assets/images/home/BTC-icon.png', import.meta.url).href,
        network: 'Bitcoin',
        chainType: 'BTC',
      }, {
        networkLogoUrl: new URL('@/assets/images/home/BTC-icon.png', import.meta.url).href,
        network: 'Bitcoin',
        chainType: 'BTC',
      }] as any,
      receiveCrypto: {} as any,
      nowIndex: 0,
      balances: 0,
      nowUrl: '' as any,
      nowChainType: '' as any,
      currency: '' as any,
      currencyUrl: '' as any,
      nowNetwork: '' as any,
      formData: {
        amount: '',
        address: '',
        email: ''
      } as any,
      formError: {
        address: false,
        email: false
      } as any,
      freeList: {} as any
    })
    const FormValidClone = (val: string) => {
      data.formError[val] = false;
    }
    const closeDialog = (val: boolean) => {
      showModal.value = false;
    }
    //表单验证
    const FormValidation = (val: string, type: string) => {
      if (data.formData[val] == '') {
        data.formError[val] = false;
        return
      }
      if (val === "address") {
        let reg = new RegExp(data.freeList?.addressRegex)
        if (!data.formData.address.length || data.formData.address.length < 2 || !reg.test(data.formData.address)) {
          if (type === "blur") {
            data.formError.address = true;
          }
        } else {
          data.formError.address = false;
        }
      }
      if (val === "email") {
        let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // console.log(data.formData.email)
        if (
          !data.formData.email ||
          !reg.test(data.formData.email)
        ) {
          // console.log('no', reg.test(data.formData.email))
          data.formError.email = true;
        } else {
          data.formError.email = false;
        }
      }
    }
    const infoMethods = {
      async setNetwork(items: any) {
        data.nowUrl = items.networkLogoUrl
        data.nowNetwork = items.network
        data.nowChainType = items.chainType
        await infoMethods.getFree(data.currency, data.nowNetwork)
        data.networkShow = false

      },
      backHome() {
        router.replace({ path: '/' })
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
      async getFree(token: any, network: any) {
        let res = await getNetworkFree(token, network)
        if (res.data.code == 0) {
          data.freeList = res.data.model
          data.nowIndex = 0
        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
        }
      },
      async onBalances(currency: any) {
        let res = await getBalances(currency)
        if (res.data.code == 0) {
          data.balances = res.data.model.balances
        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
        }
      },
      async sendWithdraw() {
        let params = {
          address: data.formData.address,
          amount: data.formData.amount,
          code: data.code,
          network: data.nowNetwork,
          token: data.currency,
          type: data.type // 1、email 2、googleAuth
        }
        await putWithdraw(params)
      }
    }
    onBeforeMount(() => {
    })
    onMounted(async () => {
      console.log(couponStore.$state.withdraw)
      let deposit = couponStore.$state.deposit
      if (route.query.currency) {
        data.headerTitle = 'Withdraw ' + route.query.currency
        data.currency = route.query.currency
        data.nowNetwork = route.query.network
        data.currencyUrl = route.query.url
        await infoMethods.findNetwork(data.currency)
        await infoMethods.getFree(data.currency, data.nowNetwork)
        await infoMethods.onBalances(data.currency)
      } else {
        if (deposit) {
          data.headerTitle = 'Withdraw ' + deposit
          data.currency = deposit.currency
          data.nowNetwork = deposit.network
          data.currencyUrl = deposit.url
          await infoMethods.findNetwork(data.currency)
          await infoMethods.getFree(data.currency, data.nowNetwork)
          await infoMethods.onBalances(data.currency)
        }
      }
    })
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      showModal,
      ...infoMethods,
      FormValidClone,
      FormValidation,
      closeDialog
    };
  },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>