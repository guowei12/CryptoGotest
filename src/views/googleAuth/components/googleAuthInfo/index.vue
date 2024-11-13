<template>
  <div class="google-auth-info">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="input">
      <div class="title">Email code</div>
      <myInput v-model:data="emailCode" :isCode="true" placeholder="" type="code" :disabled="disabledInp" :maxlength="6"
        @input="handleInput" @click="sendCode" height="48"></myInput>
    </div>
    <div class="input code_input">
      <div class="title">Google Authenticator code</div>
      <codeInput :keyboard="false" :autofocus="true" v-model:data="googleCode" @submitCode="handleGoogleInput">
      </codeInput>
    </div>
    <div class="google-button">
      <!-- :disabled="disabledBtn" -->
      <van-button class="qr_code-button" :disabled="disabledBtn" block :loading="loadingBtn" @click="eventClick">
        Continue
      </van-button>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, computed, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { googleAuthSendEmail, bindAuth } from './../../../../apis/googleAuth';
import HeaderBar from '@/components/headerBar/index.vue'
import myInput from '@/components/myInput/index.vue'
import codeInput from "@/components/CodeInput/index.vue"
import { useI18n } from 'vue-i18n';
import { useVerificationStore, usePhysicalCardStore } from '@/store';
export default defineComponent({
  name: 'googleAuthInfo',
  components: { HeaderBar, myInput, codeInput },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t, locale } = useI18n();
    const { proxy } = getCurrentInstance() as any
    const data = reactive({
      headerTitle: 'Google Authenticator',
    })
    const verificationStore = useVerificationStore();
    const physicalCardStore = usePhysicalCardStore();
    const emailCode = ref('');
    const disabledInp = ref(false);
    // 点击发送验证码
    let time = ref(0);
    const googleCode = ref('');
    const loadingBtn = ref(false);

    const handleInput = () => {
      emailCode.value = emailCode.value?.replace(/\D/g, '');
    };
    const handleGoogleInput = () => {
      googleCode.value = googleCode.value?.replace(/\D/g, '');
    };
    const sendCode = async () => {
      time.value = 60 * 1000;
      if (time.value) {
        // const res = await googleAuthSendEmail();
        // if (res.data?.code === '0') {
          // proxy.$successToast(t('googleCode.tip'), '', 3000)
        // } else {
          // proxy.$failToast(res.data.msg, 'failToast', 3000)
        // }
      }
    };
    const eventClick = async () => {
      loadingBtn.value = true;
      try {
        let objData = {
          emailCode: emailCode.value,
          googleCode: googleCode.value,
        };
        const resData = await bindAuth(objData);
        if (resData.data?.code === '0') {
          router.go(-1)
          return
          // if (physicalCardStore.lossAuthGoogle) {
          //   router.push({
          //     path: '/reportLoss',
          //   });
          // } else {
          //   if (verificationStore.source !== 'active') {
          //     verificationStore.setSource('cvv');
          //   }
          //   router.push({
          //     path: '/home',
          //     query: { type: 'google' },
          //   });
          // }
        } else {
          // errorMessage(resData.data.msg);
          loadingBtn.value = false;
        }
      } catch (err) {
        console.log('err', err);
        loadingBtn.value = false;
      }
    };
    onBeforeMount(() => {
      //console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      //console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    watchEffect(() => {

    })
    //点击按钮
   const disabledBtn = computed(() => {
      if (emailCode.value?.length === 6 && googleCode.value?.length === 6) {
        return false;
      }
      return true;
    });
    return {
      ...toRefs(data),
      verificationStore,
      physicalCardStore,
      disabledInp,
      emailCode,
      googleCode,
      time,
      loadingBtn,
      handleInput,
      handleGoogleInput,
      sendCode,
      disabledBtn,
      eventClick
    };
  },
})
</script>
<style lang="scss" scoped>
.google-auth-info {
  max-width: 470px;
  margin-top: 0px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .input {
    margin: 24px 0 0 0;
    padding: 0 16px;
    box-sizing: border-box;

    .title {
      font-family: 'sf-pro-display_regular_400';
      font-size: 14px;
      color: #191B1F;
      margin-bottom: 8px;
    }
  }

  .code_input {
    :deep(.code-item) {
      height: 48px;
    }
  }

  :deep(.van-button--default) {
    background: transparent !important;
    border: none;
  }

  :deep(.van-button--normal) {
    font-size: 16px;
  }

  :deep(.van-button__text) {
    color: #191B1F !important;

  }

  .google-button {
    width: calc(100% - 32px) !important;
    margin: 36px auto;
    padding-bottom: 20px;

    .qr_code-button {
      height: 48px;
      color: #191B1F !important;
      background: #58F287 !important;
      border-radius: 12px;
    }
  }
}
</style>
