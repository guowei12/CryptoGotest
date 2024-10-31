<template>
  <div class="pc-header">
    <AppHeader :title="$t('googleAuthenticator.title')"></AppHeader>
  </div>

  <div class="download-app-container">
    <div class="phone-header">
      <PhoneHeader :title="$t('googleAuthenticator.title')"></PhoneHeader>
    </div>
    <div class="download-app-container-view">
      <div class="app-type">
        <n-tabs type="line" animated default-value="ios" justify-content="space-between" :on-update:value="changeTab">
          <n-tab name="ios">
            <div class="tab-header">
              <div v-if="appStore.theme !== 'dark'">
                <img v-if="activeTab !== 'ios'" src="@/assets/images/loginHome/ios.png" alt="" />
                <img v-else src="@/assets/images/loginHome/ios-active.png" alt="" />
              </div>
              <div v-else>
                <img v-if="activeTab === 'ios'" src="@/assets/images/loginHome/ios.png" alt="" />
                <img v-else src="@/assets/images/loginHome/ios-active.png" alt="" />
              </div>
              <span> {{ $t('downloadApp.IOS') }} </span>
            </div>
          </n-tab>
          <n-tab name="android">
            <div class="tab-header">
              <div v-if="appStore.theme !== 'dark'">
                <img v-if="activeTab !== 'android'" src="@/assets/images/loginHome/android.png" alt="" />
                <img v-else src="@/assets/images/loginHome/android-active.png" alt="" />
              </div>
              <div v-else>
                <img v-if="activeTab === 'android'" src="@/assets/images/loginHome/android.png" alt="" />
                <img v-else src="@/assets/images/loginHome/android-active.png" alt="" />
              </div>
              <span>{{ $t('downloadApp.Android') }}</span>
            </div>
          </n-tab>
        </n-tabs>
      </div>
      <div class="app-qrcode-list">
        <div v-if="activeTab === 'ios'" class="app-qrcode">
          <img src="@/assets/images/loginHome/ios-qrcode.png" alt="" />
          <div class="link">
            <span>https://apps.apple.com/us/app/google-authenticator/id388497605</span>
            <Copy copyHtml="https://apps.apple.com/us/app/google-authenticator/id388497605"></Copy>
          </div>
        </div>
        <div v-else class="app-qrcode">
          <img src="@/assets/images/loginHome/android-qrcode.png" alt="" />
          <div class="link">
            <span>https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=zh&gl=US</span>
            <Copy copyHtml="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=zh&gl=US"> </Copy>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="downloadAPP">
import { useAppStore } from '@/store';
const appStore = useAppStore();
const activeTab = ref();
activeTab.value = 'ios';
const changeTab = (tab: string | number) => {
  activeTab.value = tab;
};
</script>

<style scoped lang="scss">
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
    margin-bottom: 24px;
  }
}

.download-app-container {
  .download-app-container-view {
    max-width: 470px;
    margin: 0 auto;
    @include respond-td('phone') {
      max-width: calc(100% - 32px);
    }
  }

  .app-type {
    margin: 36px 0 24px 0;
    width: 100%;
    .tab-header {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      left: -8px;
      top: -2px;

      img {
        width: 24px;
        height: 24px;
        margin-right: 4px;
      }
    }

    :deep(.n-tabs) {
      width: 100% !important;

      @include respond-td('phone') {
        width: 100%;
      }
    }

    :deep(.n-tab) {
      width: 50%;
    }

    :deep(.n-tabs-nav-scroll-content) {
      background: var(--fillBgColor);
      border-radius: 12px;
      height: 40px;
      border-bottom: 1px solid transparent !important;
    }

    :deep(.n-tabs-tab__label) {
      font-family: var(--font7);
      font-style: normal;
      font-size: 14px;
      line-height: 140%;
      color: var(--textColor);
      z-index: 10;
    }

    :deep(.n-tabs-tab--active .n-tabs-tab__label) {
      color: var(--whiteTextColor);
    }

    :deep(.n-tabs-wrapper) {
      width: 470px;

      @include respond-td('phone') {
        width: 343px;
      }
    }

    :deep(.n-tabs-tab-wrapper) {
      flex-direction: column;
      width: 50%;
    }

    :deep(.n-tabs-tab) {
      @include flexCenter;
    }

    :deep(.n-tabs-tab-pad) {
      width: 0 !important;
    }

    :deep(.n-tabs-bar) {
      width: calc(50% - 4px) !important;
      max-width: calc(50% - 4px) !important;
      height: 36px;
      top: 2px;
      margin: 0 2px;
      background: var(--fillBgColor8);
      border-radius: 12px;
    }
  }
  .app-qrcode-list {
    width: 100%;
  }

  .app-qrcode {
    @include flexCenter;
    flex-direction: column;
    position: absolute;
    transition: transform 0.3s ease-in-out;
    background: var(--whiteBgColor);
    border-radius: 12px;
    padding: 32px 16px;
    box-sizing: border-box;

    img {
      width: 148px;
      height: 148px;
      margin-bottom: 16px;
    }

    .link {
      width: 438px;
      @include respond-td('phone') {
        width: 100%;
      }

      @include flexBetween;
      background: var(--fillBgColor4);
      border-radius: 8px;
      padding: 12px 16px;
      box-sizing: border-box;
      font-family: var(--font5);
      font-style: normal;
      font-size: 12px;
      line-height: 120%;
      color: var(--textColor);
      word-break: break-word;

      span {
        max-width: calc(438px - 50px);
        display: flex;

        @include respond-td('phone') {
          font-family: var(--font5);
          font-style: normal;
          font-size: 12px;
          line-height: 120%;
          max-width: 260px;
          word-break: break-all;
          overflow-wrap: break-word;
          margin-right: 12px;
        }
      }
    }
  }

  .app-qrcode-android {
    transform: translateX(-470px);
  }

  .active {
    transform: translateX(0px);
  }
}
</style>
