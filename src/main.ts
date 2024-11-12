import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/css/public.scss';
import '@/assets/css/multiplex.scss';
import '@/assets/fonts/fonts.scss';
import App from './App.vue'
import router from './router'
import vant from 'vant';
import 'vant/lib/index.css';
import pluginsAll from "./../common/plugins"
import i18n from './multilingual/index';
import moment from 'moment';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()

// moment.utc(...).local().format(...) UTC
// .local().format('YYYY-MM-DD HH:mm:ss')
import {
    // create naive ui
    create,
    // component
    NModal,
    NTooltip,
    NCheckbox
  } from 'naive-ui'
  const naive = create({
    components: [NTooltip,NCheckbox,NModal]
  })

const app = createApp(App)
app.config.globalProperties.$moment = moment;
pinia.use(piniaPluginPersistedstate)

app.use(vant)
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(naive)
app.use(pluginsAll)
app.mount('#app')
