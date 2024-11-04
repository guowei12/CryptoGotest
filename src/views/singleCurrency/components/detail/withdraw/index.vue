<!-- withdraw submit -->
<template>
  <div class="withdraw-detail">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="withdraw-detail-box">
      <div class="withdraw-detail-con">
        <div class="withdraw-detail-con-li">
          <div class="withdraw-detail-con-title">Transfer network</div>
          <div class="withdraw-detail-con-text" @click="networkShow = !networkShow">
            <div>Select Network</div>
            <img :class="networkShow ? 'arrow-btm-set' : 'arrow-btm'" src="@/assets/images/balance/arrow-btm.png" alt="">
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
              <input  type="number" class="amount-text" v-model="formData.amount"
              placeholder="At least 1" />
            </div>
            <div class="withdraw-detail-con-li-right">
              <img class="currency-icon" src="@/assets/images/balance/currency-icon.png" alt="">
              <div>USDT</div>
            </div>
          </div>
        </div>
        <div class="withdraw-detail-con-btm">
          <div >Available</div>
          <div class="withdraw-detail-con-btm-right">261.33 USDT</div>
        </div>
      </div>
    </div>
    <div class="withdraw-detail-quantity">
      <div class="withdraw-detail-quantity-title">
        Estimated arrival quantity  <span class="font-strong">0.00 USDT</span>
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
        <div @click="setNetwork(item.network)" :class="nowIndex == index ? 'network-li-set' : ''" class="network-list-li"
          v-for="(item, index) in depositList" :key="index">
          <div class="network-li-left">
            <img class="currency-img" :src="item.img" alt="" srcset="">
            <div class="network-list-con">
              <div class="network-list-con-name">{{ item.name }}</div>
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
    <showModel></showModel>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import copyCon from '@/components/copy/index.vue'
import { useMain } from '@/store';
import showModel from '@/components/showModel/index.vue'

export default defineComponent({
  name: 'withdrawDetail',
  components: { HeaderBar, copyCon,showModel },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const couponStore = useMain();
    const data = reactive({
      headerTitle: 'Withdraw USDT',
      hash: '0xe89bb7caa285672nbfe1v17bfcf85324b8b7f7af',
      networkShow: false,
      depositList: [
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
      networkList: [{
        img: new URL('@/assets/images/home/BTC-icon.png', import.meta.url).href,
        network: 'Bitcoin',
        name: 'BTC',
      }],
      receiveCrypto: {} as any,
      nowIndex: 0,
      nowNetwork: '',
      formData: {
        amount: '',
        address: '',
        email: ''
      } as any,
      formError: {
        address: false,
        email: false
      } as any
    })
    const FormValidClone = (val: string) => {
      data.formError[val] = false;
    }
    //表单验证
    const FormValidation = (val: string, type: string) => {
      if (data.formData[val] == '') {
        data.formError[val] = false;
        return
      }
      if (val === "address") {
        let reg = new RegExp(data.receiveCrypto?.networkAddressRegex)
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
      setNetwork(network: any) {
        data.nowNetwork = network
        data.networkShow = false
      },
      backHome() {
        router.replace({ path: '/' })
      }
    }
    onBeforeMount(() => {
    })
    onMounted(() => {
      console.log(couponStore.$state.withdraw)
      data.headerTitle = 'withdraw ' + (route.query.currency ? route.query.currency : 'USDT1')
    })
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      ...infoMethods,
      FormValidClone,
      FormValidation
    };
  },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>