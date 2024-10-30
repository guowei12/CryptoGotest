<template>
    <div class="">
        <van-overlay :show="true">
            <div class="ani-box">
                <LottieAni :src="lottieData" class="lottie-box" />
            </div>
            <!-- <span id="typed" style="white-space: pre-wrap;line-height: 30px;"></span> -->
            <div class="terminal-loader">
                <div class="typing-title">Continue on pop-up window</div>
                <div  class="typing-box">
                    <div>1. Connect with your account in the browser <div>
                    <div> 2. Return to here after completing the payment</div>
                </div>
                </div>
            </div>
                <!-- <div class="typing-box" id="typed"></div> -->
            </div>
        </van-overlay>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, computed, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LottieAni from "../lottie-web/index.vue";
import lottieData from '@/assets/js/aircraft.json';
import TypeIt from 'typeit'
/**
* 仓库
*/
export default defineComponent({
    name: '',
    components: { LottieAni },
    setup() {
        /**
        * 路由对象
        */
        const route = useRoute();
        /**
        * 路由实例
        */
        const router = useRouter();
        //console.log('1-开始创立组件-setup')
        /**
        * 数据局部
        */
        const data = reactive({})
        onBeforeMount(() => {
            //console.log('2.组件挂载页面之前执行----onBeforeMount')
        })
        onMounted(() => {

            // new TypeIt("#typed", {
            //     speed: 20,
            //     startDelay: 100,
            //     loop: false
            // })
            //     .type("1. Connect with your account in the browser   ", { delay: 100 })
            //     //   .move(null, { to: "START", instant: true, delay: 300 })
            //     .move(null, { to: "END" })
            //     .type('  <span class="font-semibold">2. Return to here after completing the payment</span>', {
            //         speed: 100,
            //     })
            //     .go();
            // const typed = new Typed('#typed', options);
        });
        watchEffect(() => {
        })
        return {
            ...toRefs(data),
            lottieData
        };
    },
})

</script>
<style>
    .ti-cursor{
        color: #1A72F6 !important;
        margin-left: 0.5px;
    }
    .typed-cursor {
        color: #1A72F6;
    }
</style>
<style lang='scss' scoped src='./index.css'></style>