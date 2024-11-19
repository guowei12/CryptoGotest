<template>
  <div class="InstallCryptoGo">
    <van-overlay :show="true">
      <div class="ic-box-bg">
        <div class="ic-box">
          <img class="AEON-logo" src="@/assets/images/home/AEON-logo.png" alt="" srcset="">
          <div class="ic-title">Install CryptoGo</div>
          <div class="ic-texta">Enjoy Seamless Application On Your Phone
            To get started,</div>
          <div class="ic-text">
            Tap <img class="download-logo" src="@/assets/images/home/deposit-icon.png" alt=""> and “Add to Home Screen”
          </div>
          <div class="ic-text2">
            Supported on Safari
          </div>
          <div class="safari-logo-box">
            <img class="safari-logo" src="@/assets/images/home/safari-logo.png" alt="" srcset="">
          </div>
          <img @click="onClose" class="close-icon" src="@/assets/images/home/close-icon.png" alt="" srcset="">
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, defineEmits, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'InstallCryptoGo',
  emits: ['close'],
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const data = reactive({})
    onBeforeMount(() => {
    })
    onMounted(() => {
    })
    const onClose = () => {
      emit('close', true)
    }
    return {
      ...toRefs(data),
      onClose
    };
  },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>