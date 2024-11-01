<template>
  <div class="download-app-container">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="download-app-container-view">
      <div class="app-type">
        <n-tabs type="line" animated default-value="ios" justify-content="space-between" :on-update:value="changeTab">
          <n-tab name="ios">
            <div class="tab-header">
              <div>
                <img v-if="activeTab !== 'ios'" src="@/assets/images/verification/ios.png" alt="" />
                <img v-else src="@/assets/images/verification/ios-active.png" alt="" />
              </div>
              <div class="tab-header-text">IOS </div>
            </div>
          </n-tab>
          <n-tab name="android">
            <div class="tab-header">
              <div>
                <img v-if="activeTab !== 'android'" src="@/assets/images/verification/android.png" alt="" />
                <img v-else src="@/assets/images/verification/android-active.png" alt="" />
              </div>
              <div class="tab-header-text">Android</div>
            </div>
          </n-tab>
        </n-tabs>
      </div>
      <div class="app-qrcode-list">
        <div v-if="activeTab === 'ios'" class="app-qrcode">
          <img src="@/assets/images/verification/ios-qrcode.png" alt="" />
          <div class="link">
            <span>https://apps.apple.com/us/app/google-authenticator/id388497605</span>
            <copyCon copyHtml="https://apps.apple.com/us/app/google-authenticator/id388497605"/>
          </div>
        </div>
        <div v-else class="app-qrcode">
          <img src="@/assets/images/verification/android-qrcode.png" alt="" />
          <div class="link">
            <span>https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=zh&gl=US</span>
            <copyCon copyHtml="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=zh&gl=US"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import copyCon from '@/components/copy/index.vue'
import { NTabs,NTab } from 'naive-ui'

export default defineComponent({
  name: 'downloadAPP',
  components:{HeaderBar,copyCon,NTabs,NTab},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const activeTab = ref();
    activeTab.value = 'ios';
    const data = reactive({
      headerTitle:'Download APP'
    })
    const changeTab = (tab: string | number) => {
      activeTab.value = tab;
    };
    onBeforeMount(() => {
      //console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      //console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      activeTab,
      changeTab
    };
  },
})
</script>

<style scoped lang="scss">
.download-app-container {
  .download-app-container-view {
    margin: 0 auto;
    max-width: calc(100% - 32px);
  }

  .app-type {
    margin: 36px 0 24px 0;
    width: 100%;

    .tab-header {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      left: -4px;
      top: -4px;

      img {
        width: 24px;
        height: 24px;
        margin-right: 4px;
      }
      .tab-header-text{
        margin-top: -2px;
      }
    }

    :deep(.n-tabs) {
      width: 100% !important;
    }

    :deep(.n-tab) {
      width: 50%;
    }

    :deep(.n-tabs-nav-scroll-content) {
      background: #EDEFF2;
      border-radius: 12px;
      height: 40px;
      border-bottom: 1px solid transparent !important;
    }

    :deep(.n-tabs-tab__label) {
      font-family: 'sf-pro-display_bold_700';
      font-style: normal;
      font-size: 14px;
      line-height: 140%;
      color: #191B1F;
      z-index: 10;
    }

    :deep(.n-tabs-tab--active .n-tabs-tab__label) {
      color: #fff;
    }

    :deep(.n-tabs-wrapper) {
      width: 343px;
    }

    :deep(.n-tabs-tab-wrapper) {
      flex-direction: column;
      width: 50%;
    }

    :deep(.n-tabs-tab) {
      display: flex;
      align-items: center;
      justify-content: center;
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
      background: #191b1f;
      border-radius: 12px;
    }
  }

  .app-qrcode-list {
    width: 100%;
  }

  .app-qrcode {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    transition: transform 0.3s ease-in-out;
    background: #ffffff;
    border-radius: 12px;
    padding: 32px 16px;
    box-sizing: border-box;

    img {
      width: 148px;
      height: 148px;
      margin-bottom: 16px;
    }

    .link {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #E6E8EB;
      border-radius: 8px;
      padding: 12px 16px;
      box-sizing: border-box;
      font-family: 'sf-pro-display_medium_500';
      font-size: 12px;
      line-height: 120%;
      color: #191B1F;
      word-break: break-word;

      span {
        max-width: calc(438px - 50px);
        display: flex;
        font-family: 'sf-pro-display_medium_500';
        font-size: 12px;
        line-height: 120%;
        max-width: 260px;
        word-break: break-all;
        overflow-wrap: break-word;
        margin-right: 12px;
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
