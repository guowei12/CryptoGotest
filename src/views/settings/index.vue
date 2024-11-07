<template>
  <div class="settings-con">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="settings-list">
      <div class="settings-list-title">
        {{ $t('settings.General') }}
      </div>
      <div class="settings-list-li">
        <div class="settings-li" @click="goCurrency">
          <div class="settings-li-left">
            <img class="settings-li-left-icon" src="@/assets/images/set/currency-icon.png" alt="" srcset="">
            <div>{{ $t('settings.DisplayedCurrency') }}</div>
          </div>
          <div class="settings-li-right">
            <div>{{ currency }}</div>
            <img class="arow-right" src="@/assets/images/set/arow-right.png" alt="" srcset="">
          </div>
        </div>
        <div class="settings-li" @click="goLanguage">
          <div class="settings-li-left">
            <img class="settings-li-left-icon" src="@/assets/images/set/language-icon.png" alt="" srcset="">
            <div>{{ $t('settings.Language') }}</div>
          </div>
          <div class="settings-li-right">
            <div>{{ language }}</div>
            <img class="arow-right" src="@/assets/images/set/arow-right.png" alt="" srcset="">
          </div>
        </div>
      </div>
      <div class="settings-list-title">
        {{ $t('settings.Security') }}
      </div>
      <div class="settings-list-li">
        <div class="settings-li">
          <div class="settings-li-left">
            <img class="settings-li-left-icon" src="@/assets/images/set/email-icon.png" alt="" srcset="">
            <div>{{ $t('settings.Email') }}</div>
          </div>
          <div class="settings-li-right">
            <div>{{ hideEmail(email) }}</div>
            <img class="already-icon" src="@/assets/images/set/already-icon.png" alt="" srcset="">
          </div>
        </div>
        <div class="settings-li">
          <div class="settings-li-left">
            <img class="settings-li-left-icon" src="@/assets/images/set/authenticator-icon.png" alt="" srcset="">
            <div>{{ $t('settings.GoogleAuthenticator') }}</div>
          </div>
          <div class="settings-li-right">
            <div class="settings-li-btn">Activate</div>
          </div>
        </div>
      </div>
      <div class="settings-list-li">
        <div class="settings-li">
          <div class="settings-li-left">
            <img class="settings-li-left-icon" src="@/assets/images/set/logout-icon.png" alt="" srcset="">
            <div>{{ $t('settings.LogOut') }}</div>
          </div>
          <div class="settings-li-right">
            <img class="arow-right" src="@/assets/images/set/arow-right.png" alt="" srcset="">
          </div>
        </div>
      </div>
    </div>
    <!-- 退出登录弹窗 -->
    <Mask :showModal="showLogOut">
      <div class="log_out_contaner">
        <div class="tip">
          {{ $t('logout.msg') }}
        </div>
        <div class="button">
          <div class="btn_item" @click="cancelLoginOut">{{ $t('logout.Cancel') }}</div>
          <div class="btn_item confirm" @click="confirmLoginOut">{{ $t('logout.Confirm') }}</div>
        </div>
      </div>
    </Mask>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, onActivated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Mask from '@/components/mask/index.vue'
import HeaderBar from '@/components/headerBar/index.vue'
import { useI18n } from '@/multilingual/index.ts';
const { t, locale } = useI18n();
export default defineComponent({
  name: 'setting',
  components: { HeaderBar, Mask },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const data = reactive({
      showLogOut: true,
      headerTitle: t('headerTitle.Settings'),
      LanguageList: [
        {
          name: 'EN-US',
          value: 'en'
        },
        {
          name: 'Vietnamese',
          value: 'vi'
        },
        {
          name: 'Thai',
          value: 'th'
        },
        {
          name: 'zh-TW',
          value: 'zh'
        }
      ],
      currency: 'USD',
      language: 'EN-US',
      email: 'shasdsadasdasdasdsadasdsadsad@qq.com'
    })
    const getCurrency = () => {
      let currencyt = window.localStorage.getItem('currency') as any;
      console.log(currencyt)
      if (currencyt) {
        data.currency = currencyt
      } else {
        window.localStorage.setItem('currency', 'USD');
      }
    }
    const getLoale = () => {
      let localet = window.localStorage.getItem('locale') as any;
      console.log(localet)
      if (['vi', 'th', 'en', 'zh'].includes(localet)) {
        data.LanguageList.forEach(item => {
          if (item.value == localet) {
            data.language = item.name
          }
        })
      } else {
        locale.value = 'en'
        window.localStorage.setItem('locale', 'en');
      }
    }
    const cancelLoginOut = () => {
      data.showLogOut = false;
    }
    // 关闭退出登录弹窗确认按钮
    const confirmLoginOut = async () => {
      // showLogOutLoading.value = true;
      try {
        const { data } = await out();
        if (data.code == '0') {
          // handleUserInfo();
          window.localStorage
          router.replace({ path: '/' });
          // showLogOutLoading.value = false;
        }
      } catch (errr) {
        // showLogOutLoading.value = false;
      }
    }
    // 清空用户信息
    const handleUserInfo = () => {
      sessionStorage.removeItem('user_email');
      sessionStorage.removeItem('userInfo');
    }
    onBeforeMount(() => {
    })
    onMounted(async () => {
      console.log('onMounted')
      getCurrency()
      getLoale()
    })
    onActivated(() => {
      console.log('onActivated')
      data.currency = window.localStorage.getItem('currency') as any;
      let localet = window.localStorage.getItem('locale') as any
      if (['vi', 'th', 'en', 'zh'].includes(localet)) {
        data.LanguageList.forEach(item => {
          if (item.value == localet) {
            data.language = item.name
          }
        })
      }
    })
    const hideEmail = (email: string) => {
      return email.replace(/^(.{2})(.*)(?=@)/, '$1****');
    }
    const goCurrency = () => {
      router.replace({ path: '/currency' })
    }
    const goLanguage = () => {
      router.replace({ path: '/language' })
    }
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      goCurrency,
      getCurrency,
      goLanguage,
      getLoale,
      hideEmail,
      cancelLoginOut,
      confirmLoginOut,
      handleUserInfo
    };
  },
})
</script>
<style lang='scss' scoped src='./index.scss'></style>