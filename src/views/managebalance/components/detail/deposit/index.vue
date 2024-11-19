<!-- depositDetail  -->
<template>
  <div class="deposit-detail">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="deposit-detail-box">
      <!-- token -->
      <div class="deposit-detail-token">
        <div class="deposit-detail-token-title">
          Token
        </div>
        <div class="deposit-detail-token-con" @click="onShowt()">
          <div class="deposit-detail-token-con-left">
            <img class="currency-icon" :src="cryptoLogoUrl" alt="">
            <div class="deposit-detail-token-con-font">
              <div class="detail-currency-text">{{ currency }}</div>
              <div class="detail-network-text">{{ cryptoFullName }}</div>
            </div>
          </div>
          <img :class="showt ? 'arrow-btm-set' : 'arrow-btm'" src="@/assets/images/balance/arrow-btm.png" alt="">
          <!-- <img class="net-change-icon" src="@/assets/images/balance/net-change-icon.png" alt="" srcset=""> -->
        </div>
      </div>
      <!-- network -->
      <div class="deposit-detail-network">
        <div class="deposit-detail-network-title">
          Network
        </div>
        <div class="deposit-detail-network-con" @click="onShow()">
          <div class="deposit-detail-network-con-left">
            <img class="currency-icon" :src="networkLogo" alt="">
            <div class="deposit-detail-network-con-font">
              <div class="detail-currency-text">{{ network }}</div>
              <div class="detail-network-text">{{ chainType }}</div>
            </div>
          </div>
          <img :class="show ? 'arrow-btm-set' : 'arrow-btm'" src="@/assets/images/balance/arrow-btm.png" alt="">
          <!-- <img class="net-change-icon" src="@/assets/images/balance/net-change-icon.png" alt="" srcset=""> -->
        </div>
      </div>
      <div class="deposit-detail-qrCode">
        <div ref="qrcodeContainer" id="qrcodeImg"></div>
        <!-- <div class="img-center">
          <img class="networkLogo" :src="networkLogo" alt="" srcset="">
        </div> -->
      </div>
      <div class="deposit-text">
        Only deposit {{ currency }} to this address
      </div>
      <div class="deposit-detail-address">
        <div class="deposit-detail-network-tip">
          <div class="deposit-detail-address-title">Wallet address</div>
          <div class="deposit-detail-address-hash-box">
            <div class="deposit-detail-address-hash">{{ address }}</div>
            <copyCon :copyHtml="address" />
          </div>
        </div>
      </div>
      <div class="deposit-detail-btm">
        <div class="deposit-detail-btm-title">* Min Deposit Amount > 1 {{ currency }}</div>
        <div class="deposit-detail-btm-text">
          Please don't deposit any other digital assets except <span class="font-we">{{ currency }}</span> to the above
          address.
        </div>
        <div class="deposit-detail-btm-text">
          Minimum deposit amount <span class="font-we">1 {{ currency }}</span> . Any deposits less than the minimum will
          not be credited. </div>
        <div class="deposit-detail-btm-text">
          Please make sure that your computer and browser are secure and your information is protected from being
          tampered or leaked.
        </div>
      </div>
    </div>
    <div class="deposit-detail-btn" @click="backHome">
      Back Home
    </div>
    <div style="height: 68px;"></div>
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
              <div class="network-list-con-name">{{ item.network }}</div>
              <div class="network-list-con-time">{{ item.chainType }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class='action-btm' v-if="false">
        <img class="tip-icon" src="@/assets/images/balance/tip-icon.png" alt="" srcset="">
        <div class="tip-con">
          When you recharge this currency, please only recharge through the supported networks below. If you recharge
          through other networks, funds will be lost.
        </div>
      </div>
    </van-action-sheet>
    <van-action-sheet v-model:show="showt">
      <!-- 自定义 header 插槽 -->
      <view slot="header">
        <div class="van-action-box-header">
          <div class="action-title-line"></div>
          <div>Select token</div>
          <img @click="showt = false" class="back-icon" src="@/assets/images/balance/back-icon.png" alt="">
        </div>
      </view>
      <div class="network-list">
        <div @click="setCurrency(item, index)" :class="nowIndext == index ? 'network-li-set' : ''"
          class="network-list-li" v-for="(item, index) in depositList" :key="index">
          <div class="network-li-left">
            <img class="currency-img" :src="item.cryptoLogoUrl" alt="" srcset="">
            <div class="network-list-con">
              <div class="network-list-con-name">{{ item.crypto }}</div>
              <div class="network-list-con-time">{{ item.cryptoFullName }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class='action-btm' v-if="false">
        <img class="tip-icon" src="@/assets/images/balance/tip-icon.png" alt="" srcset="">
        <div class="tip-con">
          When you recharge this currency, please only recharge through the supported networks below. If you recharge
          through other networks, funds will be lost.
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, getCurrentInstance, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import copyCon from '@/components/copy/index.vue'
import { useMain } from '@/store';
import showModel from '@/components/showModel/index.vue'
import { getAddress, getTokens, getNetwork } from '@/apis/api'

import QRCode from 'qrcodejs2-fix';

export default defineComponent({
  name: 'depositDetail',
  components: { HeaderBar, copyCon, showModel },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const couponStore = useMain();
    const { proxy } = getCurrentInstance() as any
    const qrcodeContainer = ref(null) as any;
    let qrcodeInstance: { clear: () => void; } | null = null;

    let qrCodeUrl = ref('');
    const data = reactive({
      headerTitle: 'Deposit USDT',
      address: '',
      type: 1,
      show: false,
      showt: false,
      networkList: [] as any,
      depositList: [] as any,
      nowIndext: -1,
      nowIndex: -1,
      currency: '' as any,
      cryptoFullName: '' as any,
      cryptoLogoUrl: '' as any,
      chainType: '' as any,
      network: '' as any,
      networkLogo: '' as any
    })
    const infoMethods = {
      async findAddress(token: any, network: any) {
        let res = await getAddress(token, network)
        if (res.data.code == 0) {
          data.address = res.data.model
          qrCodeUrl.value = data.address
          await initQrcode(qrCodeUrl.value)
        } else {
          data.address = ''
          // 清除二维码容器中的内容
          // if (qrcodeContainer.value) {
          //   qrcodeContainer.value.innerHTML = '';
          // }
          proxy.$failToast(res.data.msg, 'failToast', 3000)
        }
      },
      async getList() {
        let res = await getTokens()
        if (res.data.code == 0) {
          data.depositList = res.data.model
        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
          return
        }
      },
      async changeCurrency() {
        if (data.currency) {
          data.depositList.forEach((item: { crypto: any; cryptoFullName: any; cryptoLogoUrl: any; }) => {
            if (item.crypto == data.currency) {
              data.cryptoFullName = item.cryptoFullName
              data.cryptoLogoUrl = item.cryptoLogoUrl
            }
          })
        }
      },
      async findNetwork(token: any) {
        let res = await getNetwork(token)
        if (res.data.code == 0) {
          data.networkList = res.data.model
          if (data.type == 1) {
            data.network = data.networkList[0].network
            data.networkLogo = data.networkList[0].networkLogoUrl
            data.chainType = data.networkList[0].chainType
            data.nowIndex = 0
          } else if (data.network) {
            data.networkList.forEach((item: { network: any; networkLogoUrl: any; }, index: number) => {
              if (data.network == item.network) {
                data.nowIndex = index
                data.networkLogo = item.networkLogoUrl
              }
            })

          }

        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
        }
      },
      async setNetwork(item: any, index: number) {
        data.nowIndex = index
        data.network = item.network
        // console.log(data.nowIndex)
        data.networkLogo = item.networkLogoUrl
        data.chainType = item.chainType
        await infoMethods.findAddress(data.currency, data.network)
        data.show = false
      },
      async setCurrency(item: any, index: number) {
        data.nowIndext = index
        data.currency = item.crypto
        data.cryptoLogoUrl = item.cryptoLogoUrl
        data.cryptoFullName = item.cryptoFullName
        data.showt = false
        await infoMethods.findNetwork(data.currency)
        // console.log(data.network)
        await infoMethods.findAddress(data.currency, data.network)

      },
      async onShow() {
        data.show = true
        console.log(data.nowIndex)
      },
      async onShowt() {
        data.showt = true
        console.log(data.nowIndex)
      },
      backHome() {
        router.replace({ path: '/' })
      }
    }
    // 初始化二维码
    const initQrcode = (url: string) => {
      const qrcodeImgEl = document.getElementById('qrcodeImg') ? document.getElementById('qrcodeImg') : '';
      qrcodeInstance = new QRCode(qrcodeImgEl, {
        // width: appStore.equipmentType === 'pc' ? 185 : 148,
        text: url,
        width: 140,
        height: 140,
        margin: 1,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      });
      //  qrcodeInstance.makeCode(url);
      // 获取生成的二维码的 canvas 元素
      const canvas = qrcodeContainer.value.querySelector('canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = data.cryptoLogoUrl;
        // console.log(img.src)
        img.onload = () => {
          // 计算图标的位置
          const x = 55;
          const y = 55;
          // 在二维码的中心绘制图标
          ctx.drawImage(img, x, y, 35, 35);
        };
      }
    };
    onBeforeMount(() => {
    })
    onMounted(async () => {
      let deposit = couponStore.$state.deposit
      await infoMethods.getList()
      if (route.query.currency) {
        data.headerTitle = 'Deposit ' + route.query.currency
        data.networkLogo = deposit ? deposit.logoUrl : ''
        data.currency = route.query.currency
        if (route.query.network) {
          data.network = route.query.network
          data.type = 2
        } else {
          data.type = 1
        }

      } else {
        // if (deposit) {
        //   data.headerTitle = 'Deposit ' + deposit
        //   data.currency = deposit.currency
        //   data.network = deposit.network
        //   data.networkLogo = deposit.logoUrl
        //   data.type = 3
        // }
      }
      if (data.currency) {
      } else {
        data.currency = "USDT"
      }
      console.log(data.type)
      await infoMethods.findNetwork(data.currency)
      console.log(data.network)
      await infoMethods.findAddress(data.currency, data.network)
      await infoMethods.changeCurrency()
    })
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      ...infoMethods,
      qrcodeContainer,
      qrcodeInstance,
      initQrcode
    };
  },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>