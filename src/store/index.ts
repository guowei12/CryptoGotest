import { createPinia } from 'pinia';
import type { App } from 'vue';

// 引入持久化插件
import piniaPluginPersist from 'pinia-plugin-persist';

export function setupStore(app: App) {
  const store = createPinia();
  // 使用该插件
  store.use(piniaPluginPersist);
  app.use(store);
}

export * from './modules';
