<template>
  <div class='container'>
    2
  </div>
</template>

<script lang='ts' setup>
import {defineComponent, reactive, onMounted, getCurrentInstance } from 'vue'
import {useRouter,useRoute} from 'vue-router'
 const { proxy } = getCurrentInstance() as any
 const router = useRouter()
 const queryRoute = useRoute()
 const data = reactive({})
 onMounted(() => {

 })

</script>
<style scoped lang='scss'></style>