function getUrlData() {
	/**
    * tempStr 格式是http://域名/路由?key=value&key=value...
    */
   let tempStr = window.location.href
   /**
   * tempArr 是一个字符串数组 格式是["key=value", "key=value", ...]
   */
   let tempArr = tempStr.split('?')[1] ? tempStr.split('?')[1].split('&') : []
   /**
   * returnArr 是要返回出去的数据对象 格式是 { key: value, key: value, ... }
   */
   let returnArr = {}
   tempArr.forEach(element => {
   returnArr[element.split('=')[0]] = element.split('=')[1]
   })
   /*输出日志*/
//    console.log(returnArr);
   return returnArr
}
// tid
function getUrlDataTid() {
	/**
    * tempStr 格式是http://域名/路由?key=value&key=value...
    */
   let tempStr = window.location.href
   /**
   * tempArr 是一个字符串数组 格式是["key=value", "key=value", ...]
   */
   let tempArr = tempStr.split('?')[2] ? tempStr.split('?')[2].split('&') : []
   /**
   * returnArr 是要返回出去的数据对象 格式是 { key: value, key: value, ... }
   */
   let returnArr = {}
   tempArr.forEach(element => {
   returnArr[element.split('=')[0]] = element.split('=')[1]
   })
   /*输出日志*/
//    console.log(returnArr);
   return returnArr
}
// tg 
function getUrlDataTg() {
	/**
    * tempStr 格式是http://域名/路由?key=value&key=value...
    */
   let tempStr = window.location.search
   /**
   * tempArr 是一个字符串数组 格式是["key=value", "key=value", ...]
   */
   let tempArr = tempStr.split('?')[1] ? tempStr.split('?')[1].split('&') : []
   /**
   * returnArr 是要返回出去的数据对象 格式是 { key: value, key: value, ... }
   */
   let returnArr = {}
   tempArr.forEach(element => {
   returnArr[element.split('=')[0]] = element.split('=')[1]
   })
   /*输出日志*/
//    console.log(returnArr);
   return returnArr
}
// 设定随机id
// export  function getDeviceIdentifier() {
//   let deviceId = '';
//   if (window.localStorage.getItem('deviceId')) {
//     deviceId = window.localStorage.getItem('deviceId');
//   } else {
//     let uniqueId = (navigator.userAgent + (new Date()).toISOString() + Math.random()).split('').sort(() => {
//       return 0.5 - Math.random();
//     }).join('');
//     deviceId = btoa(uniqueId);
//     window.localStorage.setItem('deviceId', deviceId);
//   }
//   return deviceId;
// }
// 设置缓存
function setCache(key, value, ttl) {
   // ttl 是缓存的生存时间，单位为毫秒
   localStorage.setItem(key, JSON.stringify({ value: value, expiry: Date.now() + ttl }));
}

// 获取缓存
function getCache(key) {
   const cache = JSON.parse(localStorage.getItem(key));
   if (cache && cache.expiry > Date.now()) {
       return cache.value;
   } else {
       localStorage.removeItem(key);
       return null;
   }
}

// 定期清除缓存
function clearCacheAfter(key, ttl) {
   setTimeout(() => {
       localStorage.removeItem(key);
   }, ttl);
}
export {
  getUrlData,
  getUrlDataTid,
  getUrlDataTg,
  setCache,
  getCache,
  clearCacheAfter
}
