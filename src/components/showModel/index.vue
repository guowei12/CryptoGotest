<template>
  <div class="showModel-box">
    <n-drawer :style="verificationMethod?'height: 480px; border-top-right-radius: 24px; border-top-left-radius: 24px; overflow: hidden':'border-top-right-radius: 24px; border-top-left-radius: 24px; overflow: hidden'" v-model:show="showModal" resizable :placement="'bottom'" @mask-click="closeDialog"
       :trap-focus="trapFocus"
      :block-scroll="true">
      <n-drawer-content >
        <div class="code">
          <div>
            <div class="line"><span></span></div>
            <div class="header-title">
              <div v-if="!verificationMethod">Verification Method</div>
              <div v-else class="title1">
                <div v-if="verificationMethod === 'email'">Email Verification</div>
                <div v-if="verificationMethod === 'google'">Google Authenticator</div>
                <img class="switch-icon" @click="changeAuthMethod" src="@/assets/images/showModel/switch.png" alt="" />
              </div>
            </div>
          </div>
          <div class="main">
            <div class="cvv-list" v-if="!verificationMethod">
              <div class="cvv-item" @click="goEmailAuth">
                <img src="@/assets/images/showModel/email-logo.png" alt="" />
                <span>Email Verification</span>
              </div>
              <div class="cvv-item" @click="handleSelect('google')">
                <img src="@/assets/images/showModel/google-logo.png" alt="" />
                <span>Google Authenticator</span>
              </div>
            </div>
            <div class="email email-code" v-else-if="verificationMethod === 'email'">
              <div class="tip">Please enter the verification code send to </div>
              <div class="email">{{ email }}</div>
              <div class="code-input">
                <CodeInput :keyboard="true" :autofocus="codeInputFocus" v-model:data="codeEmail" @submitCode="checkCodeByEmail"
                  @blur="changeBlur" @focus="changeFocus"></CodeInput>
              </div>
              <div class="send-code-btn">
                <div class="btn" v-if="!time && !sentCode">
                  <a-button @click="sendEmail">Send code</a-button>
                </div>

                <div v-else-if="time && sentCode" class="text_line">
                  <span>New verification code sent <n-countdown :render="renderCountdown" :duration="59000"
                      @finish="handleFinish" /> s</span>
                </div>
                <div class="text_line" v-else-if="!time && sentCode">
                  <span>Not received?' <span class="color" @click="sendEmail">{{ $t('email.Resendcode')
                      }}</span></span>
                </div>
              </div>
            </div>
            <div class="google google-code" v-else-if="verificationMethod === 'google'">
              <div class="tip">Google Authenticator code</div>
              <div class="code-input">
                <CodeInput :autofocus="true" v-model:data="codeGoogle" @submitCode="checkCodeByGoogle"
                  @blur="changeBlur" @focus="changeFocus"></CodeInput>
              </div>
            </div>
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick, reactive, toRefs, onBeforeMount, onMounted, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NDrawer, NDrawerContent, NDatePicker, NSpace, type CountdownProps } from 'naive-ui'

import CodeInput from "@/components/CodeInput/index.vue"
export default defineComponent({
  name: '',
  components: { NDrawer, NDrawerContent,CodeInput },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const codeInputFocus = ref(false);
    const time = ref(0);
    const sentCode = ref(false);
    const data = reactive({
      showModal: true,
      verificationMethod: '',//email google
      verificationStore: {} as any,
      email: 'Jo****@gmail.com',
      codeEmail: '',
      codeGoogle: ''
    })
    const trapFocus = ref(true);
    const infoMethods = {
      closeDialog() {
        data.showModal = false
      },
      goEmailAuth() {
        data.verificationMethod = 'email';
      },
      handleSelect(key: string) {
        if (key === 'google') {
          // 判断是否进行了谷歌认证
          if (data.verificationStore.googleVerification) {
            data.verificationMethod = key;
          } else {
            router.push('/googleAuth');
          }
        } else {
          data.verificationMethod = key;
        }
      },
      changeAuthMethod() {
        data.verificationMethod = '';
      },
      // 失去焦点
      changeBlur() {
        // alert('er4');
        let htmlDom = document.documentElement;
        htmlDom.scrollTo(0, 0);
      },
      changeFocus() {
        nextTick(() => {
          let htmlDom = document.documentElement;
          htmlDom.scrollTo(0, 0);
          setTimeout(() => {
            // htmlDom.scrollTo(0, 300);
          }, 100);
        });
      },// 点击发送验证码按钮
      async sendEmail() {
        // sentCode.value = true;
        // time.value = 59 * 1000;
        // const returnData = await findCardSendEmail();
        // if (returnData.data.code === '0') {
        //   const sucMsgIcon = new URL('@/assets/images/dark/suc_msg_icon.png', import.meta.url).href;
        //   window.$message?.success(t('googleCode.tip'), {
        //     icon: () => h('img', { src: sucMsgIcon, className: 'message-icon' }),
        //   });
        // } else {
        //   const sucMsgIcon = new URL('@/assets/images/dark/err_msg_icon.png', import.meta.url).href;
        //   window.$message?.error(returnData.data.msg, {
        //     icon: () => h('img', { src: sucMsgIcon, className: 'message-icon' }),
        //   });
        // }
        codeInputFocus.value = true;
      },
      // 邮箱验证方式
      async checkCodeByEmail(val: string) {
        console.log(val)
        // if (!val || val.length < 6 || verificationMethod.value !== 'email') return;
        // // 验证code成功展示卡信息详情
        // const returnData = await findCardInfo(val);
        // if (returnData.data.code === '0') {
        //   cardStore.setCardCVVInfo(returnData.data.model);
        //   cardStore.setShowCVV(true);
        //   router.push('/cardInfo');
        //   codeEmail.value = '';
        // } else {
        //   changeBlur();
        //   closeCVVDialog();
        //   codeEmail.value = '';
        //   const sucMsgIcon = new URL('@/assets/images/dark/err_msg_icon.png', import.meta.url).href;
        //   window.$message?.error(returnData.data.msg, {
        //     icon: () => h('img', { src: sucMsgIcon, className: 'message-icon' }),
        //   });
        // }
      },
      // 谷歌验证方式
      async checkCodeByGoogle(val: string) {
        // if (!val || val.length !== 6 || verificationMethod.value !== 'google') return;
        // // 验证code成功展示卡信息详情
        // let cardId = sessionStorage.getItem('user_cardId') as string;
        // const returnData = await googleAuthCheck(val, cardId);
        // if (returnData.data.code === '0') {
        //   cardStore.setCardCVVInfo(returnData.data.model);
        //   cardStore.setShowCVV(true);
        //   if (appStore.equipmentType === 'pc') {
        //     router.push('/cardInfo');
        //     codeGoogle.value = '';
        //   } else {
        //     router.push('/cardInfo');
        //     cvvShowModal.value = false;
        //     showcvv.value = false;
        //     codeGoogle.value = '';
        //   }
        // } else {
        //   changeBlur();
        //   codeGoogle.value = '';
        //   closeCVVDialog();
        //   const sucMsgIcon = new URL('@/assets/images/dark/err_msg_icon.png', import.meta.url).href;
        //   window.$message?.error(returnData.data.msg, {
        //     icon: () => h('img', { src: sucMsgIcon, className: 'message-icon' }),
        //   });
        // }
      }
    }

    // 渲染倒计时
    const renderCountdown: CountdownProps['render'] = ({ hours, minutes, seconds }) => {
      return `${String(seconds).padStart(2, '0')}`;
    };
    // 倒计时结束
    const handleFinish = () => {
      time.value = 0;
    };
    onBeforeMount(() => {
      //console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      //console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    watchEffect(() => {
    })
    // 只有移动端使用该方式
    watch(data.codeEmail, (newVal:any) => {
      if (newVal.length >= 6) {
        infoMethods.checkCodeByEmail(newVal.replace(/[^\d]/g, ''));
      }
    });
    // 只有移动端使用该方式
    watch(data.codeGoogle, (newVal:any) => {
      if (newVal.length >= 6) {
        infoMethods.checkCodeByGoogle(newVal.replace(/[^\d]/g, ''));
      }
    });
    return {
      ...toRefs(data),
      trapFocus,
      codeInputFocus,
      time,
      sentCode,
      renderCountdown,
      handleFinish,
      ...infoMethods
    };
  },
})
</script>
<style lang='scss' scoped src='./index.scss'></style>