import { ref } from 'vue'
import { useMain } from '../src/store/index'

export default function () {
  const couponStore = useMain();
  const handleScroll = () => {
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    //得到html的Dom元素
    let htmlDom = document.getElementsByTagName('html')[0];
    //控制最大尺寸
    let finalSize = (htmlWidth / 7.5) > 37.5 ? 37.5 : (htmlWidth / 7.5);
    //设置根元素字体大小
    const windowWidth = ref(
      document.documentElement.clientWidth || document.body.clientWidth
    );
    const handleResize = () => {
      const domW = document.documentElement.clientWidth || document.body.clientWidth
      windowWidth.value = window.innerWidth;
      // if (domW > 600) {
      //   htmlDom.style.fontSize = finalSize + 'px';
      // } else {
      //   htmlDom.style.fontSize = (domW / 10) + 'px'
      // }

    };
    handleResize()
    couponStore.SET_HANDLESIZE(windowWidth.value)
  }
  return {
    handleScroll
  }
}