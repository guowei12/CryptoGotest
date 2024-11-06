<template>
  <div class="google-auth-contaner">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="tip">
       <img class="tip-img" src="@/assets/images/verification/tip-icon.png" alt="">
       <span>Please download the Google Authentication app and scan the QR code</span>
    </div>
    <div class="qr_code">
      <div id="qrcodeImg"></div>
      <div class="qrcodeImg-text">
        <div class="qrcodeImg-span">{{ secret }}</div>
        <copyCon :copyHtml="secret"/>
      </div>
      <div class="download_button" @click="goDownload">Download APP</div>
    </div>
    <div class="qr_code-button" @click="goGoogleAuthInfo">
      Continue
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import QRCode from 'qrcodejs2-fix';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import copyCon from '@/components/copy/index.vue'

import { getGoogleAuth } from '../../apis/googleAuth';
// import { useAppStore } from '@/store';
// const appStore = useAppStore();
export default defineComponent({
  name: 'googleAuthInfo',
  components:{HeaderBar,copyCon},
  setup() {
    const route = useRoute();
    const router = useRouter();
    let qrCodeUrl = ref('');
    let secret = ref('WWFGSFVASWFGB');
    const data = reactive({
      headerTitle:'Google Authenticator'
    })
    onBeforeMount(() => {
    })
    const goDownload = () => {
      setTimeout(() => {
        router.push('/downloadAPP');
      });
    };

    // 点击按钮
    const goGoogleAuthInfo = () => {
      // if (secret.value) {
        router.push('/googleAuthInfo');
      // }
    };
    // 获取谷歌授权码
    const initGoogleAuth = async () => {
      try {
        const res = await getGoogleAuth();
        if (res.data?.code === '0' && res.data?.model) {
          secret.value = res.data?.model?.secret;
          qrCodeUrl.value = res.data?.model?.qrCodeUrl;
          initQrcode(`otpauth://totp/Crypto Card?secret=${secret.value}`);
        }
      } catch (err) {
        console.log('err');
      }
    };

    // 初始化二维码
    const initQrcode = (url: string) => {
      const qrcodeImgEl = document.getElementById('qrcodeImg') ? document.getElementById('qrcodeImg') : '';
      let qrcode = new QRCode(qrcodeImgEl, {
        // width: appStore.equipmentType === 'pc' ? 185 : 148,
        width: 148,
        height: 148,
        margin: 1,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.L,
      });
      qrcode.makeCode(url);
    };
    onMounted(() => {
      // initGoogleAuth();
    });
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      initQrcode,
      qrCodeUrl,
      goDownload,
      goGoogleAuthInfo,
      initGoogleAuth,
      secret
    };
  },
})
</script>

<style scoped lang="scss">
// @mixin flexCenter {
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// @mixin flexBetween {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }


.google-auth-contaner {
  max-width: 470px;
  margin: auto;
  display: flex;
  flex-direction: column;
  height: 100%;

  .tip {
    margin-top: 16px;
    border-radius: 12px;
    background: rgba(26, 114, 246, 0.1);
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    align-items: normal;
    margin: 16px 16px 0 16px;

    .tip-img {
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }

    span {
      font-family: 'sf-pro-display_regular_400';
      font-style: normal;
      font-size: 14px;
      line-height: 150%;
      color: #191B1F;
      max-width: calc(100% - 40px);
    }
  }

  .download_button {
    width: 100%;
    border-radius: 12px;
    background: #58F28733;
    padding: 14.5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 32px;
    cursor: pointer;
    font-family: 'sf-pro-display_medium_500';
    font-size: 16px;
    line-height: 19px;
    color: #31CF61;
    transition: all 0.3s ease-in-out;
  }

  .download_button:hover {
    background: rgba(26, 114, 246, 0.1);
  }

  .download_button:active {
    background: rgba(26, 114, 246, 0.3);
  }

  .qr_code {
    margin-top: 16px;
    background: #ffffff;
    padding: 32px 16px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 16px 16px 0 16px;

    #qrcodeImg {
      width: 148px;
      height: 148px;
      display: flex;
      align-items: center;
      justify-content: center;

      :deep(canvas) {
        width: 148px !important;
        height: 148px !important;
      }

      :deep(img) {
        width: 148px !important;
        height: 148px !important;
      }
    }
  }

  .qrcodeImg-text {
    margin-top: 16px;
    display: flex;
    align-items: center;

    .qrcodeImg-span {
      margin-right: 12px;
      font-family: 'sf-pro-display_medium_500';
      font-style: normal;
      font-size: 16px;
      line-height: 19.2px;
      color: #191B1F;
      display: block;
    }

    .copy-icon {
      width: 16px;
      height: 16px;
    }
  }
}

.qr_code-button {
  font-size: 16px;
  font-family: 'sf-pro-display_medium_500';
  color: #191B1F;
  height: 48px;
  line-height: 48px;
  text-align: center;
  margin: 36px 16px 0 16px;
  background: #58F287;
  border-radius: 12px;
}
</style>
