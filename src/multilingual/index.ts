import { createI18n } from 'vue-i18n';

// 自己的语言配置
import enLocale from './en';
import zhLocale from './zh';
import vieLocale from './vietnam';
import thaiLocale from './thai';

// 语言配置整合
const messages = {
  th:{
    ...thaiLocale
  },
  vi:{
    ...vieLocale,
  },
  en: {
    ...enLocale,
  },
  zh: {
    ...zhLocale,
  },
};
const lang = window.localStorage.getItem('locale') || 'en';
// 创建 i18n
const i18n = createI18n({
  legacy: false,
  globalInjection: true, // 全局模式，可以直接使用 $t
  locale: lang, // 默认语言,
  fallbackLocale: lang, // 默认语言
  messages: messages, // 多语言文件
});

export function useI18n() {
  const { t, locale } = i18n.global;
  return { t, locale };
}

export default i18n;
