// 区分ios 安卓
const android_phone = window.AANFT

const u = navigator.userAgent, app = navigator.appVersion;
const onAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
const onIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

const environmental = window.navigator.userAgent.toLowerCase();
const isWeixin = environmental.match(/MicroMessenger/i) == 'micromessenger';

export { android_phone, onAndroid, onIOS, isWeixin }