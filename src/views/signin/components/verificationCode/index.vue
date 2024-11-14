<template>
  <div class="signin-code">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="signin-code-title">
      <div class="s-c-t-top">Verification Code</div>
      <div class="s-c-t-text">
        <div>Please enter the verification code send to</div>
        <div class="s-c-t-emial">John@gmail.com</div>
      </div>
      <codeInput v-if="email" :keyboard="false" :autofocus="codeInputFocus" v-model:data="codeEmail" @submitCode="checkCodeByEmail"
        @blur="changeBlur" @focus="changeFocus"></codeInput>
      <div v-if="countdown == 0" class="s-c-t-resend">Not received? <span @click="sendCode" class="code-color">Resend
          code</span></div>
      <div v-else class="s-c-t-verification">New verification code sent {{ countdown }}s</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, onDeactivated, nextTick, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import codeInput from '@/components/CodeInput/index.vue'
import { sendEmail, sendLogin } from '@/apis/api'
import HeaderBar from '@/components/headerBar/index.vue'
import { setToken, getToken, removeToken } from '@/utils/token';

export default defineComponent({
  name: 'verificationCode',
  components: { codeInput, HeaderBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance() as any
    const data = reactive({
      headerTitle: '',
      email:'' as any,
      codeEmail: '' as any,
      second: 30
    })
    const countdown = ref(0);
    const nowIntervalId = ref(null) as any;

    const sendCode = async () => {
      // 模拟发送验证码的操作
      console.log('验证码已发送');
      // 设置计时器
      countdown.value = 60; // 假设验证码有效期为60秒
      await getCode()
      nowIntervalId.value = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--;
          localStorage.setItem('countdown', countdown.value.toString())
        } else {
          clearInterval( nowIntervalId.value );
        }
      }, 1000)
    }
    const codeInputFocus = ref(false);
    // 
    const getCode = async () => {
      let params = {
        email: data.email
      }
      let res = await sendEmail(params)
      if (res.data.code == 0) {

      } else {
        proxy.$failToast(res.data.msg, 'failToast', 3000)

      }
    }
    const checkCodeByEmail = async (val: string | any[]) => {
      if (!val || val.length < 6) return;
      // 登录
      let params = {
        email: data.email,
        code: val
      }
      const returnData = await sendLogin(params);
      if (returnData.data.code === '0') {
        let user = {
          email: data.email,
          // model: returnData.data.model
        }
        setToken(returnData.data.model)
        window.localStorage.setItem('user', JSON.stringify(user))
        router.push('/');
        return
      } else if (returnData.data.code !== '2699') {
        // code.value = '';
        proxy.$failToast(returnData.data.msg, 'failToast', 3000)
        return
      } else {
        proxy.$failToast(returnData.data.msg, 'failToast', 3000)
      }
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
      clearInterval(nowIntervalId.value);
    })
    onMounted(async () => {
      data.email = route.params.email
      codeInputFocus.value = true
      countdown.value = Number(localStorage.getItem('countdown'))
      console.log(countdown.value)
      if (countdown.value != 0) {
        nowIntervalId.value = setInterval(() => {
          if (countdown.value > 0) {
            countdown.value--;
            localStorage.setItem('countdown', countdown.value.toString())
          } else {
            clearInterval(nowIntervalId.value);
          }
        }, 1000)
      }else{
      }
    })
    onDeactivated(()=>{
      proxy.$closeToast()
      if(nowIntervalId.value){
        clearInterval(nowIntervalId.value);
      }
    })
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      codeInputFocus,
      countdown,
      checkCodeByEmail,
      getCode,
      changeBlur,
      changeFocus,
      sendCode
    };
  },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>