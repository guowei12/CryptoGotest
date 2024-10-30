<template>
  <div class="header-container">
    <div class="header-default" v-if="qrCode">
      <div class="header-arrow-left">
        <img class="arrow-left" src="@/assets/images/header/arrow-left.png" alt="" srcset="">
      </div>
      <div class="header-default-right" @click="countryShow=!countryShow">
        <div class="header-default-con">
          <img class="header-default-img" :src="nowCountry.img" alt="" srcset="">
          <div class="header-default-text">{{ nowCountry.name }}</div>
        </div>
        <img :class="countryShow?'arrow-btm-set':'arrow-btm'" src="@/assets/images/header/arrow-btm.png" alt="" srcset="">
        <div :class="!countryShow?'country-list-show':'country-list'" v-if="countryShow">
          <div @click.stop="setCountry(item)" :class="nowCountry.name==item.name?'country-li-set':''" class="country-li" v-for="item,index in countryList" :key="index">
            <img class="country-li-img" :src="item.img" alt="" srcset="">
            <div class="country-li-text">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-already header-default" v-if="home">
      <div class="header-already-left">
        <img class="merchantLogo" :src="merchantLogo" alt="" srcset="">
        <div class="header-already-name">Sharon</div>
      </div>
        <img class="set-icon"  src="@/assets/images/header/set-icon.png" alt="" srcset="">
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
    home: {
      type: [Number, String, Boolean],
      required: false,
    },
    qrCode: {
      type: [Number, String, Boolean],
      required: false,
    },
    logo: {
      type: [String],
      required: false,
    },
    iconLoading: {
      type: [Number, String, Boolean],
      required: false,
    },
    noBack: {
      type: [Number, String, Boolean],
      required: false,
    },
    noICon: {
      type: [Number, String, Boolean],
      required: false,
    },
    back: {
      type: [Number, String, Boolean],
      required: false,
    },
    close: {
      type: [Number, String, Boolean],
      required: false,
    },
    orderType: {
      type: [Number, String, Boolean],
      required: false,
    },
    noBorder: {
      type: [Number, String, Boolean],
      required: false,
    },
  },
  components: {},
  setup(props,{emit}) {
    const { proxy } = getCurrentInstance() as any;
    const router = useRouter();
    const queryRoute = useRoute();
    const data = reactive({
      merchantLogo:props.logo?props.logo:new URL('@/assets/images/header/default-img.png', import.meta.url).href,
      countryList:[
        {img:new URL('@/assets/images/header/VN.png', import.meta.url).href,name:'Vietnam'},
        {img:new URL('@/assets/images/header/TH.png', import.meta.url).href,name:'Thailand'}
      ],
      nowCountry:{
        name:'Vietnam',
        img:new URL('@/assets/images/header/VN.png', import.meta.url).href
      },
      countryShow:false
    });
    onMounted(() => {
    });

    const infoMethods = {
      setCountry(ary: { img: string; name: string; }){
        data.nowCountry={...ary}
        data.countryShow=false
      },
      goBack() {
        // router.go(-1);
        window.history.go(-1);
        // emit('cancelFor',{
        //   cancel:true
        // })
      },
      goClose(){
        emit('cancelFor',{
          cancel:true
        })
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