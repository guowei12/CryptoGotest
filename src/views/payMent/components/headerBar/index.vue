<template>
  <div class="header-container">
    <div class="title-row"  >
      <!-- <img src="@/assets/images/back.png" class="back-icon" @click="goBack" /> -->
      <!-- <img  v-show="merchantLogo" :src="merchantLogo" class="logo-icon" /> -->
       <div class="logo-text">Payment</div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  onUpdated,
  getCurrentInstance,
  nextTick,
  watch,
  ref,
} from "vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  emit:['cancelFor'],
  props: {
    logo: {
      type: [String],
      required: false,
    },
    back: {
      type: [Number, String, Boolean],
      required: false,
    }
  },
  components: {},
  setup(props,{emit}) {
    const { proxy } = getCurrentInstance() as any;
    const router = useRouter();
    const queryRoute = useRoute();
    const data = reactive({
      merchantLogo:props.logo
    });
    onMounted(() => {
    });

    const infoMethods = {
      goBack() {
        // router.go(-1);
        window.history.go(-1);
        // emit('cancelFor',{
        //   cancel:true
        // })
      }
    };
    return {
      ...toRefs(data),
      props,
      router,
      queryRoute,
      ...infoMethods,
    };
  },
});
</script>
<style scoped lang='scss' src='./index.scss'></style>