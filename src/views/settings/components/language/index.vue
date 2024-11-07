<template>
  <div class="language-con">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="language-list">
      <div class="language-list-li">
        <div :class="nowLanguage == item.name ? 'set-language' : ''" class="language-li" @click="setLanguage(item)"
          v-for="item, index in LanguageList" :key="index">
          <div class="language-li-left">
            <img class="language-li-left-icon" :src="item.img" alt="" srcset="">
            <div>{{ item.name }}</div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, inject, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import { useI18n } from '@/multilingual/index.ts';

export default defineComponent({
  name: 'lang',
  components: { HeaderBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t, locale } = useI18n();
    const refresh = inject<any>("reload");
    const data = reactive({
      headerTitle: 'Displayed Currency',
      LanguageList: [
        {
          name: 'English(US)',
          value: 'en',
          img: new URL('@/assets/images/set/US-icon.png', import.meta.url).href,
        },
        {
          name: 'Vietnamese',
          value: 'vi',
          img: new URL('@/assets/images/set/VN-icon.png', import.meta.url).href,
        },
        {
          name: 'Thai',
          value: 'th',
          img: new URL('@/assets/images/set/TH-icon.png', import.meta.url).href,
        },
        //  {
        //   name:'European Union',
        //   value:'eu',
        //   img:new URL('@/assets/images/set/EU-icon.png', import.meta.url).href,
        //  },
        {
          name: 'Hong Kong',
          value: 'zh',
          img: new URL('@/assets/images/set/HK-icon.png', import.meta.url).href,
        },
        //  {
        //   name:'Republik Indonesia',
        //   value:'RI',
        //   img:new URL('@/assets/images/set/RI-icon.png', import.meta.url).href,
        //  },
        //  {
        //   name:'Republic of Singapore',
        //   value:'RS',
        //   img:new URL('@/assets/images/set/RS-icon.png', import.meta.url).href,
        //  }
      ],
      nowLanguage: "English(US)"
    })
    onBeforeMount(() => {
    })
    onMounted(() => {
      let locale = window.localStorage.getItem('locale') as any;
      if (['vi', 'th', 'en', 'zh'].includes(locale)) {
        data.LanguageList.forEach(item => {
          if (item.value == locale) {
            data.nowLanguage = item.name
          }
        })
      }else{
        locale.value = 'en'
        window.localStorage.setItem('locale', 'en');
      }
    })
    const setLanguage = async (item: any) => {
      data.nowLanguage = item.name
      locale.value = item.value
      window.localStorage.setItem('locale', item.value);
      // await refresh();
      router.replace({ path: '/settings' })
    }
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      refresh,
      setLanguage
    };
  },
})
</script>
<style lang='scss' scoped src='./index.scss'></style>