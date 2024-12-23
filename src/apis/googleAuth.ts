import http from "./https"

/*
 * 检查是否已绑定googleAuth 返回true和false
 */
export function existBindAuth() {
  return http.get('/api/card/googleAuth/existBindAuth');
}

/*
 * 获取Google Auth二维码
 */
export function getGoogleAuth() {
  return http.get('/api/card/googleAuth/getGoogleAuth');
}

/**
 * 发送GoogleAuth绑定邮箱验证码
 */

export function googleAuthSendEmail() {
  return http.get('/api/card/googleAuth/googleAuthSendEmail');
}

/**
 *  绑定验证码
 */
interface Data {
  emailCode: string;
  googleAuthCode: string;
}
export function bindAuth(data: Data) {
  return http.post(`/api/card/googleAuth/bindAuth`,data);
}

/**
 *  googleAuth验证 查看cvv
 */
export function googleAuthCheck(code: string, cardId: string) {
  return http.get(`/api/card/googleAuth/googleAuthCheck?googleCode=${code}&cardId=${cardId}`);
}
