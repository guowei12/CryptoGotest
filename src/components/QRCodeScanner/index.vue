<template>
  <div>
    <QrStream :style="scannerStyle" @decode="handleDecode" @init="handleInit" @error="handleError">
      <template v-if="showCloseButton">
        <div class="qr-scanner-container">
          <div class="reader-header">
            <img @click="closeScanner" class="reader-header-logo" src="@/assets/images/qr/reader-header-logo.png" alt=""
              srcset="">
            Scan QR Code
          </div>
   
          <!-- <button class="close-view" >X</button> -->
          <div class="qr-scanner">
            <div class="qrImg-box">
             <img class="qrImg-box-img" v-for="item, index in qrImgList" :src="item" :key="index" alt="" srcset="">
            </div>
            <img class="a-top-left" src="@/assets/images/qr/top-left.png" alt="">
              <img class="a-top-right" src="@/assets/images/qr/top-right.png" alt="">
              <img class="a-btm-left" src="@/assets/images/qr/btm-left.png" alt="">
              <img class="a-btm-right" src="@/assets/images/qr/btm-right.png" alt="">
            <div class="box">
              <div class="line"></div>
              <div class="angle"></div>
            </div>
          </div>
          <div class="reader-btn">
            A pioneering Payment Association uniting the entire payment ecosystem to seamlessly bridge crypto and
            real-world
            transactions.
          </div>
        </div>
      </template>
    </QrStream>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import { QrStream } from 'vue3-qr-reader'

const emit = defineEmits(['decode', 'close'])
const qrImgList = [new URL('@/assets/images/qr/momo-qr.png', import.meta.url).href,
new URL('@/assets/images/qr/zalo-qr.png', import.meta.url).href,
new URL('@/assets/images/qr/viettel-qr.png', import.meta.url).href
]
const scannerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 9999,
}

const showCloseButton = ref(false)

const qrcodeData = ref(null)

const handleDecode = (data) => {
  console.log('Decoded data:', data)
  alert(data)
  emit('decode', data)
  qrcodeData.value = data

}

const closeScanner = () => {
  emit('close')
}

const handleInit = async (promise) => {
  try {
    const { capabilities } = await promise
    console.log('Camera capabilities:', capabilities)
    showCloseButton.value = true
  } catch (error) {
    handleError(error)

  }
}

const handleError = (error) => {
  const errorMessages = {
    NotAllowedError: '您需要授予相机访问权限',
    NotFoundError: '这个设备上没有摄像头',
    NotSupportedError: '所需的安全上下文(HTTPS、本地主机)',
    NotReadableError: '相机被占用',
    OverconstrainedError: '安装摄像头不合适',
    StreamApiNotSupportedError: '此浏览器不支持流API',
    InsecureContextError: '仅允许在安全上下文中访问摄像机。使用HTTPS或本地主机，而不是HTTP。',
  }

  const message = errorMessages[error.name] || 'ERROR: 摄像头错误'
  message.error(message)
  console.error(message)
}

defineExpose({ qrcodeData })
</script>

<style scoped lang="scss">
.qr-scanner-container {
  position: relative;
  width: 100%;
  height: 100%;
  max-height:812px;
  max-width: 375px;
  margin:  0 auto;

  .reader-header {
    width: 100%;
    position: absolute;
    top: 68px;
    text-align: center;
    height: 48px;
    font-size: 18px;
    line-height: 48px;
    color: #FFFFFF;
    font-family: 'sf-pro-display_bold_700';
    z-index: 200;

    .reader-header-logo {
      position: absolute;
      width: 48px;
      height: 48px;
      top: 0;
      left: 24px;
    }


  }

  .qrImg-box {
    position: absolute;
    left: 50%;
    top: calc(50% - 193px);
    transform: translate(-50%, -35%);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;

    .qrImg-box-img {
      width: 76px;
      height: 76px;
    }
  }

  .close-view {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 50%;
    background-color: #fff;
    color: #000;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    cursor: pointer;
    z-index: 1000000;
  }

  .reader-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-family: 'sf-pro-display_medium_500';
    line-height: 19.6px;
    color: #FFFFFF;
    text-align: center;
    width: calc(100% - 16px);
    position: absolute;
    bottom: 78px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 200;
  }
}

.qr-scanner {
  background-image: linear-gradient(0deg,
      transparent 24%,
      rgba(32, 255, 77, 0.1) 25%,
      rgba(32, 255, 77, 0.1) 26%,
      transparent 27%,
      transparent 74%,
      rgba(32, 255, 77, 0.1) 75%,
      rgba(32, 255, 77, 0.1) 76%,
      transparent 77%,
      transparent),
    linear-gradient(90deg,
      transparent 24%,
      rgba(32, 255, 77, 0.1) 25%,
      rgba(32, 255, 77, 0.1) 26%,
      transparent 27%,
      transparent 74%,
      rgba(32, 255, 77, 0.1) 75%,
      rgba(32, 255, 77, 0.1) 76%,
      transparent 77%,
      transparent);
  background-size: 3rem 3rem;
  background-position: -1rem -1rem;
  width: 100%;
  /* height: 100%; */
  height: 100vh;
  position: relative;
  background-color: #1110;

  /* background-color: #111; */
}

.qr-scanner .box {
  width: 264px;
  height: 264px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  /*border: 0.1rem solid rgba(0, 255, 51, 0.2);  */
  border: 0.1rem solid #D9D9D9;
  border-radius: 16.32px;
  /* background: url('http://resource.beige.world/imgs/gongconghao.png') no-repeat center center; */
}

.qr-scanner .line {
  height: calc(100% - 2px);
  width: 100%;
  background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #00ff33 211%);
  border-bottom: 3px solid #00ff33;
  transform: translateY(-100%);
  animation: radar-beam 2s infinite alternate;
  animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
  animation-delay: 1.4s;
}

.qr-scanner .box:after,
.qr-scanner .box:before,
.qr-scanner .angle:after,
.qr-scanner .angle:before {
  content: '';
  display: block;
  position: absolute;
  width: 3vw;
  height: 3vw;

  border: 0.2rem solid transparent;
}
.a-top-left{
  position: absolute;
  width: 64px;
  height: 64px;
  top: calc(50% - 157.1px);
  left:calc(50% - 157.1px);
  z-index: 10;
}
.a-top-right{
  position: absolute;
  width: 64px;
  height: 64px;
  top: calc(50% - 156px);
  right:calc(50% - 156px);
  z-index: 10;
}
.a-btm-left{
  position: absolute;
  width: 64px;
  height: 64px;
  bottom: calc(50% - 157px);
  left:calc(50% - 157px);
  z-index: 10;
}
.a-btm-right{
  position: absolute;
  width: 64px;
  height: 64px;
  bottom: calc(50% - 156px);
  right:calc(50% - 156px);
  z-index: 10;
}
.qr-scanner .box:after,
.qr-scanner .box:before {
  /*top: 0;
  /*border-top-color: #00ff33;*/
}

.qr-scanner .angle:after,
.qr-scanner .angle:before {
  /*bottom: 0;
  border-bottom-color:#fff;*/
 
}

.qr-scanner .box:before,
.qr-scanner .angle:before {
   /*left: 0;
 border-left-color: #00ff33;*/
}

.qr-scanner .box:after,
.qr-scanner .angle:after {
  /*right: 0;
  border-right-color: #00ff33;*/
}

@keyframes radar-beam {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
