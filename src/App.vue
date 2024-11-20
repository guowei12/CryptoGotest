<template>
  <div id="app">
    <!-- <router-view v-if="isRouterAlive" v-slot="{ Component }">
      <keep-alive :include="keepAlive_list">
        <component :is="Component" :key="key" />
      </keep-alive>
    </router-view> -->
    <router-view v-if="isRouterAlive"></router-view>

  </div>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, watch, computed, reactive, toRefs, provide, nextTick, onMounted } from 'vue'
import useHook from './../common/useHook'
import { storeToRefs } from 'pinia'
import { useMain } from '@/store/index';
import { useRoute } from 'vue-router'
import { android_phone, onAndroid, onIOS } from '@/common/app.js'

export default defineComponent({
  components: {

  },
  setup() {
    let timer: any;
    const { handleScroll } = useHook()
    const couponStore = useMain();
    const { keepAlive_list } = storeToRefs(couponStore)
    watch(() => keepAlive_list, (to) => {
    }, { deep: true })
    const route = useRoute()
    let proxy = getCurrentInstance()!.proxy!
    const data = reactive({
      isRouterAlive: true
    })
    const key = computed(() => {
      return route.fullPath
    })
    // 局部组件刷新
    const reload = () => {
      data.isRouterAlive = false;
      nextTick(() => {
        data.isRouterAlive = true;
      });
    };
    provide("reload", reload);
    onMounted(() => {
      if (timer) {
        clearInterval(timer)
      }
      handleScroll()
      timer = window.addEventListener('resize', handleScroll);
      console.log(onAndroid)
    })
    watch(() => route, (to) => {
      if (onAndroid) {
        console.log('onAndroid',onAndroid)
        // if (window.AANFT) {
        //   let phoneType = window.AANFT.getPlatform()
        // }
      }else if(onIOS){
        console.log('onIOS',onIOS)
      }
    })
    return {
      ...toRefs(data),
      reload,
      key,
      route,
      keepAlive_list
    }
  },
})

</script>
<style lang='scss'>
#app {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}
@media only screen and (min-width: 300px) {
  #app {
    -webkit-overflow-scrolling: touch;
    // max-width: 375px;
    margin: 0 auto !important;
    // background-color: var(--bgColor);
  }
}
@media only screen and (min-width: 700px) {
  #app {
    position: relative;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height:100%;
    padding-top:6px;
    margin: 0 auto !important;
    background: #F7F7F7;
    // border: 0.1px solid #F7F7F7;
    border-radius: 16px;
    overflow-x: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 3px !important;
    }
      ::-webkit-scrollbar-thumb {
      width: 3px !important;
      background: transparent;
      border-radius: 24px;
    }
  }
}
</style>