<template>
    <div class="complete-box">
        <HeaderBar :logo="headerLogo" :headerLanguage="true"></HeaderBar>
        <div class="complete-con-box">
            <div class="complete-con">
                <img class="status-icon" src="@/assets/images/status/completed-icon.png" alt="" sizes="" srcset="">
                <div class="complete-title">20,000 VND</div>
                <div class="complete-text">Order Completed
                </div>
                <div class="complete-payment">
                    <div class="complete-payment-header">
                        <div class="complete-payment-header-title">Receiving account</div>
                        <div class="complete-payment-header-con">
                            <div class="complete-payment-header-left">
                                <img src="@/assets/images/status/momo-logo.png" alt="" srcset="">
                            </div>
                            <div class="complete-payment-header-li">
                                <div class="complete-payment-header-li-title">NGUYEN VANA</div>
                                <div class="complete-payment-header-li-text">
                                    <div>9019948815</div>
                                    <div class="complete-li-text-line">MB Bank</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dashed-line"></div>
                    <div class="complete-payment-con">
                        <div class="complete-payment-con-li">
                            <div class="complete-payment-con-li-title">OrderID</div>
                            <div class="complete-payment-con-li-text">
                                {{ orderId }}
                                <copyCon :copyHtml="orderId" />
                            </div>
                        </div>
                        <div class="complete-payment-con-li matop-24">
                            <div class="complete-payment-con-li-title">Total Payment</div>
                            <div class="complete-payment-con-li-text">
                                {{ orderId }}{{ currency }}
                            </div>
                        </div>
                        <div class="complete-payment-con-li matop-24">
                            <div class="complete-payment-con-li-title">Payment time</div>
                            <div class="complete-payment-con-li-text">
                                {{ time }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="complete-cont hidden-box"  ref="imageContainer">
                <img class="status-icon" src="@/assets/images/status/completed-icon.png" alt="" sizes="" srcset="">
                <div class="complete-title">20,000 VND</div>
                <div class="complete-text">Order Completed
                </div>
                <div class="complete-payment">
                    <div class="complete-payment-header">
                        <div class="complete-payment-header-title">Receiving account</div>
                        <div class="complete-payment-header-con">
                            <div class="complete-payment-header-left">
                                <img src="@/assets/images/status/momo-logo.png" alt="" srcset="">
                            </div>
                            <div class="complete-payment-header-li">
                                <div class="complete-payment-header-li-title">NGUYEN VANA</div>
                                <div class="complete-payment-header-li-text">
                                    <div>9019948815</div>
                                    <div class="complete-li-text-line">MB Bank</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dashed-line"></div>
                    <div class="complete-payment-con">
                        <div class="complete-payment-con-li">
                            <div class="complete-payment-con-li-title">OrderID</div>
                            <div class="complete-payment-con-li-text">
                                {{ orderId }}
                                <copyCon :copyHtml="orderId" />
                            </div>
                        </div>
                        <div class="complete-payment-con-li matop-24">
                            <div class="complete-payment-con-li-title">Total Payment</div>
                            <div class="complete-payment-con-li-text">
                                {{ orderId }}{{ currency }}
                            </div>
                        </div>
                        <div class="complete-payment-con-li matop-24">
                            <div class="complete-payment-con-li-title">Payment time</div>
                            <div class="complete-payment-con-li-text">
                                {{ time }}
                            </div>
                        </div>
                        <img res="canvas" id="watermark" src="@/assets/images/status/watermark-icon.png" alt="Logo" />
                    </div>
                </div>
            </div>
        </div>


        <div class="complete-btn">
            <div class="complete-btn-box" @click="generateImage">
                <img class="complete-btn-icon" src="@/assets/images/status/save-icon.png" alt="" srcset="">
                <div>Save</div>
            </div>
            <div class="complete-btn-box">
                <img class="complete-btn-icon" src="@/assets/images/status/home-icon.png" alt="" srcset="">
                <div>Back home</div>
            </div>
        </div>
        <img id="Image" v-if="imageUrl" :src="imageUrl" alt="Generated Image" />
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import copyCon from '@/components/copy/index.vue'
import html2canvas from 'html2canvas';

export default defineComponent({
    name: 'completeResult',
    components: { HeaderBar, copyCon },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const data = reactive({
            headerLogo: new URL('@/assets/images/status/aeon-logo.png', import.meta.url).href,
            orderId: '661bbbc10cf7f20007e4ff48',
            total: '20,000',
            currency: 'VND',
            time: '2024-04-14 18:19 (UTC+8)',
            watermark: new URL('@/assets/images/status/watermark-icon.png', import.meta.url).href
        })
        const imageContainer = ref(null) as any;
        const imageUrl = ref(null) as any;
        const generateImage = async () => {
            try {
                const canvas = await html2canvas(imageContainer.value);
                // 设置画布大小 
                // canvas.width = 375;
                // canvas.height = 521;
                imageUrl.value = canvas.toDataURL('image/png');
                downloadGeneratedImage(canvas)
                // drawWatermark(canvas, 'https://test-crypto-payment.alchemypay.org/watermark-icon.png')
            } catch (error) {
                console.error('生成图片失败:', error);
            }
        };

        const drawWatermark = (canvasz: HTMLCanvasElement, text: string) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d') as any;

            let img = document.getElementById('Image') as any
            canvas.width = 500;
            canvas.height = 500;
            ctx.drawImage(img, 0, 0);
            // const watermark = new Image();
            // ctx.drawImage(imageUrl.value, 0, 0, 687, 1104); // 开始画第一张
            // const watermark = document.getElementById('watermark') as any; // 获取水印图像
            const watermark = new Image();
            watermark.src = 'https://test-crypto-payment.alchemypay.org/watermark-icon.png'; // 水印图
            // watermark.crossOrigin = 'Anonymous';
            watermark.onload = () => {
                console.log(watermark)
                // 绘制水印图，位于右下角
                const watermarkSize = 100;
                const x = 100; // 右下角 X 坐标
                const y = 100; // 右下角 Y 坐标
                ctx.drawImage(watermark, 100, 100, 98, 98);
                // 将 canvas 转换为图片数据 URL
                imageUrl.value = canvas.toDataURL('image/png');

                // const imageUrl = canvas.toDataURL('image/png');
                // imageUrl.value = canvas.toDataURL('image/png');
                // document.querySelector('img').src = imageUrl; // 显示在页面中
            };
            // ctx.font = '20px Arial';
            // ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            // ctx.textAlign = 'center';
            // ctx.textBaseline = 'middle';
            // ctx.fillText('Watermark', 20, 50);
            // ctx.fillText(text, canvas.width / 2 - 80, canvas.height / 2 - 10);
        };
        // 下载动态生成的图片
        const downloadGeneratedImage = (canvas:HTMLCanvasElement) => {
            let oImg = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = oImg;
            link.download = 'complete-image.png'; // 设置下载的文件名
            link.click(); // 触发下载
        }
        onBeforeMount(() => {
        })
        onMounted(() => {
        })
        watchEffect(() => {
        })
        return {
            ...toRefs(data),
            imageContainer,
            imageUrl,
            generateImage,
            downloadGeneratedImage
        };
    },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>