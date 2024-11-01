import { defineStore } from 'pinia';

export const usePhysicalCardStore = defineStore('physicalCard', {
  state() {
    return {
      isLossAuthGoogle: <boolean>false, // 挂失 谷歌认证
      isCancelLoss: <boolean>false, // 是不是取消挂失
    };
  },
  actions: {
    // 设置 实体卡走的google认证
    setLossAuthGoogle(flag: boolean) {
      this.isLossAuthGoogle = flag;
    },

    // 设置 当前状态是取消挂失
    setCancelLoss(flag: boolean) {
      this.isCancelLoss = flag;
    },
  },
  getters: {
    lossAuthGoogle: (state: any) => state.isLossAuthGoogle, // 挂失谷歌认证
    cancelLoss: (state: any) => state.isCancelLoss, // 挂失谷歌认证
  },
  persist: {
    //这里存储默认使用的是session
    enabled: true,
    strategies: [
      {
        //key的名称
        key: 'physicalCardStore',
        //更改默认存储，
        storage: sessionStorage,
        // 可以选择哪些进入local存储，这样就不用全部都进去存储了
        // 默认是全部进去存储
        // paths: []
      },
    ],
  },
});
