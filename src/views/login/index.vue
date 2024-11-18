<!-- pc -->
<template>
    <div class="login-con">
        <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
        <div class="login-box" v-if="showCode">
            <div class="login-box-edit">
                <div class="login-box-edit-title">
                    Login with Email
                </div>
                <div class="l-b-e-con">
                    <div class="l-b-e-title">Please enter your Email address</div>
                    <input @input="FormValidation('email', 'input')" @focus="FormValidClone('email')"
                        @blur="FormValidation('email', 'blur')" :class="formError.email ? 'l-b-e-input-wrong' : ''"
                        class="l-b-e-input " type="text" v-model="formData.email" placeholder="Esther@example.com">
                    <div class="l-b-e-agree">
                        <n-checkbox :class="checkVal ? 'active' : 'no_active'" v-model:checked="checkVal"
                            @update:checked="handleCheckedChange"> </n-checkbox>
                        <div class="agree-text">
                            I have read and agree to Alchemy pay‘s <span @click="goTermsOfService">
                                Terms of service
                            </span>
                            and
                            <span @click="goPrivacyPolicy">Privacy policy.</span>
                        </div>
                    </div>
                    <!-- <div v-if="formError.email&&nextShow" class="wrong-text">You email is wrong</div>
                    <div v-else class="wrong-text-no" >You email is wrong</div> -->
                </div>
                <div class="proceed-btn" @click="setBtn">
                    <div class="btn-class">
                        Sign in
                    </div>
                </div>
                <div class="sign-btn" @click="setBtn">
                    <div class="sign-btn-class">
                        <img class="google-icon" src="@/assets/images/google-icon.png" alt="" srcset="">
                        Sign in with Google
                    </div>
                </div>
            </div>
        </div>
        <verificationCode v-if="!showCode"></verificationCode>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import verificationCode from './components/verificationCode/index.vue'
import { sendEmail, getTokenInfo } from '@/apis/api'
import { getToken } from '@/utils/token';

export default defineComponent({
    name: 'Login',
    components: { HeaderBar, verificationCode },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const { proxy } = getCurrentInstance() as any
        const data = reactive({
            checkVal: false,
            headerTitle: 'Login',
            showCode: true,
            nextShow: false,
            formData: {
                email: ''
            } as any,
            formError: {

            } as any
        })
        // 输入框输入时清空错误显示
        const FormValidClone = (val: string) => {
            data.formError[val] = false;
        }
        //表单验证
        const FormValidation = (val: string, type: string) => {
            if (data.formData[val] == '') {
                data.formError[val] = false;
                return
            }

            if (val === "email") {
                let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                // console.log(data.formData.email)
                if (
                    !data.formData.email ||
                    !reg.test(data.formData.email)
                ) {
                    // console.log('no', reg.test(data.formData.email))
                    data.formError.email = true;
                } else {
                    data.formError.email = false;
                }
            }
        }
        const getCode = async () => {
            let params = {
                email: data.formData.email
            }
            let res = await sendEmail(params)
            if (res.data.code == 0) {
                localStorage.setItem('countdown', '60')
                return true
            } else {
                proxy.$failToast(res.data.msg, 'failToast', 3000)
                return false
            }
        }
        const setBtn = async () => {
            data.nextShow = false
            if (data.formError.email) {
                if (await getCode()) {
                    router.push({
                        name: 'scode',
                        params: {
                            email: data.formData.email
                        }
                    })
                    data.nextShow = true
                    return
                } else {

                }
                return
            }
        }
        const handleCheckedChange = (checked: boolean) => {
            data.checkVal = checked;
        };
        const goTermsOfService = () => {
            router.push('/termsOfService');
            // if (userStore.serverUrl) {
            // window?.open(userStore.serverUrl, '_blank');
            // } else {
            //     router.push('/termsOfService');
            // }
        };

        const goPrivacyPolicy = () => {
            router.push('/privacyPolicy');
            // if (userStore.privateUrl) {
            // window?.open(userStore.privateUrl, '_blank');
            // } else {
            //     router.push('/privacyPolicy');
            // }
        };
        onBeforeMount(async () => {
            let stoken = getToken()
            let res = await getTokenInfo({ stoken })
            if (res.data.code == 0) {
                if(res.data.model){
                    if(res.data.model.email){
                        router.push({ path: '/' })
                    }
                }
           
            } else {

            }
        })
        onMounted(() => {
            let user = JSON.parse(localStorage.getItem('user') as any)
            if (user?.email) {
                data.formData.email = user.email
            }
        })
        watchEffect(() => {
        })
        return {
            ...toRefs(data),
            FormValidClone,
            FormValidation,
            setBtn,
            handleCheckedChange,
            goTermsOfService,
            goPrivacyPolicy,
            getCode
        };
    },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>