import { createApp } from 'vue';
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import router from './router';
import 'element-plus/dist/index.css';
import './assets/css/icon.css';
// 字体
import './assets/fonts/font.scss'
import Loading from "@/components/loading/loadingPage/index.js";
import pluginsAll from "./utils/plugins"
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Loading)
app.use(pluginsAll)

// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount('#app');
