import { defineStore } from 'pinia'
// useMain  可以是 useUser、useCart 之类的名字 
// defineStore('main',{..}) 在devtools 就使用 main 这个名
export const useMain = defineStore('main', {
  // 相当于data
  state: () => {
    return {
      handleSize: 0,
      scrollSize: 0,
      orderNum:'',
      nowCrypto:{},
      cryptoList:[],
      deposit:{
        networkList:[],
        network:'',
        currency:'',
        address:''
      },
      withdraw:{
        networkList:[],
        network:'',
        currency:'',
        address:''
      },

    }
  },
  // 相当于计算属性
  getters: {
   
  },
  // 相当于vuex的 mutation + action，可以同时写同步和异步的代码
  actions: {
    SET_SCROLLSIZE(e){
     this.scrollSize=e
    },
    SET_HANDLESIZE(e) {
      this.handleSize = e
    },
    SET_ORDERNUM(e){
      this.orderNum = e
    },
    SET_NOWCRYPTO(e){
      this.nowCrypto = e
    },
    SET_CRYPTOLIST(e){
      this.cryptoList = e
    },
    SET_DEPOSIT(e){
      this.deposit = e
    },
    SET_WITHDRAW(e){
      this.withdraw = e 
    }
  },

})