<template class="copy">
  <div class="copy-icon">
    <div @click="changeState" :class="!state ? 'copy_img' : 'copy_other'">
      <img  src="@/assets/images/balance/copy-icon.png" class="copy pointer" />
    </div>
    <div :class="!state ? 'copy_Success' : 'copy_other'">
      <n-tooltip :show="showPopover" :trigger="!isMobile? 'hover' : 'click'">
        <template #trigger>
          <img  class="copy" src="@/assets/images/balance/copy-icon2.png" alt="" />
        </template>
        <span class="tip">Copied</span>
      </n-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts" name="a-copy">
import { ref,getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance() as any

// const appStore = useAppStore();
const isMobile =()=>{
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag
  }
// import useClipboard from 'vue-clipboard3';
// const { toClipboard } = useClipboard();
const state = ref(true);

// 点击复制
const copyText = async (msg: any) => {
  try {
    // 复制
    // 解决在弹窗中使用复制不生效问题
    // await toClipboard(msg, document.querySelector('.copy-icon') as HTMLElement);
    proxy.$copyBtn(msg)
    showPopover.value = true;
    // 复制成功
    state.value = false;
    setTimeout(async (msg: any) => {
      state.value = true;
      showPopover.value = false;
    }, 1000);
  } catch (e) {
    // 复制失败
    console.log('e', e);
  }
};

const showPopover = ref(false);
const changeState = async () => {
  await copyText(porps.copyHtml);
};

const porps = withDefaults(
  defineProps<{
    copyHtml: any;
    isdark?: boolean;
  }>(),
  {}
);
</script>

<style lang="scss" scoped>

.pointer {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.pointer:hover {
}

.copy {
  width: 16px;
  height: 16px;
}

.copy-icon {
  color:#FFF;
  overflow: hidden;
  width: 16px;
  height: 16px;
  position: relative;
  flex-shrink:0;
  .copy_Success {
    position: absolute;
    top: 0px;
    width: 16px;
    height: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .copy_img {
    position: absolute;
    top: 999px;
    width: 16px;
    height: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .copy_other {
    width: 16px;
    height: 16px;
    position: relative;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.tip {
  font-family: 'sf-pro-display_medium_500';
  font-style: normal;
  font-size: 11px;
  line-height: 140%;
  color: #191B1F;
}
</style>
