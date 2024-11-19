<template>
    <div>
        <canvas ref="canvas" :width="size" :height="size"></canvas>
    </div>
</template>

<script>
import QRCode from "qrcode";
import { defineComponent, ref, reactive, toRefs, nextTick, onBeforeMount, onMounted, onActivated, watch } from 'vue';

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
        const canvas = ref(null)
        const data=reactive({
            text:'',
            iconUrl:'' ,
        })
        const generateQRCode = async () => {
            const canvasz = canvas.value
            const ctx = canvasz.getContext("2d");
            data.iconUrl=props.iconUrl
            data.text=props.text
            // 清空画布
            ctx.clearRect(0, 0, props.size, props.size);
            // 生成二维码
            await QRCode.toCanvas(canvasz, data.text, { width: props.size });
            // 在二维码中间绘制图标
            const icon = new Image();
            icon.src = data.iconUrl;
            icon.onload = () => {
                const iconX = (props.size - props.iconSize) / 2;
                const iconY = (props.size - props.iconSize) / 2;
                ctx.drawImage(icon, iconX, iconY, props.iconSize, props.iconSize);
            };
        }
        onMounted(async () => {
            await generateQRCode();
        })
        watch(
            () => props.iconUrl,
            (newVal) => {
                data.iconUrl = props.iconUrl;
                generateQRCode();
            }
        );
        watch(
            () => props.text,
            (newVal) => {
                data.text = props.text;
                generateQRCode();
            }
        );
        return {
            ...data,
            ...props,
            canvas,
            generateQRCode
        };
    }
})
</script>

<style scoped>
canvas {
    margin: -20px 0;
    /* border: 1px solid #ddd; */
}
</style>