<template>
    <div class="signin-con">
        <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
        <div class="signin-box">
            <div class="signin-box-edit">
                <div class="signin-box-edit-title">
                    Bind your email to enhance the security of your Wallet Management.
                </div>
                <div class="s-b-e-con">
                    <div class="s-b-e-title">Please enter your Email address</div>
                    <input @input="FormValidation('email', 'input')" @focus="FormValidClone('email')"
                        @blur="FormValidation('email', 'blur')" :class="formError.email ? 's-b-e-input-wrong' : ''"
                        class="s-b-e-input " type="text" v-model="formData.email" placeholder="Esther@example.com">
                    <div v-if="formError.email " class="wrong-text">You email is wrong</div>
                    <!-- <div v-else class="wrong-text-no">You email is wrong</div> -->
                </div>
                <div class="proceed-btn" @click="debounceBtn">
                    <div v-if="!nextShow" class="btn-class" :class="formData.email ? '' : 'btn-class-opacity'">
                        Proceed
                    </div>
                    <div v-else class="btn-class" :class="formData.email ? '' : 'btn-class-opacity'">
                        <van-loading type="spinner" size="24px" color="#000" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import verificationCode from './components/verificationCode/index.vue'
import { sendEmail, getTokenInfo } from '@/apis/api'
import { getToken } from '@/utils/token';

export default defineComponent({
    name: 'Signin',
    components: { HeaderBar, verificationCode },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const { proxy } = getCurrentInstance() as any
        const data = reactive({
            headerTitle: '',
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
        const setBtn = async () => {
            data.nextShow = false
            if (data.formData.email&&!data.formError.email) {
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
            } else if( data.formError.email) {
                proxy.$failToast('Invalid email', 'failToast', 3000)
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
        const debounceBtn=proxy.$debounce(setBtn, 2000)
        onBeforeMount(async () => {
            let stoken = getToken()
            if (stoken) {
                let res = await getTokenInfo({ stoken })
                if (res.data.code == 0) {
                    if (res.data.model) {
                        if (res.data.model.email) {
                            router.push({ path: '/' })
                        }
                    }

                } else {

                }
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
            getCode,
            debounceBtn
        };
    },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>