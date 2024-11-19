<template>
    <div>
        <canvas ref="canvas" :width="size" :height="size"></canvas>
    </div>
</template>

<script>
import QRCode from "qrcode";
import { defineComponent, ref, reactive, toRefs, nextTick, onBeforeMount, onMounted, watch } from 'vue';

export default defineComponent({
    props: {
        text: {
            type: String,
            required: true
        },
        iconUrl: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            default: 200
        },
        iconSize: {
            type: Number,
            default: 40
        }
    },
    setup(props) {
        const generateQRCode = async () => {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext("2d");

            // 清空画布
            ctx.clearRect(0, 0, this.size, this.size);

            // 生成二维码
            await QRCode.toCanvas(canvas, this.text, { width: this.size });

            // 在二维码中间绘制图标
            const icon = new Image();
            icon.src = this.iconUrl;
            icon.onload = () => {
                const iconX = (this.size - this.iconSize) / 2;
                const iconY = (this.size - this.iconSize) / 2;
                ctx.drawImage(icon, iconX, iconY, this.iconSize, this.iconSize);
            };
        }
        onMounted(() => {
            generateQRCode();
        })
        return {
            ...props,
            generateQRCode
        };
    }
})
</script>

<style scoped>
canvas {
    border: 1px solid #ddd;
}
</style>