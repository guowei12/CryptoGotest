<template>
  <div class="header-container">
    <div class="header-default" v-if="qrCode">
      <div class="header-arrow-left" @click="goBack">
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
        <img @click="goSettings" class="set-icon"  src="@/assets/images/header/set-icon.png" alt="" srcset="">
    </div>
    <div class="header-default-line" v-if="balance">
      <div class="header-arrow-left" @click="goBack">
        <img class="arrow-left" src="@/assets/images/header/arrow-left.png" alt="" srcset="">
      </div>
      <div class="header-balance">
        {{  title }}
      </div>
      <div class="header-default-right">
        <img @click="gohistory" class="header-list-icon" src="@/assets/images/header/list-icon.png" alt="" srcset="">
      </div>
    </div>
    <div class="header-default-init" v-if="defaultH">
      <div class="header-default-left" @click="goBack">
        <img class="arrow-left" src="@/assets/images/header/arrow-left.png" alt="" srcset="">
      </div>
      <div class="header-balance">
        <img v-if="currency" class="currency-icon" :src="currency" alt="" srcset="">
        {{  title }}
      </div>
    </div>
    <div class="header-default" v-if="headerLogo">
      <div class="header-arrow-left" @click="goBack">
        <img class="arrow-left" src="@/assets/images/header/arrow-left.png" alt="" srcset="">
      </div>
      <div class="header-balance">
        <img class="header-logo" :src="heLogo" alt="" srcset="">
      </div>
      <div>
      </div>
    </div>
    <div class="header-default-line" v-if="headerLanguage">
      <div>
      </div>
      <div class="header-balance">
        <img class="header-logo-la" :src="heLogo" alt="" srcset="">
      </div>
      <div v-if="noLanguage" class="header-default-right" @click="languageShow=!languageShow">
        <div class="header-default-con">
          <img class="header-default-img" :src="nowLanguage.img" alt="" srcset="">
          <div class="header-default-text-la">{{ nowLanguage.name }}</div>
        </div>
        <img :class="languageShow?'arrow-btm-set':'arrow-btm'" src="@/assets/images/header/arrow-btm.png" alt="" srcset="">
        <div :class="!languageShow?'country-list-show':'country-list'" v-if="languageShow">
          <div @click.stop="setLanguage(item)" :class="nowCountry.name==item.name?'country-li-set':''" class="country-li" v-for="item,index in LanguageList" :key="index">
            <img class="country-li-img" :src="item.img" alt="" srcset="">
            <div class="country-li-text">{{ item.name }}</div>
          </div>
        </div>
      </div>
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
    defaultH:{
      type: [Number, String, Boolean],
      required: false,
    },
    currency:{
      type: [String],
      required: false,
    },
    home: {
      type: [Number, String, Boolean],
      required: false,
    },
    qrCode: {
      type: [Number, String, Boolean],
      required: false,
    },
    balance: {
      type: [Number, String, Boolean],
      required: false,
    },
    headerLogo:{
      type: [Boolean],
      required: false,
    },
    headerLanguage:{
      type: [Boolean],
      required: false,
    },
    title: {
      type: [String],
      required: false,
    },
    logo: {
      type: [String],
      required: false,
    }
  },
  components: {},
  setup(props,{emit}) {
    const { proxy } = getCurrentInstance() as any;
    const router = useRouter();
    const queryRoute = useRoute();
    const data = reactive({
      merchantLogo:new URL('@/assets/images/header/default-img.png', import.meta.url).href,
      heLogo:new URL('@/assets/images/loading/aeon-logo.png', import.meta.url).href,
      countryList:[
        {img:new URL('@/assets/images/header/VN.png', import.meta.url).href,name:'Vietnam'},
        {img:new URL('@/assets/images/header/TH.png', import.meta.url).href,name:'Thailand'}
      ],
      nowCountry:{
        name:'Vietnam',
        img:new URL('@/assets/images/header/VN.png', import.meta.url).href
      },
      countryShow:false,
      languageShow:false,
      noLanguage:false,
      LanguageList:[
            {
            name:'EN-US',
            img:new URL('@/assets/images/set/US-icon.png', import.meta.url).href,
           },
           {
            name:'VN',
            img:new URL('@/assets/images/set/VN-icon.png', import.meta.url).href,
           },
           {
            name:'Thai',
            img:new URL('@/assets/images/set/TH-icon.png', import.meta.url).href,
           },
      ],
      nowLanguage:{
        name:'EN-US',
        img:new URL('@/assets/images/set/US-icon.png', import.meta.url).href,
      }
    });
    onMounted(() => {
      data.merchantLogo=props.logo?props.logo:new URL('@/assets/images/header/default-img.png', import.meta.url).href,
      data.heLogo=props.logo?props.logo:new URL('@/assets/images/loading/aeon-logo.png', import.meta.url).href
    });

    const infoMethods = {
      setCountry(ary: { img: string; name: string; }){
        data.nowCountry={...ary}
        data.countryShow=false
      },
      setLanguage(ary: { img: string; name: string; }){
        data.nowLanguage={...ary}
        data.languageShow=false
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
      },
      gohistory(){
        router.push({ path: '/history' })
      },
      goSettings(){
        router.push({ path: '/settings' })
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