<template>
  <div class="dashboard-container">
    <div>
      <div class="title-Dashboard">Dashboard</div>
      <div class="info-Dashboard">Welcome back</div>
    </div>
    <AvailableBalance />
    <div class="navbar-box">
      <PaymentTrend ref="myChart" />
      <DataPerformance ref="myChart1" />
      <OrderTrend ref="myChart3" />
    </div>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import {
  nextTick,
  onMounted,
  ref,
  onUnmounted,
  reactive,
  getCurrentInstance,
} from "vue";
import { use, registerMap } from "echarts/core";
import { BarChart, LineChart, PieChart, MapChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  ToolboxComponent,
  DataZoomComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { useRouter } from "vue-router";
import AvailableBalance from "./components/AvailableBalance.vue";
import PaymentTrend from "./components/PaymentTrend.vue";
import DataPerformance from "./components/DataPerformance.vue";
import OrderTrend from "./components/OrderTrend.vue";
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const myChart = ref(null);
const myChart1 = ref(null);
const myChart3 = ref(null);

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  LineChart,
  PieChart,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  MapChart,
  ToolboxComponent,
  DataZoomComponent,
]);
const data = reactive({});
onMounted(async () => {
  proxy.$loading.show();
  await nextTick();
  window.addEventListener("resize", handleResize);
});
const handleResize = async () => {
  myChart.value.myChart[0].resize();
  myChart.value.myChart[1].resize();
  myChart.value.myChart[2].resize();
  myChart1.value.myChart1.resize();
  myChart1.value.myChart2.resize();
  myChart3.value.myChart3.resize();
};
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss">
.dashboard-container {
  .card-body {
    display: flex;
    height: 178px;
    padding: 0;
    position: relative;
  }
  .el-card {
    border-radius: 16px;
  }
  .el-tabs__header {
    margin-left: 170px;
    margin-top: -40px;
  }
  .el-tabs--card > .el-tabs__header {
    width: 257px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: #e4e7ed;
  }
  .el-tabs__item {
    color: #ccc;
  }
  .el-tabs__item.is-active {
    color: #101828;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__wrapper {
    width: 237px;
    border-radius: 8px;
  }
  .el-date-editor .el-range-input {
    font-family: "Inter-SemiBold";
    color: #344054;
  }
}
</style>
<style scoped lang="scss">
.chart {
  width: 100%;
  height: 400px;
}
.navbar-box {
  margin-top: 44px;
}
.title-Dashboard {
  color: #101828;
  font-size: 30px;
  line-height: 38px;
  font-family: "Inter-SemiBold";
}
.info-Dashboard {
  color: #475467;
  font-size: 16px;
  line-height: 24px;
  margin-top: 5px;
  font-family: "Inter-Regular";
}
</style>
