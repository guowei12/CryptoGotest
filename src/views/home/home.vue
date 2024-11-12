<template>
  <div class="QRPay-container">
    <!-- <fLoading class="fLoading-box" v-if="loading" /> -->
    <tloading v-if="loading"></ tloading>
    <div v-else>
      <HeaderBar :home="true"></HeaderBar>
      <div class="QRPay-con">
        <div class="QRPay-balance">
          <div class="QRPay-balance-title">AEON balance <img class="QRPay-balance-title-img"
              src="@/assets/images/home/see-icon.png" alt=""></div>
          <div class="QRPay-balance-number">{{ userBalances.faitIcon }}{{ userBalances.balances }}</div>
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
        <van-pull-refresh  :pulling-text="loadingText" :loosing-text="loadingText"
          :loading-text="loadingText" v-model="refLoading" @refresh="onRefresh">
          <van-list class="QRPay-list" v-if="listShow == 1 && transactionList.length > 0" v-model:loading="dataLoading" :finished="finished"
            finished-text="no data" @load="onLoad">
            <!-- <div class="QRPay-list" "> -->
            <div class="QRPay-list-li" v-for="(item, index) in transactionList" :key="index">
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
          <!-- <div class="QRPay-list" v-if="listShow == 2">
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
          </div> -->
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
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import qrcode from "../QRcode/index.vue"
import fLoading from "@/components/fLoading/index.vue"
import tloading from '@/components/loading/index.vue'
import HeaderBar from '@/components/headerBar/index.vue'
import footerBar from '@/components/footerBar/index.vue'
import { getTokenInfo, initWattle, getTransHistory, getBalances } from '@/apis/api'

export default defineComponent({
  name: 'Home',
  components: { HeaderBar, footerBar, qrcode, fLoading, tloading },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance() as any
    const list = ref([]);
    const finished = ref(false);
    const data = reactive({
      faitCurrency: '',
      loadingText: '...',
      refLoading: false,
      dataLoading: false,
      loading: false,
      listShow: 1,
      transactionList: [],
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
      userInfo: {} as any,
      userBalances: {
        faitIcon: '$',
        balances: '0',
        tropertyList: []
      } as any,
      pageNo: 1,
      pageSize: 10,
      lastPage: false
    })
    const infoMethods = {
      async onTokenInfo(token: any, type: any) {
        let res = await getTokenInfo({ token })

        if (res.data.code == 0) {
          // token ? window.localStorage.setItem('user_token', token) : window.localStorage.setItem('user_token', '')
          if (res.data.model) {
            let tokenObj = res.data.model
            if (tokenObj.email) {
              let user = {
                email: tokenObj.email,
                model: token
              }
              if (tokenObj.tgUserInfo) {
                data.userInfo = tokenObj.tgUserInfo
              }

              window.localStorage.setItem('user_token', token)
              window.localStorage.setItem('user', JSON.stringify(user))
              if (tokenObj.language) {
                window.localStorage.setItem('locale', tokenObj.language)
              } else if (tokenObj.ipCountry == 'CN') {
                window.localStorage.setItem('locale', 'zh')
              }

            } else {
              router.replace({ path: '/signin' })
            }
            data.loading = false
            await infoMethods.onBalances()
          }else{
            router.replace({ path: '/signin' })
          }
        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
          return
        }
      },
      async onBalances() {
        let res = await getBalances(data.faitCurrency || '')
        if (res.data.code == 0) {
          data.userBalances = res.data.model
        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
        }
      },
      async onRefresh() {
        data.refLoading = true
        data.pageNo = 0
        data.pageSize = 1
        await infoMethods.onHistory()
        data.refLoading = false
      },
      async onHistory() {
        let res = await getTransHistory(data.pageNo, data.pageSize)
        if (res.data.code == 0) {
          if (res.data.model.data) {
            data.transactionList = res.data.model.data
          } else {
            data.transactionList = []
          }
          // 加载状态结束
          data.dataLoading = false;
          data.refLoading = false
          // 数据全部加载完成
          if (data.lastPage) {
            finished.value = true;
          }
        } else {
          data.dataLoading = false;
          finished.value = true
          data.lastPage = true
          data.refLoading = false
        }
      },
      onChange(num: number) {
        data.listShow = num
      },
      goManagebalance() {
        router.push({ path: '/balance' })
      },
      isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag
      },
    }
    const onLoad = async () => {
      await infoMethods.onHistory()
      // // 异步更新数据
      // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     list.value.push(list.value.length + 1);
      //   }
      //   // 加载状态结束
      //   loading.value = false;

      //   // 数据全部加载完成
      //   if (list.value.length >= 40) {
      //     finished.value = true;
      //   }
      // }, 1000);
    }

    onBeforeMount(() => {
    })
    onMounted(async () => {
      let stoken = window.localStorage.getItem('user_token') ? window.localStorage.getItem('user_token') : null
      data.token = route.query.token
      data.loading = true
      if (stoken || data.token) {
        if (data.token) {
          // url
          await infoMethods.onTokenInfo(data.token, '1')
        } else {
          await infoMethods.onTokenInfo(stoken, '2')
        }
        data.loading=false
      } else {
        if (infoMethods.isMobile()) {
          router.replace({
            path: '/signin'
          })
          return
        } else {
          router.replace({
            path: '/login'
          })
          return
        }
      }
    })
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      ...infoMethods,
      list,
      onLoad,
      finished
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