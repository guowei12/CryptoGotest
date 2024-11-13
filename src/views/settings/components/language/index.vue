<template>
  <div class="language-con">
    <HeaderBar :title="headerTitle" :defaultH="true"></HeaderBar>
    <div class="language-list">
      <div class="language-list-li">
        <div :class="nowLanguage == item.langName ? 'set-language' : ''" class="language-li" @click="setLanguage(item)"
          v-for="item, index in LanguageList" :key="index">
          <div class="language-li-left">
            <img class="language-li-left-icon" :src="item.langIcon" alt="" srcset="">
            <div :class="nowLanguage == item.langName ?'language-li-font':''">{{ item.langName }}</div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, inject, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import { useI18n } from '@/multilingual/index.ts';
import { getLanguageList } from '@/apis/api'

export default defineComponent({
  name: 'lang',
  components: { HeaderBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t, locale } = useI18n();
    const { proxy } = getCurrentInstance() as any
    const refresh = inject<any>("reload");
    const data = reactive({
      headerTitle: 'Displayed Currency',
      LanguageList: [] as any,
      // LanguageList: [
      //   {
      //     langName: 'English(US)',
      //     value: 'en',
      //     langIcon: new URL('@/assets/images/set/US-icon.png', import.meta.url).href,
      //   },
      //   {
      //     langName: 'Vietnamese',
      //     value: 'vi',
      //     langIcon: new URL('@/assets/images/set/VN-icon.png', import.meta.url).href,
      //   },
      //   {
      //     langName: 'Thai',
      //     value: 'th',
      //     langIcon: new URL('@/assets/images/set/TH-icon.png', import.meta.url).href,
      //   },
      //   //  {
      //   //   langName:'European Union',
      //   //   value:'eu',
      //   //   langIcon:new URL('@/assets/images/set/EU-icon.png', import.meta.url).href,
      //   //  },
      //   {
      //     langName: 'Hong Kong',
      //     value: 'zh',
      //     langIcon: new URL('@/assets/images/set/HK-icon.png', import.meta.url).href,
      //   },
      //   //  {
      //   //   langName:'Republik Indonesia',
      //   //   value:'RI',
      //   //   langIcon:new URL('@/assets/images/set/RI-icon.png', import.meta.url).href,
      //   //  },
      //   //  {
      //   //   langName:'Republic of Singapore',
      //   //   value:'RS',
      //   //   langIcon:new URL('@/assets/images/set/RS-icon.png', import.meta.url).href,
      //   //  }
      // ],
      nowLanguage: "English(US)"
    })
    onBeforeMount(() => {
    })
    onMounted(async () => {
      await getList()
      let locale = window.localStorage.getItem('locale') as any;
      if (['vi', 'th', 'en', 'zh'].includes(locale)) {
        data.LanguageList.forEach(item => {
          if (item.value == locale) {
            data.nowLanguage = item.name
          }
        })
      } else {
        locale.value = 'en'
        window.localStorage.setItem('locale', 'en');
      }
    })
    const setLanguage = async (item: any) => {
      data.nowLanguage = item.langName
      locale.value = item.langCode
      window.localStorage.setItem('locale', item.langCode);
      // await refresh();
      router.replace({ path: '/settings' })
    }
    const getList = async () => {
      let res = await getLanguageList()
      if (res.data.code == 0) {
        data.LanguageList = res.data.model
      } else {
        proxy.$failToast(res.data.msg, 'failToast', 3000)
        return
      }
    }
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      refresh,
      getList,
      setLanguage
    };
  },
})
</script>
<style lang='scss' scoped src='./index.scss'></style>