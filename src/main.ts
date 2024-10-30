import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/css/public.scss';
import '@/assets/css/multiplex.scss';
import '@/assets/fonts/fonts.scss';
import App from './App.vue'
import router from './router'
import vant from 'vant';
import 'vant/lib/index.css';


const app = createApp(App)
app.use(vant)
app.use(createPinia())
app.use(router)
app.mount('#app')
