<!-- depositDetail  -->
<template>
  <div class="deposit-detail">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="deposit-detail-box">
      <div class="deposit-detail-qrCode">
        <div ref="qrcodeContainer" id="qrcodeImg"></div>
        <!-- <div class="img-center">
          <img class="networkLogo" :src="networkLogo" alt="" srcset="">
        </div> -->
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
        <div class="deposit-detail-network-con" @click="onShow()">
          <div class="deposit-detail-network-con-left">
            <img class="currency-icon" :src="networkLogo" alt="">
            <div class="deposit-detail-network-con-font">
              <div class="detail-currency-text">{{ network }}</div>
              <div class="detail-network-text">{{ chainType }}</div>
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
              <div class="network-list-con-name">{{ item.network }}</div>
              <div class="network-list-con-time">{{ item.chainType }}</div>
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
      networkList: [] as any,
      nowIndex: -1,
      currency: '' as any,
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
          console.log('11')
          data.address = ''
          // 清除二维码容器中的内容
          // if (qrcodeContainer.value) {
          //   qrcodeContainer.value.innerHTML = '';
          // }
          proxy.$failToast(res.data.msg, 'failToast', 3000)
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
        console.log(data.nowIndex)
        data.networkLogo = item.networkLogoUrl
        data.chainType = item.chainType
        await infoMethods.findAddress(data.currency, data.network)
        data.show = false
      },
      async onShow() {
        data.show = true
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
        width: 200,
        height: 200,
        margin: 1,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      });
      //  qrcodeInstance.makeCode(url);
      // 获取生成的二维码的 canvas 元素
      console.log(qrcodeContainer.value.querySelector('canvas'))
      const canvas = qrcodeContainer.value.querySelector('canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = data.networkLogo;
        console.log(img.src)
        img.onload = () => {
          // 计算图标的位置
          const x = 70;
          const y = 70;
          // 在二维码的中心绘制图标
          ctx.drawImage(img, x, y, 54, 54);
        };
      }
    };
    onBeforeMount(() => {
    })
    onMounted(async () => {
      let deposit = couponStore.$state.deposit
      if (route.query.currency) {
        data.headerTitle = 'Deposit ' + route.query.currency
        data.networkLogo = deposit ? deposit.logoUrl : ''
        data.currency = route.query.currency
        if (route.query.network) {
          data.network = route.query.network
          data.type = 2
          await infoMethods.findNetwork(data.currency)
          await infoMethods.findAddress(data.currency, data.network)
        } else {
          data.type = 1
          await infoMethods.findNetwork(data.currency)
          await infoMethods.findAddress(data.currency, data.network)
        }

      } else {
        if (deposit) {
          data.headerTitle = 'Deposit ' + deposit
          data.currency = deposit.currency
          data.network = deposit.network
          data.networkLogo = deposit.logoUrl
          data.type = 3
          await infoMethods.findNetwork(data.currency)
          await infoMethods.findAddress(data.currency, data.network)
        }
      }
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