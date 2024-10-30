<template>
  <div id="loading" v-show="visible">
    <!-- <div class="circle"></div> -->
    <Lottie width="50px" height="50px" :src="src" />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import { Lottie } from '../lottie-web'
export default defineComponent({
  name: "Loading",
  components: { Lottie },
  setup() {
    const initdata = reactive({
      src: new URL("../../../assets/jsonImg/loading.json", import.meta.url).href
    })
    // 控制组件的状态
    let visible = ref(false);
    // 显示组件
    let show = () => {
      visible.value = true;
    };
    // 隐藏组件
    let hide = () => {
      visible.value = false;
    };

    return { ...toRefs(initdata), visible, show, hide };
  },
});
</script>
<style scoped lang='scss'>
#loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.5);
}

@keyframes loading {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(160deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.circle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 6px solid rgba(0, 185, 140, 2);
  border-left-color: var(--mainBg);
  animation: loading 1s linear 1s infinite;
}
</style>


