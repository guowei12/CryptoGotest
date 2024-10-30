import http from "./https.ts";

const Public = {
  getLogin: '/merchant/manager/login/in', // 登录
  getLogout: '/merchant/manager/login/logout', // 退出登录
  getQueryUserInfo: '/merchant/manager/login/findMerchantInfo', // 查询商户信息
  getFindPercentage: '/merchant/manager/statistics/findPercentage', // 查询首页百分比
  getOrderTrend: '/merchant/manager/statistics/orderTrend', // 饼状图
  getPaymentTrend: '/merchant/manager/statistics/paymentTrend', // 首页曲线图
  getTransactionPage: '/merchant/manager/transaction/transactionPage', // 查询交易记录
  getRefundPage: '/merchant/manager/transaction/refundPage', // 查询退款记录
  getTransactionPageDownload: '/merchant/manager/transaction/transactionPageDownload', // 下载交易记录表
  getRefundPageDownload: '/merchant/manager/transaction/refundPageDownload', // 下载退款记录表
  getSettlementPage: '/merchant/manager/account/settlementPage', //入账记录
  getPreSettlementPage:'/merchant/manager/account/preSettlementPage',//预结算记录列表
  getWithdrawPage: '/merchant/manager/account/withdrawPage', //入账记录
  getFindAccountsFunds: '/merchant/manager/account/findAccountsFunds', // 商户资金查询
  getFindWithdrawInfo: '/merchant/manager/account/findWithdrawInfo', // 提现信息
  getFindWithdrawPending: '/merchant/manager/account/findWithdrawPending', // 查询提现中的
  getFindGoogleAuth: '/merchant/manager/login/findGoogleAuth', // 查询google auth二维码
  getBindGoogleAuth: '/merchant/manager/login/bindGoogleAuth',// 绑定google code
  getDeleteGoogleAuth: '/merchant/manager/login/deleteGoogleAuth', // 删除google code
  getWithdraw: '/merchant/manager/account/withdraw',//提现
  getSettlementPageDownload: '/merchant/manager/account/settlementPageDownload',//入账记录下载
  getWithdrawPageDownload: '/merchant/manager/account/withdrawPageDownload',//提现记录下载
  getAccountpreSettlementPageDownload:'/merchant/manager/account/preSettlementPageDownload',//预结算下载
};
export function UseLogin(data) {
  return http.post(`${Public.getLogin}`, data);
}
export function UseLogout(data: any) {
  return http.get(`${Public.getLogout}`, data);
}
export function UseQueryUserInfo(data) {
  return http.get(`${Public.getQueryUserInfo}`, data);
}
export function UseFindPercentage(data: any) {
  return http.get(`${Public.getFindPercentage + "?type=" + data}`, data);
}
export function UseOrderTrend(startDate: any, endDate: any) {
  return http.get(`${Public.getOrderTrend + "?startDate=" + startDate + "&endDate=" + endDate}`);
}
export function UsePaymentTrend(startDate: any, endDate: any) {
  return http.get(`${Public.getPaymentTrend + "?startDate=" + startDate + "&endDate=" + endDate}`);
}
export function UseTransactionPage(data) {
  return http.post(`${Public.getTransactionPage}`, data);
}
export function UseRefundPage(data) {
  return http.post(`${Public.getRefundPage}`, data);
}
export function UseTransactionPageDownload(data) {
  return http.postFile(`${Public.getTransactionPageDownload}`, data);
}
export function UseRefundPageDownload(data) {
  return http.postFile(`${Public.getRefundPageDownload}`, data);
}
export function UseSettlementPage(data) {
  return http.post(`${Public.getSettlementPage}`, data);
}
export function UsePreSettlementPage(data) {
  return http.post(`${Public.getPreSettlementPage}`, data);
}
export function UseWithdrawPage(data) {
  return http.post(`${Public.getWithdrawPage}`, data);
}
export function UseFindAccountsFunds() {
  return http.get(`${Public.getFindAccountsFunds}`);
}
export function UseFindWithdrawInfo() {
  return http.get(`${Public.getFindWithdrawInfo}`);
}
export function UseFindWithdrawPending() {
  return http.get(`${Public.getFindWithdrawPending}`);
}
export function UseFindGoogleAuth(data) {
  return http.get(`${Public.getFindGoogleAuth}`, data);
}
export function UseBindGoogleAuth(googleCode: any) {
  return http.get(`${Public.getBindGoogleAuth + '?googleCode=' + googleCode}`);
}
export function UseDeleteGoogleAuth(googleCode: any) {
  return http.get(`${Public.getDeleteGoogleAuth + '?googleCode=' + googleCode}`);
}
export function UseWithdraw(data) {
  return http.post(`${Public.getWithdraw}`, data);
}
export function UseWithdrawPageDownload(data) {
  return http.postFile(`${Public.getWithdrawPageDownload}`, data);
}
export function UseAccountpreSettlementPageDownload(data) {
  return http.postFile(`${Public.getAccountpreSettlementPageDownload}`, data);
}
export function UseSettlementPageDownload(data) {
  return http.postFile(`${Public.getSettlementPageDownload}`, data);
}