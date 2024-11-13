import moment from 'moment';
// import { BigNumber } from 'bignumber.js';

// 千分位
export const formatNumberWithCommas = (num: number) => {
  if (Number(num)) {
    return Number(num).toLocaleString('en-US', { maximumFractionDigits: 10 });
  }
  return 0;
};

// 地址脱敏
export const handleAddressShow = (address: any) => {
  let prefix = address?.slice(0, 18);
  if (address?.length < 22) {
    prefix = address?.slice(0, 10);
  } else {
    prefix = address?.slice(0, 18);
  }
  const suffix = address?.substr(-4);
  const middle = '...';
  return `${prefix}${middle}${suffix}`;
};

// 邮箱脱敏
export const email_mask = (email: string): string => {
  return email.replace(/^(\w{4})(\w+)(@\w+\.\w+)$/, (match, p1, p2, p3) => {
    return p1 + '****' + p3;
  });
};

// 卡号格式化 4 位一个空格
export const card_mask = (a: string) => {
  if (a) {
    return a?.replace(/(\d{4})(?=\d)/g, '$1\u00A0\u00A0');
  } else {
    return '';
  }
};

// 卡号格式化 2 位一个空格
export const card_mask1 = (a: string) => {
  if (a) {
    return a?.replace(/(\d{4})(?=\d)/g, `$1\u00A0\u00A0`);
  } else {
    return '';
  }
};

// 卡号清除空格
export const card_clear = (a: string) => {
  return a?.replace(/\s/g, '');
};

// 卡号脱敏
export const card_mask2 = (a: string) => {
  if (a) {
    return a.replace(/(\d{4})(?=\d)/g, '****\u00A0\u00A0\u00A0\u00A0');
  } else {
    return '';
  }
};

// 百分制
// export const convertToPercentage = (num: number) => {
//   let numMber: any = new BigNumber(num);
//   if (numMber) {
//     return `${numMber.times(100)}%`;
//   } else {
//     return 0;
//   }
// };

// 日期格式化
export const formatDate = (date: string | number) => {
  if (date) {
    return moment.utc(date).format('YYYY-MM-DD  HH:mm:ss');
  } else {
    return '';
  }
};

// 日期格式化
export const formatDate1 = (date: string | number) => {
  return moment(date)?.format('YYYY-MM-DD');
};

// 格式化日期为/格式的防止在safair 浏览器上出现问题
export const formatDate2 = (date: string | number) => {
  if (date) {
    return moment(date)?.format('YYYY/MM/DD HH:mm:ss');
  }
  return 0;
};

export const formatDate2_1 = (date: string | number) => {
  if (date) {
    return moment(date)?.format('YYYY/MM/DD HH:mm');
  }
  return 0;
};

export const formatDate3 = (date: string | number) => {
  if (date) {
    return moment(date)?.format('YYYY/MM/DD');
  }
  return 0;
};

export const formatDate4 = (date: string | number) => {
  if (date) {
    return moment(date)?.format('YYYY.MM.DD');
  }
  return 0;
};

export const formatDate5 = (dateString: string | undefined) => {
  if (dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
    return formattedDate;
  }
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// 格式化日期为 这种格式 March 30, 2024
export const formatDateEN = (time: string) => {
  if (!time) {
    return 0;
  }
  let time1 = formatDate2(time);
  const date = new Date(time1);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  return `${month} ${day < 10 ? '0' : ''}${day}, ${year}`;
};

// 格式化日期为utc格式
export const formatDateUTC = (date: string | number) => {
  return moment(date).utc();
};

// 判断小数点位数
function checkDecimalPlaces(num: number) {
  // 将数字转换为字符串，并匹配小数点后面的数字
  const decimalMatches = String(num).match(/\.(\d+)/);
  // 如果存在小数部分并且小数位数大于 8，则返回 true
  return decimalMatches && decimalMatches[1].length > 8;
}

// 换算 多添加了一个字段 exchangeRate --> b 用于实体卡计算
// export const division = (a: any, b: any, c: any) => {
//   if (!b) {
//     const div: any = BigNumber(a).div(BigNumber(c));
//     if (checkDecimalPlaces(div)) {
//       return formatNumberWithCommas(div.toFixed(8));
//     }
//     return formatNumberWithCommas(div.toFixed());
//   } else {
//     const div1: any = BigNumber(a).div(BigNumber(b));
//     const div2: any = BigNumber(div1).div(BigNumber(c));
//     if (checkDecimalPlaces(div2)) {
//       return formatNumberWithCommas(div2.toFixed(8));
//     }
//     return formatNumberWithCommas(div2.toFixed());
//   }
// };

// 256 格式颜色转换成 rgba 格式
export const convertToRGBA = (hex: string, opacity: number) => {
  // 去除 # 号
  hex = hex.replace('#', '');
  // 将颜色值拆分成 R、G、B 分量
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // 返回 RGBA 格式字符串
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

interface CardInfo {
  cardType: number;
  cardPicture?: string;
  merchantLogo?: string;
  colorFont?: string;
}

interface BalanceColor {
  colorStyle: string;
  color: string;
}
/**
 * 根据卡片类型返回卡面信息(图片,文字颜色、卡面logo等)
 * [getCardInfo description]
 * @param {number} cardType [description]
 */
export function getCardInfo(cardType: number): { cardPicture: string; cardLogo: string; cardFontStyle: string; colorType: string; balanceColorObj: BalanceColor } {
  const cardList: CardInfo[] = JSON.parse(sessionStorage.getItem('merchantAllCardList') ?? '[]');
  // console.log('3423csd', JSON.stringify(cardList));
  const card = cardList?.find((item) => item.cardType == cardType);
  // console.log('3423cs23dcard', JSON.stringify(card));
  const cardPicture = card?.cardPicture ?? '';
  const cardLogo = card?.merchantLogo ?? '';
  const cardFontStyle = card?.colorFont ?? '';
  let balanceColorObj: BalanceColor;
  let colorType: string;

  if (cardFontStyle?.length > 30) {
    balanceColorObj = {
      colorStyle: 'color:#ffffff',
      color: '#ffffff',
    };
    colorType = 'golden';
  } else if (!cardFontStyle) {
    balanceColorObj = {
      colorStyle: 'color:#252830',
      color: '#252830',
    };
    colorType = 'black';
  } else {
    const startIndex = cardFontStyle.indexOf('#');
    const endIndex = cardFontStyle.indexOf(';');
    balanceColorObj = {
      colorStyle: `color:${cardFontStyle.substring(startIndex, endIndex)}`,
      color: cardFontStyle.substring(startIndex, endIndex),
    };
    colorType = cardFontStyle?.toLowerCase()?.includes('#fff') ? 'white' : 'black';
  }
  return {
    cardPicture,
    cardLogo,
    cardFontStyle,
    balanceColorObj,
    colorType,
  };
}

// 格式化金额输入框
export function digitalInputFormatter(str: string) {
  str += '';
  // 替换所有的非数字和小数点为空字符串
  let replacedStr = str.replace(/[^\d\.]/g, '');
  // 确保最多只有一个小数点
  const dotIndex = replacedStr.indexOf('.');
  if (dotIndex !== -1) {
    replacedStr = replacedStr.slice(0, dotIndex + 1) + replacedStr.slice(dotIndex + 1).replace(/\./g, '');
  }
  // 不能以数字0为开头
  if (/^0\d/.test(replacedStr)) {
    if (/^00+$/.test(replacedStr)) {
      replacedStr = '0';
    } else {
      replacedStr = replacedStr.replace(/^0+/, ''); // 去除数字0开头
    }
  }
  // 如果以.开头添加0前缀
  if (replacedStr.startsWith('.')) {
    replacedStr = '0' + replacedStr;
  }

  return replacedStr;
}

/**
 * 节流函数：限制函数在指定时间间隔内只执行一次。
 * @param {Function} func - 要执行的函数。
 * @param {number} wait - 两次执行之间的最小时间间隔（毫秒）。
 * @returns {Function} - 返回一个新的函数，用于包装原始函数并应用节流功能。
 */
export function throttle<F extends (...args: any[]) => void>(func: F, wait: number): (...args: Parameters<F>) => void {
  let lastTime = 0;
  return function (this: any, ...args: Parameters<F>) {
    const now = new Date().getTime();
    if (now - lastTime > wait) {
      lastTime = now;
      func.apply(this, args);
    }
  };
}

/**
 * 防抖函数：在事件被触发 n 毫秒后，才会执行回调函数。如果再次触发该事件，则重新计算延迟时间。
 * @param {Function} func - 要执行的函数。
 * @param {number} wait - 等待延迟时间（毫秒）。
 * @param {boolean} immediate - 是否立即执行回调函数。
 * @returns {Function} - 返回一个新的函数，用于包装原始函数并应用防抖功能。
 */
export function debounce<F extends (...args: any[]) => void>(func: F, wait: number, immediate: boolean = false): (...args: Parameters<F>) => void {
  let timeout: any;
  return function (this: any, ...args: Parameters<F>) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

/**
 * 统一处理错误提示
 * @param {any} errMsg - 错误提示信息
 */
export const errorMessage = (errMsg: any, duration: number = 3000) => {
  const sucMsgIcon = new URL('@/assets/images/dark/err_msg_icon.png', import.meta.url).href;
  window.$message?.error(errMsg, {
    duration: duration,
    icon: () => h('img', { src: sucMsgIcon, className: 'message-icon' }),
  });
};
/**
 * 统一处理成功提示
 * @param {any} errMsg - 错误提示信息
 */
export const successMessage = (msg: any, duration: number = 3000) => {
  const sucMsgIcon = new URL('@/assets/images/dark/suc_msg_icon.png', import.meta.url).href;
  window.$message?.error(msg, {
    duration: duration,
    icon: () => h('img', { src: sucMsgIcon, className: 'message-icon' }),
  });
};

/**
 * @description 创建时区字符串
 */
export const createTimeZoneString = () => {
  // 创建一个新的日期对象
  var date = new Date();
  // 获取时区偏移，单位为分钟
  var offsetMinutes = date.getTimezoneOffset();
  // 将分钟转换为小时和分钟
  var offsetHours = Math.abs(offsetMinutes / 60);
  // var offsetMinutesPart = Math.abs(offsetMinutes % 60);
  // 确定时区方向（东西）
  var offsetDirection = offsetMinutes > 0 ? '-' : '+';
  // 构建时区字符串
  var timeZone = 'UTC' + offsetDirection + offsetHours;

  // console.log(timeZone);
  return timeZone;
};

/**
 * @description 定义存储逻辑
 * @param type 1 sessionStorage 2 localStorage
 * @param name
 * @param value
 */
export const setPersistStore = (type: string = '1', name: string, value: string) => {
  if (type === '1') {
    window.sessionStorage.setItem(name, value);
  } else if (type === '2') {
    window.localStorage.setItem(name, value);
  }
};

/**
 * @description 定义获取逻辑
 */
export const getPersistStore = (type: string = '1', name: string) => {
  if (type === '1') {
    return window.sessionStorage.getItem(name);
  } else if (type === '2') {
    return window.localStorage.getItem(name);
  }
};

/**
 * @description 获取所有的值
 */
export const getAllsessionStore = () => {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key: string = sessionStorage.key(i) as string;
    const value: string = sessionStorage.getItem(key) as string;
    // 将键值对存入 localStorage
    localStorage.setItem(key, value);
  }
};

export const getAlllocalStorage = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key: string = localStorage.key(i) as string;
    const value: string = localStorage.getItem(key) as string;

    // 将键值对存入 sessionStorage
    sessionStorage.setItem(key, value);
  }
};

/**
 * @description 处理所有状态页面
 */
export const handleStatePage = () => {
  const router = useRouter();
  router.push('/home');
};

// 用于数据mock
export const mockOrderList = () => {
  let phyTranList = {
    cardNo: '5554748800062765',
    currency: 'EUR',
    amount: -100,
    fee: 1,
    currencyTxn: 'EUR',
    txnAmount: -10,
    businessDate: '2023-12-14 11:52:51',
    tradeId: '85493408',
    authCode: '29334290',
    tradeType: 151,
    tradeStatus: 1,
    remark: 'Mock 测试添加交易记录',
    no: '1184825327508131840',
    exchangeRate: null,
  };
  let phyRech = {
    type: '2',
    num: '100217026232334260413',
    orderCurrency: 'EUR',
    merchantNum: 'TEST000001',
    amount: 16.65,
    payAmount: 16.65,
    cardAmount: 15,
    applyFee: null,
    rechargeFee: 0.15,
    networkFee: null,
    cryptoCurrency: 'USDT',
    cryptoCurrencyVolume: 16.65,
    payCryptoCurrencyVolume: 16.65,
    network: 'BSC',
    userId: 123123345,
    status: 'SUCCESS',
    createTime: '2023-12-15 14:53:55',
    payCardAmount: 15,
    failReason: null,
    exchangeRate: 1.098436,
    merchantCommissionFee: 0,
    merchantCommissionRate: 0,
    rechargeCommissionFee: 0.15,
  };
  let virTranList = [
    {
      tradeName: 'Small Purchase Fee (LETSGO NETWORK INCORPO)',
      tradeDate: '2023-12-16 18:07:10',
      tradeAmount: '-0.50USD',
      tradeStatus: 'FEE',
      reason: null,
      desc: 'Small Purchase Fee -Under 40USD :0.5USD',
      currency: 'USD',
    },
    {
      tradeName: 'LETSGO NETWORK INCORPO',
      tradeDate: '2023-12-16 18:07:07',
      tradeAmount: '-2.99USD',
      tradeStatus: 'PENDING',
      reason: '',
      desc: '',
      currency: 'USD',
    },
    {
      tradeName: 'Small Purchase Fee (LETSGO NETWORK INCORPO)',
      tradeDate: '2023-12-16 18:06:49',
      tradeAmount: '-0.50USD',
      tradeStatus: 'FEE',
      reason: null,
      desc: 'Small Purchase Fee -Under 40USD :0.5USD',
      currency: 'USD',
    },
    {
      tradeName: 'LETSGO NETWORK INCORPO',
      tradeDate: '2023-12-16 18:06:46',
      tradeAmount: '-53.99USD',
      tradeStatus: 'DECLINED',
      reason: 'LIFE_TIME_AMOUNT_EXCEEDED',
      desc: '',
      currency: 'USD',
    },
    {
      tradeName: 'Small Purchase Fee (LETSGO NETWORK INCORPO)',
      tradeDate: '2023-12-16 18:06:31',
      tradeAmount: '-0.50USD',
      tradeStatus: 'FEE',
      reason: null,
      desc: 'Small Purchase Fee -Under 40USD :0.5USD',
      currency: 'USD',
    },
    {
      tradeName: 'LETSGO NETWORK INCORPO',
      tradeDate: '2023-12-16 18:06:28',
      tradeAmount: '0.00USD',
      tradeStatus: 'REVERSED',
      reason: '',
      desc: '',
      currency: 'USD',
    },
  ];
  let virRech = {
    type: '2',
    num: '100217027206446070331',
    orderCurrency: 'USD',
    merchantNum: 'TEST000001',
    amount: 15.15,
    payAmount: 15.15,
    cardAmount: 15,
    applyFee: 0,
    rechargeFee: 0.15,
    networkFee: null,
    cryptoCurrency: 'USDT',
    cryptoCurrencyVolume: 15.15,
    payCryptoCurrencyVolume: 15.15,
    network: 'BSC',
    userId: 54,
    status: 'SUCCESS',
    createTime: '2023-12-16 17:57:25',
    payCardAmount: 15,
    failReason: null,
    exchangeRate: 1,
    merchantCommissionFee: 0,
    merchantCommissionRate: 0,
    rechargeCommissionFee: 0.15,
  };
  let virW = {
    type: '3',
    num: '100217024629626850377',
    merchantNum: 'TEST000001',
    amount: 13,
    payAmount: null,
    cardAmount: 13,
    applyFee: null,
    rechargeFee: null,
    networkFee: 1,
    cryptoCurrency: 'USDT',
    cryptoCurrencyVolume: 12,
    payCryptoCurrencyVolume: 13,
    cryptoExchangeRate: 0,
    network: 'TRX',
    userId: 182,
    status: 'REFUND',
    createTime: '2023-12-13 18:22:50',
    failReason: null,
  };

  let obj = [];
  for (var i = 0; i < 20; i++) {
    obj.push(phyTranList);
  }
  return obj;
};

export const gatePayTokens = [
  {
    network: 'ETH',
    networkLogoUrl: 'https://static.alchemypay.org/alchemypay/network-images/ETH.svg',
    coin: 'USDT',
    coinLogoUrl: 'https://static.alchemypay.org/alchemypay/crypto-images/USDT.png',
    name: 'Ethereum (ERC20)',
    addressRegex: '^(0x)[0-9A-Fa-f]{40}$',
    idIndex: 1,
  },

  {
    network: 'ARBITRUM',
    networkLogoUrl: 'https://static.alchemypay.org/alchemypay/network-images/ARBITRUM.svg',
    coin: 'USDT',
    coinLogoUrl: 'https://static.alchemypay.org/alchemypay/crypto-images/USDT.png',
    name: 'Arbitrum One',
    networkAddressRegex: '^(0x)[0-9A-Fa-f]{40}$|^.*\\.(arb)$',
    idIndex: 2,
  },

  // {
  //   network: 'TRX',
  //   networkLogoUrl: 'https://static.alchemypay.org/alchemypay/network-images/TRX.svg',
  //   coin: 'USDT',
  //   coinLogoUrl: 'https://static.alchemypay.org/alchemypay/crypto-images/USDT.png',
  //   name: 'Tron (TRC20)',
  //   addressRegex: '^T[1-9A-HJ-NP-Za-km-z]{33}$',
  //   idIndex: 1,
  // },
  // {
  //   network: 'SOL',
  //   networkLogoUrl: 'https://static.alchemypay.org/alchemypay/network-images/SOL.svg',
  //   coin: 'USDT',
  //   coinLogoUrl: 'https://static.alchemypay.org/alchemypay/crypto-images/USDT.png',
  //   name: 'SOL',
  //   addressRegex: '^[1-9A-HJ-NP-Za-km-z]{32,44}$',
  //   idIndex: 2,
  // },

  // {
  //   network: 'BSC',
  //   networkLogoUrl: 'https://static.alchemypay.org/alchemypay/network-images/BSC.svg',
  //   coin: 'USDT',
  //   coinLogoUrl: 'https://static.alchemypay.org/alchemypay/crypto-images/USDT.png',
  //   name: 'BNB Smart Chain (BEP20)',
  //   addressRegex: '^(0x)[0-9A-Fa-f]{40}$',
  //   idIndex: 0,
  // },
  // {
  //   network: 'TRX',
  //   networkLogoUrl: 'https://static.alchemypay.org/alchemypay/network-images/TRX.svg',
  //   coin: 'USDT',
  //   coinLogoUrl: 'https://static.alchemypay.org/alchemypay/crypto-images/USDT.png',
  //   name: 'Tron (TRC20)',
  //   addressRegex: '^T[1-9A-HJ-NP-Za-km-z]{33}$',
  //   idIndex: 1,
  // },

  // {
  //   network: 'SOL',
  //   networkLogoUrl: 'https://static.alchemypay.org/alchemypay/network-images/SOL.svg',
  //   coin: 'USDT',
  //   coinLogoUrl: 'https://static.alchemypay.org/alchemypay/crypto-images/USDT.png',
  //   name: 'SOL',
  //   addressRegex: '^[1-9A-HJ-NP-Za-km-z]{32,44}$',
  //   idIndex: 3,
  // },

  // // {
  // //   network: 'BSC',
  // //   networkLogoUrl: 'https://static.alchemypay.org/alchemypay/network-images/BSC.svg',
  // //   coin: 'ETH',
  // //   coinLogoUrl: 'https://static.alchemypay.org/alchemypay/crypto-images/ETH.png',
  // //   name: 'BNB Smart Chain (BEP20)',
  // //   addressRegex: '^(0x)[0-9A-Fa-f]{40}$',
  // //   idIndex: 4,
  // // },
  // {
  //   network: 'ETH',
  //   networkLogoUrl: 'https://static.alchemypay.org/alchemypay/network-images/ETH.svg',
  //   coin: 'ETH',
  //   coinLogoUrl: 'https://static.alchemypay.org/alchemypay/crypto-images/ETH.png',
  //   name: 'Ethereum (ERC20)',
  //   addressRegex: '^(0x)[0-9A-Fa-f]{40}$',
  //   idIndex: 5,
  // },
  // {
  //   network: 'BTC',
  //   networkLogoUrl: '',
  //   coin: 'BTC',
  //   coinLogoUrl: 'https://static.alchemypay.org/alchemypay/crypto-images/BTC.png',
  //   name: 'Bitcoin',
  //   addressRegex: '^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^[(bc1q)|(bc1p)][0-9A-Za-z]{37',
  //   idIndex: 6,
  // },
];
