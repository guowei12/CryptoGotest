import { defineStore } from 'pinia'
import { UseQueryUserInfo } from "@/api/api";
  export const useCounterStore = defineStore('user', {
    state: () => {
      return {
        userInfo: {} as any,
      };
    },
  actions: {
    // 查询商户信息
    async getQueryUserInfo(data:any) {
      const res = await UseQueryUserInfo(data);
      if (res.data.code === '0') {
        this.userInfo = res.data.model
      }
    },
  }
});