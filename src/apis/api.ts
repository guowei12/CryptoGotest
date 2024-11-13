import http from "./https";

const Public = {
  getFait: "/api/config/faitList", //查询支付的法币币种
  getFaitLi:"/api/config/faitLimit", //查询法币币种详情
  getLanguage:"/api/config/languageList", //查询支持的语言
  code: "/api/scanCode", //扫码
  order: "/api/createOrder"// 下单
};
const login = {
  onLogin: "/api/login/in",//登录
  inWattle: "/api/login/initWattle",//初始化钱包
  seEmail: "/api/login/sendEmail",//发送验证码
  tokenIn: "/api/login/tokenInfo"//查询token
}
const wallet = {
  getToken: "/open/api/wallet/accept",
  balances: "/api/wallet/account/balances",//钱包账户余额
  history: '/api/wallet/account/history',//钱包充值赎回记录
  walletRecordDetail: "/api/wallet/account/queryWalletRecordDetail",//钱包记录详情
  transHistory: "/api/wallet/account/transactionHistory",//钱包交易记录
}
const operate = {
  address: "/api/wallet/operate/findAddress", //获取充值地址
  network: "/api/wallet/operate/findNetwork", //根据token获取网络
  tokens: "/api/wallet/operate/findTokens", //获取所有token
  networkFree: "/api/wallet/operate/getNetworkFree", //获取网络费
  withdraw: "/api/wallet/operate/withdraw" //提现
}

// 订单
const order = {
  getInfo: "/open/api/order/info",//查询订单信息
  getPayInfo: "/open/api/findPayInfo",//查询支付信息
  getPayStatus: "/open/api/queryPayStatus",//查询支付状态
  cancelOrder: "/open/api/cancel",//支付取消
  postPay: "/open/api/pay"//支付
}
// 商户
const merchant = {
  getMerchant: "/api/merchant/findMerchantInfo",//获取商户信息
  getFindPayType: "/open/api/findPayType",//获取商户支付方式
  postPayment: "/open/api/payment",//商户支付
  getMeshUpdateStatus: "open/api/meshUpdateStatus",//查询MESH状态
  cancelPay: "/open/api/meshCancel",//mesh手动取消
}
const QRCode = {
  getInfor: "/api/merchant/findMerchantByAppid",
  postQrPay: "/open/api/createOrder"
}


export function getFaitList() {
  return http.get(`${Public.getFait}`);
}
export function getFaitLimit(currency: any) {
  return http.get(`${Public.getFaitLi}?currency=${currency}`);
}
export function getLanguageList() {
  return http.get(`${Public.getLanguage}`);
}
export function scanCode(code: any, currency: any) {
  return http.get(`${Public.code}?code=${code}&currency=${currency}`);
}

export function createOrder(data: any) {
  return http.post(`${Public.order}`, data);
}
export function sendLogin(data: any) {
  return http.post(`${login.onLogin}`, data);
}
export function sendEmail(data: any) {
  return http.post(`${login.seEmail}`, data);
}
export function getTokenInfo(data: any) {
  return http.post(`${login.tokenIn}`, data);
}
export function initWattle() {
  return http.get(`${login.inWattle}`);
}
export function getAddress(token: any, network: any) {
  return http.get(`${operate.address}?token=${token}&network=${network}`);
}
export function getNetwork(token: any) {
  return http.get(`${operate.network}?token=${token}`);
}
export function getTokens() {
  return http.get(`${operate.tokens}`);
}
export function getNetworkFree(token: any, network: any) {
  return http.get(`${operate.networkFree}?token=${token}&network=${network}`);
}
export function putWithdraw(data: any) {
  return http.post(`${operate.withdraw}`, data);
}
export function getBalances(faitCurrency: any) {
  return http.get(`${wallet.balances}?currency=${faitCurrency}`);
}
export function getHistory(pageNo: any, pageSize: any, type: any) {
  return http.get(`${wallet.history}?pageNo=${pageNo}&pageSize=${pageSize}&type=${type}`);
}
export function getWalletRecordDetail(id: string, type: string) {
  return http.get(`${wallet.walletRecordDetail}?id=${id}&type=${type}`);
}
export function getTransHistory(pageNo: number, pageSize: number) {
  return http.get(`${wallet.transHistory}?pageNo=${pageNo}&pageSize=${pageSize}`);
}








export function getWalletToken(data: any) {
  return http.get(`${wallet.getToken}?crypto=${data.crypto}&network=${data.network}`);
}
export function UsePayment(data) {
  return http.post(`${merchant.postPayment}`, data);
}
// 支付
export function pustPayInfo(data) {
  return http.post(`${order.postPay}`, data);
}
// 获取支付结果
export function getPayStatusInfo(data: any) {
  return http.get(`${order.getPayStatus}/${data.orderNo}`);
}
// 获取支付结果mesh
export function getMeshStatus(data: any) {
  return http.get(`${merchant.getMeshUpdateStatus}/${data.orderNo}`);
}
// 获取支付结果PCI_PAY
export function getPciStatus(data: any) {
  return http.get(`${merchant.getMeshUpdateStatus}/${data.orderNo}?tid=${data.tid}`);
}
// 获取支付结果walletConnect
export function getWalletConnectStatus(data: any) {
  return http.get(`${merchant.getMeshUpdateStatus}/${data.orderNo}?tid=${data.hash}`);
}
// cancelPay
export function cancelMesh(data: any) {
  return http.get(`${merchant.cancelPay}/${data.orderNo}`);
}
// 查询支付信息
export function getPayInfo(data: any) {
  return http.get(`${order.getPayInfo}/${data.orderNo}`);
}
// 取消支付信息
export function cancelOrderInfo(data: any) {
  return http.get(`${order.cancelOrder}/${data.orderNo}`);
}

// 查询订单信息
export function getOrderInfo(data: any) {
  return http.get(`${order.getInfo}?orderNo=${data.orderNo}`);
}
// 获取商户信息
export function getMerchantDetail(data: any) {
  return http.get(`${merchant.getMerchant}?merchantNo=${data.merchantNo}`);
}
// 获取商户支付方式
export function getMerchantPayType(data: any) {
  return http.get(`${merchant.getFindPayType}?orderNo=${data.orderNo}`);
}

// 获取二维码信息
export function getQrInfor(data: any) {
  return http.get(`${QRCode.getInfor}?appid=${data.appid}&faitCurrency=${data.faitCurrency}`);
}
// 二维码快捷支付
export function pustQrPay(data) {
  return http.post(`${QRCode.postQrPay}`, data);
}