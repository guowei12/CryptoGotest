<template>
  <div class="QRPay-container">
    <fLoading class="fLoading-box" v-if="loading" />
    <HeaderBar :home="true"></HeaderBar>
    <div class="QRPay-con">
      <div class="QRPay-balance">
        <div class="QRPay-balance-title">AEON balance <img class="QRPay-balance-title-img"
            src="@/assets/images/home/see-icon.png" alt=""></div>
        <div class="QRPay-balance-number">{{ balancesObj.faitIcon }}{{ balancesObj.balances }}</div>
      </div>
      <div class="QRPay-balance-btn" @click="goManagebalance">
        <img class="QRPay-balance-btn-img" src="@/assets/images/home/wallet-icon.png" alt="" srcset="">
        <div>Manage balance</div>
      </div>
    </div>
    <div class="QRPay-change-con">
      <div class="QRPay-change-tran">
        Transaction
      </div>
      <!-- <div class="QRPay-change">
        <div @click="onChange(1)" :class="listShow==1?'QRPay-change-btn-set':''" class="QRPay-change-btn btn-class">Transaction</div>
        <div @click="onChange(2)" :class="listShow==2?'QRPay-change-btn-set':''" class="QRPay-change-btn btn-class">Assets</div>
      </div> -->
      <van-pull-refresh :success-text="loadingText" :pulling-text="loadingText" :loosing-text="loadingText"
        :loading-text="loadingText" v-model="refLoading" @refresh="onRefresh">
        <van-list class="QRPay-list" v-if="listShow == 1" v-model:loading="dataLoading" :finished="finished"
          finished-text="没有更多了" @load="onLoad">
          <!-- <div class="QRPay-list" "> -->
          <div class="QRPay-list-li" v-for="(item, index) in list" :key="index">
            <div class="QRPay-list-li-left">
              <img v-if="item.status == 'Completed'" class="shopping-img" src="@/assets/images/home/shopping-com.png"
                alt="" srcset="">
              <img v-else class="shopping-img" src="@/assets/images/home/shopping-failed.png" alt="" srcset="">
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
              </div>
            </div>
          </div>
          <!-- </div> -->
        </van-list>
        <div class="QRPay-list" v-if="listShow == 2">
          <div class="QRPay-list-li" v-for="(item, index) in assetsList" :key="index">
            <div class="QRPay-list-li-left">
              <img class="currency-img" :src="item.img" alt="" srcset="">
              <div class="QRPay-list-con">
                <div class="QRPay-list-con-name">{{ item.network }}</div>
                <div class="QRPay-list-con-time">{{ item.name }}</div>
              </div>
            </div>
            <div class="QRPay-list-right">
              <div class="QRPay-list-con-num">${{ item.balance }}</div>
              <div class="QRPay-list-con-status">
                {{ item.number }} {{ item.currency }}
              </div>
            </div>
          </div>
        </div>
        <div class="no-data" v-if="transactionList.length == 0 && listShow == 1">
          <img class="no-data-img" src="@/assets/images/balance/no-data-icon.png" alt="" srcset="">
          <div class="no-data-title">You haven't topped up yet</div>
          <div class="no-data-text">Please complete the first top-up to activate the card</div>
        </div>
      </van-pull-refresh>
    </div>
    <footerBar v-if="!loading"></footerBar>
    <!-- <qrcode/> -->

  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import qrcode from "../QRcode/index.vue"
import fLoading from "@/components/fLoading/index.vue"
import HeaderBar from '@/components/headerBar/index.vue'
import footerBar from '@/components/footerBar/index.vue'
import { getTokenInfo, initWattle, getTransHistory } from '@/apis/api'

/**
* 仓库
*/
export default defineComponent({
  name: 'Home',
  components: { HeaderBar, footerBar, qrcode, fLoading },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance() as any
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const data = reactive({
      loadingText: '...',
      refLoading: false,
      dataLoading: false,
      loading: false,
      listShow: 1,
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
      token: '' as any,
      balancesObj: {
        faitIcon: '$',
        balances: '0'
      } as any,
      pageNo: 1,
      pageSize: 10
    })
    const infoMethods = {
      async onTokenInfo(token: any) {
        let res = await getTokenInfo({ token })
        window.sessionStorage.setItem('token', token)
        if (res.data.code == 0) {
          if (res.data.model) {
            data.loading = false
          }
        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
          return
        }
      },
      async onRefresh() {
        data.refLoading = false
        data.pageNo = 0
        data.pageSize = 1
        infoMethods.onHistory()
        // data.refLoading=true

      },
      async onHistory() {
        await getTransHistory(data.pageNo, data.pageSize)
      },
      onChange(num: number) {
        data.listShow = num
      },
      goManagebalance() {
        router.push({ path: '/balance' })
      }
    }
    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }
        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    }
    onBeforeMount(() => {
    })
    onMounted(async () => {
      data.token = route.query.token
      await infoMethods.onTokenInfo(data.token)
    })
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      ...infoMethods,
      list,
      onLoad
    };
  },
})

</script>
<style lang='scss'>
.van-pull-refresh {
  // overflow: visible !important;
}

/* 隐藏下拉刷新的文案 */
.van-pull-refresh__head {
  font-size: 14px;
  color: #191B1F;
  // visibility: hidden;
}
</style>
<style lang='scss' scoped src='./index.scss'></style>