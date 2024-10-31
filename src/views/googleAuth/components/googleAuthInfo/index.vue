<template>
  <div class="pc-header">
    <AppHeader :title="$t('googleCode.title')"></AppHeader>
  </div>

  <div class="google-auth-info">
    <div class="phone-header">
      <PhoneHeader :title="$t('googleCode.title')"></PhoneHeader>
    </div>
    <div class="input">
      <div class="title">{{ $t('googleCode.Email_code') }}</div>
      <MyInput v-model:data="emailCode" :isCode="true" placeholder="" type="code" :disabled="disabledInp" :maxlength="6" @input="handleInput" @click="sendCode" height="48"></MyInput>
    </div>
    <div class="input code_input">
      <div class="title">{{ $t('googleCode.Google_code') }}</div>
      <CodeInput :autofocus="true" v-model:data="googleCode" @submitCode="handleGoogleInput"></CodeInput>
    </div>
    <div class="button">
      <a-button :loading="loadingBtn" @click="eventClick" width="470" :disabled="disabledBtn">{{ $t('googleCode.btn') }}</a-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="googleAuthInfo">
import { errorMessage } from '@/utils/common/common.ts';
import { googleAuthSendEmail, bindAuth } from '@/api/googleAuth';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { useVerificationStore, usePhysicalCardStore } from '@/store';
const verificationStore = useVerificationStore();
const physicalCardStore = usePhysicalCardStore();
const router = useRouter();

const emailCode: Ref<string> = ref('');
const disabledInp = ref(false);
const handleInput = () => {
  emailCode.value = emailCode.value?.replace(/\D/g, '');
};

const googleCode: Ref<string> = ref('');
const handleGoogleInput = () => {
  googleCode.value = googleCode.value?.replace(/\D/g, '');
};

// 点击发送验证码
let time: Ref<number> = ref(0);
const sendCode = async () => {
  time.value = 60 * 1000;
  if (time.value) {
    const res = await googleAuthSendEmail();
    if (res.data?.code === '0') {
      const sucMsgIcon = new URL('@/assets/images/dark/suc_msg_icon.png', import.meta.url).href;
      window.$message?.success(t('googleCode.tip'), {
        icon: () => h('img', { src: sucMsgIcon, className: 'message-icon' }),
      });
    }
  }
};

//点击按钮
const disabledBtn = computed(() => {
  if (emailCode.value?.length === 6 && googleCode.value?.length === 6) {
    return false;
  }
  return true;
});
const loadingBtn = ref(false);
const eventClick = async () => {
  loadingBtn.value = true;
  try {
    let objData = {
      emailCode: emailCode.value,
      googleCode: googleCode.value,
    };
    const resData = await bindAuth(objData);
    if (resData.data?.code === '0') {
      if (physicalCardStore.lossAuthGoogle) {
        router.push({
          path: '/reportLoss',
        });
      } else {
        if (verificationStore.source !== 'active') {
          verificationStore.setSource('cvv');
        }
        router.push({
          path: '/home',
          query: { type: 'google' },
        });
      }
    } else {
      errorMessage(resData.data.msg);
      loadingBtn.value = false;
    }
  } catch (err) {
    console.log('err', err);
    loadingBtn.value = false;
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

.pc-header {
  @include respond-td('phone') {
    display: none;
  }
}

.phone-header {
  display: none;
  @include respond-td('phone') {
    display: block;
    margin-bottom: 16px;
  }
}

.google-auth-info {
  max-width: 470px;
  margin: 12px auto 0;

  @include respond-td('phone') {
    margin-top: 0px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .input {
    margin: 24px 0 0 0;
    padding: 0 16px;
    box-sizing: border-box;
    .title {
      font-family: var(--font4);
      font-style: normal;
      font-size: 14px;
      line-height: normal;
      color: var(--textColor);
      margin-bottom: 8px;
    }
  }
  .code_input {
    :deep(.code-item) {
      height: 48px;
    }
  }

  .button {
    margin-top: 36px;
    padding: 0 16px;
    @include respond-td('phone') {
      padding-bottom: 20px;
    }
  }
}
</style>
