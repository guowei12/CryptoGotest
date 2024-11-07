<!-- pc 端遮罩弹窗 -->
<template>
    <n-modal v-model:show="showModal" transform-origin="center" :mask-closable="maskClosable" @after-leave="closeDialog"
        @mask-click="clickMask">
        <div class="mask_contaner">
            <slot></slot>
        </div>
    </n-modal>
</template>

<script lang='ts'>
import { defineComponent, ref, defineEmits, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
export default defineComponent({
    name: 'mask',
    // emits:['clickMask'],
    props: {
        showModal: {
            type: [Boolean],
            required: false,
        },
        maskClosable: {
            type: [Boolean],
            required: false,
        }
    },
    setup(props) {
        const data = reactive({})
        const closeDialog = () => { };
        const emit = defineEmits<{
            (e: 'clickMask', value: boolean): void;
        }>();
        const clickMask = () => {
            emit('clickMask', false);
        };
        onMounted(() => {
        })
        watchEffect(() => {
        })
        return {
            ...toRefs(data),
            closeDialog
        };
    },
})

</script>
<style lang="scss" scoped>
.n-modal {
    // box-shadow: none !important;
}

.mask_contaner {
    background: var(--whiteBgColor);
    border-radius: 12px !important;
}
</style>