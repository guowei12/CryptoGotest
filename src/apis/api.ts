import http from "./https";

const Public = {

};
// 订单
const order={
  getInfo:"/open/api/order/info",//查询订单信息
  getPayInfo:"/open/api/findPayInfo",//查询支付信息
  getPayStatus:"/open/api/queryPayStatus",//查询支付状态
  cancelOrder:"/open/api/cancel",//支付取消
  postPay:"/open/api/pay"//支付
}
// 商户
const merchant = {
  getMerchant: "/api/merchant/findMerchantInfo",//获取商户信息
  getFindPayType: "/open/api/findPayType",//获取商户支付方式
  postPayment: "/open/api/payment",//商户支付
  getMeshUpdateStatus:"open/api/meshUpdateStatus",//查询MESH状态
  cancelPay:"/open/api/meshCancel",//mesh手动取消
}
const QRCode={
  getInfor:"/api/merchant/findMerchantByAppid",
  postQrPay:"/open/api/createOrder",
}
const wallet={
  getToken:"/open/api/wallet/accept"
}
export function getWalletToken(data:any) {
  return http.get(`${wallet.getToken}?crypto=${data.crypto}&network=${data.network}`);
}
export function UsePayment(data) {
  return http.post(`${merchant.postPayment}`, data);
}
// 支付
export function pustPayInfo(data) {
  return http.post(`${order.postPay}`,data);
}
// 获取支付结果
export function getPayStatusInfo(data:any) {
  return http.get(`${order.getPayStatus}/${data.orderNo}`);
}
// 获取支付结果mesh
export function getMeshStatus(data:any) {
  return http.get(`${merchant.getMeshUpdateStatus}/${data.orderNo}`);
}
// 获取支付结果PCI_PAY
export function getPciStatus(data:any) {
  return http.get(`${merchant.getMeshUpdateStatus}/${data.orderNo}?tid=${data.tid}`);
}
// 获取支付结果walletConnect
export function getWalletConnectStatus(data:any) {
  return http.get(`${merchant.getMeshUpdateStatus}/${data.orderNo}?tid=${data.hash}`);
}
// cancelPay
export function cancelMesh(data:any) {
  return http.get(`${merchant.cancelPay}/${data.orderNo}`);
}
// 查询支付信息
export function getPayInfo(data: any) {
  return http.get(`${order.getPayInfo}/${data.orderNo}`);
}
// 取消支付信息
export function cancelOrderInfo(data:any) {
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
  return http.post(`${QRCode.postQrPay}`,data);
}