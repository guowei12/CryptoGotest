<template>
  <div class="currency-con">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="currency-list">
      <div class="currency-list-li">
        <div  class="currency-li-con" @click="setCurrency(item)"
          v-for="item, index in currencyList" :key="index">
          <div class="currency-li">
            <div class="currency-li-left">
              <div class="currency-li-left-faitIcon">{{ item.faitIcon }}</div>
              <!-- <img class="currency-li-left-icon" :src="item.countryPicture" alt="" srcset=""> -->
              <div :class="nowCurrency == item.faitCurrency ? 'currency-li-font' : ''">{{ item.faitCurrency }}</div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import { getFaitList } from '@/apis/api'

export default defineComponent({
  name: '',
  components: { HeaderBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance() as any
    const data = reactive({
      headerTitle: 'Displayed Currency',
      currencyList: [] as any,
      // currencyList: [
      //   {
      //     faitCurrency: 'USD',
      //     value: 'USD',
      //     countryPicture: new URL('@/assets/images/set/usd-icon.png', import.meta.url).href,
      //   },
      //   {
      //     faitCurrency: 'VND',
      //     value: 'VND',
      //     countryPicture: new URL('@/assets/images/set/vnd-icon.png', import.meta.url).href,
      //   },
      //   {
      //     faitCurrency: 'THB',
      //     value: 'THB',
      //     countryPicture: new URL('@/assets/images/set/thb-icon.png', import.meta.url).href,
      //   },
      //   {
      //     faitCurrency: 'EUR',
      //     value: 'EUR',
      //     countryPicture: new URL('@/assets/images/set/eur-icon.png', import.meta.url).href,
      //   },
      //   {
      //     faitCurrency: 'HKD',
      //     value: 'HKD',
      //     countryPicture: new URL('@/assets/images/set/hkd-icon.png', import.meta.url).href,
      //   },
      //   {
      //     faitCurrency: 'IDR',
      //     value: 'IDR',
      //     countryPicture: new URL('@/assets/images/set/idr-icon.png', import.meta.url).href,
      //   },
      //   {
      //     faitCurrency: 'SGD',
      //     value: 'SGD',
      //     countryPicture: new URL('@/assets/images/set/sgd-icon.png', import.meta.url).href,
      //   },
      // ],
      nowCurrency: 'USD'
    })
    onBeforeMount(() => {
    })
    onMounted(async () => {
      await getList()
      let currency = window.localStorage.getItem('currency') as any;
      if (currency) {
        data.nowCurrency = currency
      } else {
        window.localStorage.setItem('currency', 'USD');
      }
    })
    const setCurrency = (item: any) => {
      data.nowCurrency = item.faitCurrency
      window.localStorage.setItem('currency', item.faitCurrency);
      router.replace({ path: '/settings' })
    }
    const getList = async () => {
      let res = await getFaitList()
      if (res.data.code == 0) {
        data.currencyList = res.data.model
      } else {
        proxy.$failToast(res.data.msg, 'failToast', 3000)
        return
      }
    }
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      getList,
      setCurrency
    };
  },
})
</script>
<style lang='scss' scoped src='./index.scss'></style>