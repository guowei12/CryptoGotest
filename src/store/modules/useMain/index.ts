import { defineStore } from 'pinia'
// useMain  可以是 useUser、useCart 之类的名字 
// defineStore('main',{..}) 在devtools 就使用 main 这个名
export const useMain = defineStore('main', {
  // 相当于data
  state: () => {
    return {
      handleSize: 0,
      scrollSize: 0,
      orderNum: '',
      nowCrypto: {},
      cryptoList: [],
      orderDetail: {},
      deposit: {
        networkList: [],
        network: '',
        currency: '',
        address: ''
      },
      withdraw: {
        networkList: [],
        network: '',
        currency: '',
        address: '',
        url:''
      },
      singleCurrency:{}
    }
  },
  // 相当于计算属性
  getters: {
  },
  // 相当于vuex的 mutation + action，可以同时写同步和异步的代码
  actions: {
    SET_SCROLLSIZE(e) {
      this.scrollSize = e
    },
    SET_HANDLESIZE(e) {
      this.handleSize = e
    },
    SET_ORDERNUM(e) {
      this.orderNum = e
    },
    SET_NOWCRYPTO(e) {
      this.nowCrypto = e
    },
    SET_CRYPTOLIST(e) {
      this.cryptoList = e
    },
    SET_ORDERDETAIL(e) {
      this.orderDetail = e
    },
    SET_DEPOSIT(e) {
      this.deposit = e
    },
    SET_WITHDRAW(e) {
      this.withdraw = e
    },
    SET_SINGLECURRENCY(e) {
      this.singleCurrency = e
    }
  },
  // 额外配置
  persist: {
    key: 'piniaStore', //存储名称
    storage: sessionStorage, // 存储方式 默认存储在localStorage
    paths: null, //指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
  }
})