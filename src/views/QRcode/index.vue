<template>
  <div :class="showScanned ? 'Qr-container-scanned' : 'Qr-container'">
    <HeaderBar v-if="!showScanned" :qrCode="true" ></HeaderBar>
    <div class="top-img" v-if="!showScanned">
      <img src="@/assets/images/qr/aeon-logo.png" alt="">
    </div>
    <div class="qr-content" v-if="!showScanned">
      {{ $t('qrPay.text') }}
    </div>
    <div class="qr-support-title" v-if="!showScanned">
      <div>{{ $t('qrPay.supportText') }}</div>
      <div class="qr-support-list">
        <img v-for="item, index in imgList" class="qr-support-img" :src="item" :key="index" alt="" srcset="">
      </div>
    </div>
    <div>
      {{ scannedResult }}
    </div>
    <QRCodeScanner />
    <qrStream v-if="showScanned" @decode="onDecodeHandler" @close="qrReaderClose" />
    <!-- <div class="reader-container" v-show="showScanned">
      <div class="reader-header">
        <img @click="onBack" class="reader-header-logo" src="@/assets/images/qr/reader-header-logo.png" alt=""
          srcset="">
        Scan QR Code
      </div>
      <div class="qrImg-box">
        <img class="qrImg-box-img" v-for="item, index in qrImgList" :src="item" :key="index" alt="" srcset="">
      </div>
      <div id="reader">
      </div>
      <div class="reader-btn">
        A pioneering Payment Association uniting the entire payment ecosystem to seamlessly bridge crypto and real-world
        transactions.
      </div>
    </div> -->
    <div class="qr-fix-btn" @click="startScanning" v-if="!showScanned">
      <img class="qr-mini" src="@/assets/images/qr/qr-mini.png" alt="" srcset="">
      <div class="no-select-text">{{ $t('qrPay.btnText') }}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HeaderBar from '@/components/headerBar/index.vue'
import qrStream from "./../../components/QRCodeScanner/index.vue";
import { showToast } from 'vant';
import { Html5Qrcode } from "html5-qrcode";

/**
* 仓库
*/
export default defineComponent({
  name: 'QRcode',
  components: {
    HeaderBar,
    qrStream    // QRCodeScanner
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance() as any
    const data = reactive({
      imgList: [new URL('@/assets/images/qr/momo-logo.png', import.meta.url).href,
      new URL('@/assets/images/qr/zalo-logo.png', import.meta.url).href,
      new URL('@/assets/images/qr/viettel-logo.png', import.meta.url).href
      ],
      qrImgList: [new URL('@/assets/images/qr/momo-qr.png', import.meta.url).href,
      new URL('@/assets/images/qr/zalo-qr.png', import.meta.url).href,
      new URL('@/assets/images/qr/viettel-qr.png', import.meta.url).href
      ],
      scannedResult: null as any,
      html5Qrcode: null as any,
      showScanned: false,
      authCode: null as any
    })
    const startScanning = () => {
      // data.html5Qrcode = new Html5Qrcode("reader");
      // const config = { fps: 10, qrbox: { width: 240, height: 240 } };
      data.showScanned = true
      // data.html5Qrcode.start(
      //   { facingMode: "environment" },
      //   config,
      //   (decodedText: any, decodedResult: any) => {
      //     data.scannedResult = decodedText;
      //     console.log()
      //     alert(data.scannedResult)
      //     data.showScanned = false
      //     data.html5Qrcode.stop().catch((err: any) => {
      //       data.showScanned = false
      //       console.error("停止扫描失败:", err);
      //     });
      //   },
      //   (errorMessage: any) => {
      //     // 处理错误信息
      //     // data.showScanned=false
      //     console.warn("扫描错误:", errorMessage);
      //   }
      // ).catch((err: any) => {
      //   // data.showScanned=false
      //   console.error("启动扫描失败:", err);
      //   showToast('获取设备信息失败')
      // });
    }
    const onDecode = (data: any) => {
      console.log(data);//二维码附带信息

      alert(data)
      data.showScanned = false
    }
    const onBack = () => {
      data.showScanned = false
    }
    const onBtn = {
      onDecodeHandler: (res: any) => {
        proxy.$closeToast()
        console.log(res)
        if (res.code && res.currency) {
          data.authCode = res
          data.showScanned = false
          router.push({
            path: "/payMent",
            query: { code: res.code.code,currency:res.currency },
          });
        } else {
          proxy.$failToast('Invalid QR code! ', 'failToast', 3000)
        }

      },
      qrReaderClose: () => {
        data.authCode = ''
        data.showScanned = false
      }
    }
    onBeforeMount(() => {
      //console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      //console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
    watchEffect(() => {
    })
    return {
      ...toRefs(data),
      startScanning,
      onBack,
      onDecode,
      ...onBtn
    };
  },
})

</script>
<style lang='scss' scoped src='./index.scss'></style>