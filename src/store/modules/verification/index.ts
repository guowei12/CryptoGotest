import { defineStore } from 'pinia';

export const useVerificationStore = defineStore('verification', {
  state() {
    return {
      googleState: <boolean>false,
      cvvSource: '',
      cvvShowModal: <boolean>false,
    };
  },
  actions: {
    setGoogleState(val: boolean) {
      this.googleState = val;
    },
    setSource(source: string) {
      this.cvvSource = source;
    },
    setShowModal(type: boolean) {
      this.cvvShowModal = type;
    },
  },
  getters: {
    googleVerification: (state: any) => state.googleState,
    source: (state: any) => state.cvvSource,
    showModal: (state: any) => state.cvvShowModal,
  },
  persist: {
    //这里存储默认使用的是session
    enabled: true,
    strategies: [
      {
        //key的名称
        key: 'useVerification',
        //更改默认存储，
        storage: sessionStorage,
        // 可以选择哪些进入local存储，这样就不用全部都进去存储了
        // 默认是全部进去存储
        // paths: []
      },
    ],
  },
});
