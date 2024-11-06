<template>
  <div class="signin-code">
    <div class="signin-code-title">
      <div class="s-c-t-top">Verification Code</div>
      <div class="s-c-t-text">
        <div>Please enter the verification code send to</div>
        <div class="s-c-t-emial">John@gmail.com</div>
      </div>
      <codeInput :keyboard="false"  :autofocus="codeInputFocus" v-model:data="codeEmail" @submitCode="checkCodeByEmail" @blur="changeBlur"
        @focus="changeFocus"></codeInput>
      <div v-if="countdown==0" class="s-c-t-resend">Not received? <span @click="sendCode" class="code-color">Resend code</span></div>
      <div v-else class="s-c-t-verification">New verification code sent {{ countdown }}s</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, nextTick, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import codeInput from '@/components/CodeInput/index.vue'

export default defineComponent({
  name: 'verificationCode',
  components: { codeInput },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const data = reactive({
      codeEmail: '' as any,
      second: 30
    })
    const countdown = ref(0);

    const sendCode = async () => {
      // 模拟发送验证码的操作
      console.log('验证码已发送');
      // 设置计时器
      countdown.value = 60; // 假设验证码有效期为60秒
      const intervalId = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
        } else {
          clearInterval(intervalId);
        }
      }, 1000)
    }
    const codeInputFocus = ref(false);
    const checkCodeByEmail = () => {
      // if (!val || val.length < 6 
    }
    // 失去焦点
    const changeBlur = () => {
      // alert('er4');
      let htmlDom = document.documentElement;
      htmlDom.scrollTo(0, 0);
    }
    const changeFocus = () => {
      nextTick(() => {
        let htmlDom = document.documentElement;
        htmlDom.scrollTo(0, 0);
        setTimeout(() => {
          // htmlDom.scrollTo(0, 300);
        }, 100);
      });
    }
    onBeforeMount(() => {
    })
    onMounted(() => {
    })
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      codeInputFocus,
      countdown,
      checkCodeByEmail,
      changeBlur,
      changeFocus,
      sendCode
    };
  },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>