<template>
  <div class="signin-code">
    <div class="signin-code-title">
      <div class="s-c-t-top">Verification Code</div>
      <div class="s-c-t-text">
        <div>Please enter the verification code send to</div>
        <div class="s-c-t-emial">John@gmail.com</div>
      </div>
      <codeInput :keyboard="false" :autofocus="codeInputFocus" v-model:data="codeEmail" @submitCode="checkCodeByEmail"
        @blur="changeBlur" @focus="changeFocus"></codeInput>
      <div v-if="countdown == 0" class="s-c-t-resend">Not received? <span @click="sendCode" class="code-color">Resend
          code</span></div>
      <div v-else class="s-c-t-verification">New verification code sent {{ countdown }}s</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, nextTick, reactive, toRefs, onBeforeMount, onMounted, watchEffect, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import codeInput from '@/components/CodeInput/index.vue'
// import { findCardSendEmail, findCardInfo } from '@/api/card';

export default defineComponent({
  name: 'verificationCode',
  components: { codeInput },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance() as any

    const data = reactive({
      codeEmail: '' as any,
      second: 30
    })
    const countdown = ref(0);
    // 点击发送验证码按钮
    const sendEmail = async () => {
      await sendCode()
      const returnData = {
        'data': { 'code': 0 }
      } as any
      //await findCardSendEmail();
      if (returnData.data.code === '0') {
        // const sucMsgIcon = new URL('@/assets/images/dark/suc_msg_icon.png', import.meta.url).href;
        // window.$message?.success(t('googleCode.tip'), {
        //   icon: () => h('img', { src: sucMsgIcon, className: 'message-icon' }),
        // });

        proxy.$successToast(returnData.data.msg, 5000)
      } else {
        // const sucMsgIcon = new URL('@/assets/images/dark/err_msg_icon.png', import.meta.url).href;
        // window.$message?.error(returnData.data.msg, {
        //   icon: () => h('img', { src: sucMsgIcon, className: 'message-icon' }),
        // });
        proxy.$successToast(returnData.data.msg, 'failToast', 5000)
      }
      codeInputFocus.value = true;
    };
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
    const checkCodeByEmail = (val: string) => {
      if (!val || val.length < 6 ) return;
      // 验证code成功展示卡信息详情
      // const returnData = await findCardInfo(val);
      const returnData = {
        'data': { 'code': 0 }
      } as any
      if (returnData.data.code === '0') {
        router.push('/');
        data.codeEmail = '';
      } else {
        changeBlur();
        data.codeEmail = '';
        proxy.$successToast(returnData.data.msg, 'failToast', 1000000)
      }
    }
    // 失去焦点
    const changeBlur = () => {
      // alert('er4');
      let htmlDom = document.documentElement;
      htmlDom.scrollTo(0, 0);
    }
    const changeFocus = () => {
      1
      nextTick(() => {
        let htmlDom = document.documentElement;
        htmlDom.scrollTo(0, 0);
        setTimeout(() => {
          htmlDom.scrollTo(0, 300);
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
      sendEmail,
      sendCode
    };
  },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>