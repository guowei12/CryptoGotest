// plugins/debouncePlugin.js
import { debounce } from 'lodash';

export default {
  install(app) {
    app.config.globalProperties.$debounce = (fn, delay = 2000) => {
      return debounce(fn, delay);
    };
  }
};
