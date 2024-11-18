<template>
  <div class="QRPay-container">
    <fLoading class="fLoading-box" v-if="Faloading" />
    <Tloading class="QRPay-loading" v-if="loading" />
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
        <van-pull-refresh :pulling-text="loadingText" :loosing-text="loadingText" :loading-text="loadingText"
          v-model="refLoading" @refresh="onRefresh">
          <van-list class="QRPay-list" v-if="listShow == 1 && transactionList.length > 0" v-model:loading="dataLoading"
            :finished="finished" finished-text="" @load="onLoad">
            <!-- <div class="QRPay-list" "> -->
            <div class="QRPay-list-li" v-for="(item, index) in transactionList" :key="index" @click="goDetail(item)">
              <div class="QRPay-list-li-left">
                <img v-if="item.status == 'Completed'" class="shopping-img" src="@/assets/images/home/shopping-com.png"
                  alt="" srcset="">
                <img v-else-if="item.status == 'REFUND'" class="shopping-img" src="@/assets/images/home/Refund-icon.png"
                  alt="" srcset="">
                <img v-else class="shopping-img" src="@/assets/images/home/shopping-failed.png" alt="" srcset="">
                <div class="QRPay-list-con">
                  <div class="QRPay-list-con-name">{{ item.name }}</div>
                  <div class="QRPay-list-con-time">{{ item.updateTime }}</div>
                </div>
              </div>
              <div class="QRPay-list-right">
                <div class="QRPay-list-con-num">{{ item.status == 'SUCCESS' ? '-' : '+' }}{{ item.number }} {{ item.fait
                  }}
                </div>
                <div class="QRPay-list-con-status">
                  <div class="completed-color" v-if="item.status == 'SUCCESS'">Completed</div>
                  <div class="failed-color" v-if="item.status == 'FAIL'">Failed</div>
                  <div class="completed-color" v-if="item.status == 'REFUND'">Refund</div>
                  <div class="fail-reason" v-if="item.status == 'FAIL' && item.failReason">{{ item.failReason }}</div>
                  <!-- INIT, PENDING, SUCCESS, FAIL, ERROR, TIMEOUT  -->
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
    <InstallCryptoGo @close="onClose" v-if="icShow"></InstallCryptoGo>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect, onActivated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import qrcode from "../QRcode/index.vue"
import fLoading from "@/components/fLoading/index.vue"
import Tloading from '@/components/loading/index.vue'
import HeaderBar from '@/components/headerBar/index.vue'
import footerBar from '@/components/footerBar/index.vue'
import { getTokenInfo, initWattle, getTransHistory, getBalances } from '@/apis/api'
import { setToken, getToken, removeToken } from '@/utils/token';
import { useMain } from '@/store';
import InstallCryptoGo from './components/InstallCryptoGo/index.vue'
import moment from 'moment';
export default defineComponent({
  name: 'Home',
  components: { HeaderBar, footerBar, qrcode, fLoading, Tloading, InstallCryptoGo },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance() as any
    const list = ref([]);
    const finished = ref(false);
    const couponStore = useMain();
    const Faloading = ref(false)
    const data = reactive({
      faitCurrency: '',
      icShow: true,
      loadingText: '...',
      refLoading: false,
      dataLoading: false,
      loading: false,
      listShow: 1,
      transactionList: [] as any,
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
      userInfo: {} as any, //tg user
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
          if (res.data.model) {
            let tokenObj = res.data.model
            if (tokenObj.email) {

              let user = {
                email: tokenObj.email,
                aeonUserNo: tokenObj.aeonUserNo
              }
              if (tokenObj.tgUserInfo) {
                data.userInfo = tokenObj.tgUserInfo
              }
              if (tokenObj.aeonUserNo) {
                Faloading.value = false
                data.loading = true
                await infoMethods.onHistory()
                data.loading = false
              } else {
                Faloading.value = true
                let rest = await initWattle()
                if (rest.data.code == 0) {
                  Faloading.value = false
                } else {
                  Faloading.value = false
                  data.loading = false
                  proxy.$failToast(res.data.msg, 'failToast', 3000)
                  return
                }

              }
              setToken(token)
              window.localStorage.setItem('user', JSON.stringify(user))
              if (tokenObj.language) {
                window.localStorage.setItem('locale', tokenObj.language)
              } else if (tokenObj.ipCountry == 'CN') {
                window.localStorage.setItem('locale', 'zh')
              }

            } else {
              removeToken(token)
              // window.localStorage.setItem('user','')
              router.replace({ path: '/signin' })
            }
            data.loading = false
            await infoMethods.onBalances()
          } else {
            router.replace({ path: '/signin' })
          }
        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
          return
        }
      },
      async onBalances() {
        let currency = localStorage.getItem('currency') || 'USD'
        let res = await getBalances(currency)
        if (res.data.code == 0) {
          data.userBalances = res.data.model
          let list = data.userBalances.tropertyList
          localStorage.setItem('tokenList', JSON.stringify(list))
        } else {
          proxy.$failToast(res.data.msg, 'failToast', 3000)
        }
      },
      async onRefresh() {
        data.refLoading = true
        data.pageNo = 1
        data.pageSize = 10
        data.transactionList = []
        await infoMethods.onHistory()
        data.refLoading = false
      },
      async onHistory() {
        let res = await getTransHistory(data.pageNo, data.pageSize)
        if (res.data.code == 0) {
          if (res.data.model.data) {
            let transactionList = res.data.model.data
            transactionList = transactionList.concat([
              { failReason: '', fait: 'VND', faitAmount: '20,000', name: 'Mountain island coffee', status: 'REFUND', updateTime: "2024-11-13T07:34:51.000+0000" },
              { failReason: 'Fiat transfer rejected by bank. ', fait: 'VND', faitAmount: '20,000', name: 'Mountain island coffee', status: 'FAIL', updateTime: "2024-11-13T07:34:51.000+0000" },
            ])
            transactionList.forEach((item: { updateTime: moment.MomentInput; }) => {
              item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss');
              item.time = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss');
            })

            data.transactionList = transactionList.concat(data.transactionList)
            // data.transactionList = data.transactionList.push({

            // })
          } else {
            data.transactionList = []
          }
          // finished.value = true;
          // 加载状态结束
          data.dataLoading = false;
          data.refLoading = false
          data.lastPage = true
          // 数据全部加载完成
          if (res.data.model.sumPage == data.pageNo) {
            finished.value = true;
          } else {
            data.pageNo = data.pageNo + 1
            finished.value = false;
          }
        } else {
          data.dataLoading = false;
          finished.value = true
          data.lastPage = true
          data.refLoading = false
          proxy.$failToast(res.data.msg, 'failToast', 3000)
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
      async goUrl(status: any) {
        switch (status) {
          case 'SUCCESS':
            router.push({ path: '/transactionComplete' })
            break;
          case 'FAIL':
            router.push({ path: '/transactionFailed' })
            break;
          case 'ERROR':
            router.push({ path: '/transactionFailed' })
            break;
          case 'TIMEOUT':
            router.push({ path: '/timeOut' })
            break;
          default:
            break;
        }
      },
      async goDetail(detail: { status: string; }) {
        couponStore.SET_ORDERDETAIL(detail)
        await infoMethods.goUrl(detail.status)
      },
      onClose() {
        data.icShow = false
        localStorage.setItem('tipShow', '1')
      }
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
      couponStore.SET_ORDERDETAIL({})
      let tipShow = localStorage.getItem('tipShow')
      tipShow == '1' ? data.icShow = false : data.icShow = true
    })
    onMounted(async () => {
      let user=JSON.parse(localStorage.getItem('user') as any).aeonUserNo
      if(user&& user.aeonUserNo){
        data.loading = true
      }
      data.pageNo = 1
      data.pageSize = 10
      let stoken = getToken()
      data.token = route.query.token
      if (stoken || data.token) {
        if (data.token) {
          // url
          await infoMethods.onTokenInfo(data.token, '1')
        } else {
          await infoMethods.onTokenInfo(stoken, '2')
        }
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
    onActivated(async () => {
      let user=JSON.parse(localStorage.getItem('user') as any).aeonUserNo
      if(user&& user.aeonUserNo){
        data.loading = true
      }
      let stoken = getToken()
      data.token = route.query.token
      if (stoken || data.token) {
        if (data.token) {
          // url
          await infoMethods.onTokenInfo(data.token, '1')
        } else {
          await infoMethods.onTokenInfo(stoken, '2')
        }
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
      finished,
      Faloading
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