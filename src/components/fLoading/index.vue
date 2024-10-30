<template>
  <div class="fLoading">
    <div>Lading...</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
/**
* 仓库
*/
export default defineComponent({
    name: '',
    setup() {
       /**
       * 路由对象
       */
       const route = useRoute();
       /**
       * 路由实例
       */
       const router = useRouter();
       //console.log('1-开始创立组件-setup')
       /**
       * 数据局部
       */
       const data = reactive({})
       onBeforeMount(() => {
       //console.log('2.组件挂载页面之前执行----onBeforeMount')
       })
       onMounted(() => {
      //console.log('3.-组件挂载到页面之后执行-------onMounted')
      })
      watchEffect(()=>{
      })
      return {
        ...toRefs(data)
      };
  },
})

</script>
<style lang='scss' scoped >
.fLoading{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>