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
                        @blur="FormValidation('email', 'blur')"
                        :class="formError.email ? 'receive-con-input-wrong' : ''" class="receive-con-input " type="text"
                        v-model="formData.email" placeholder="Email">
                    <div v-if="formError.email" class="wrong-text">Your email is wrong</div>
            </div>
            <div class="proceed-btn">
                Proceed
            </div>
        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'

export default defineComponent({
    name: '',
    components:{HeaderBar},
    setup() {
       const route = useRoute();
       const router = useRouter();
       const data = reactive({
        headerTitle:'',
        formData:{
            email:''
        } as any,
        formError:{

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
       onBeforeMount(() => {
       })
       onMounted(() => {
       })
       watchEffect(()=>{
       })
       return {
         ...toRefs(data),
         FormValidClone,
         FormValidation
       };
  },
})

</script>
<style lang='scss' scoped src='./index.scss'>
</style>