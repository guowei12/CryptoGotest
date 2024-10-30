<template>
  <div class="orderTrend-container">
    <div class="navbar-box1">
      <div class="flex-box">
        <div class="navbar-title">Order Trend</div>
        <div class="demo-date-picker">
          <div class="block">
            <el-date-picker
              v-model="data.value1"
              type="datetimerange"
              format="YYYY-MM-DD"
              date-format="YYYY/MM/DD"
              start-placeholder="Start date"
              end-placeholder="End date"
              :default-value="defaultStartDate1"
              @change="PerformanceChange1"
              :clearable="false"
            />
          </div>
        </div>
      </div>
      <div style="margin-top: 20px">
        <el-row :gutter="20" class="mgb20">
          <el-col>
            <el-card shadow="hover">
              <div style="width: 100%; height: 400px" class="noData-box2">
                <v-chart
                  ref="myChart3"
                  :option="data.option5"
                  style="width: 100%; height: 400px"
                  v-if="data.orderSuccessCount.length > 0"
                />
                <img
                  v-else
                  src="./../../../assets/img/dashboard/no-data.png"
                  class="no-data-bg"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  computed,
  ref,
} from "vue";
import VChart from "vue-echarts";
import useECharts from "vue-echarts";
import { useRouter, useRoute } from "vue-router";
import { UseOrderTrend } from "@/api/api";
const myChart3 = ref(null);
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const queryRoute = useRoute();
const data = reactive({
  value1: "",
  orderSuccessCount: [],
  orderFailCount: [],
  successRate: [],
  timeDate: [],
  option5: {},
});
defineExpose({ // 把参数暴露给父组件
  myChart3,
})
onMounted(() => {});
const defaultStartDate1 = computed(() => {
  let num = 1;
  const now = new Date();
  const startDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 30
  );
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  standardTimeToYYMMDD(startDate, endDate, num);
});
const PerformanceChange1 = async (val) => {
  let num = 2;
  proxy.$loading.show();
  data.orderSuccessCount = [];
  data.orderFailCount = [];
  data.successRate = [];
  data.timeDate = [];
  await standardTimeToYYMMDD(val[0], val[1], num);
};
// Order Trend 接口
const getOrderTrend = async (startDate, endDate) => {
  let res = await UseOrderTrend(startDate, endDate);
  if (res.data.code === "0") {
    let orderTrendList = res.data.model;
    orderTrendList.map((item, index) => {
      data.orderSuccessCount.push(item.orderSuccessCount);
      data.orderFailCount.push(item.orderFailCount);
      let a = item.successRate;
      data.successRate.push(a);
      data.timeDate.push(item.date);
    });
    await optionData3();
    proxy.$loading.hide();
  } else {
    proxy.$loading.hide();
  }
};
// 日期转义
const standardTimeToYYMMDD = (timeStr1, timeStr2, num) => {
  var date1 = new Date(timeStr1);
  var year1 = date1.getFullYear();
  var month1 = ("0" + (date1.getMonth() + 1)).slice(-2);
  var day1 = ("0" + date1.getDate()).slice(-2);
  var ymdStr1 = year1 + "-" + month1 + "-" + day1;

  var date2 = new Date(timeStr2);
  var year2 = date2.getFullYear();
  var month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
  var day2 = ("0" + date2.getDate()).slice(-2);
  var ymdStr2 = year2 + "-" + month2 + "-" + day2;
  if (num === 1) {
    getOrderTrend(ymdStr1, ymdStr2);
    data.value1 = [ymdStr1, ymdStr2];
  }
  if (num === 2) {
    getOrderTrend(ymdStr1, ymdStr2);
  }
};
const optionData3 = async () => {
    data.option5 = {
      title: {
        text: "Daily trend chart of order volume",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
        axisPointer: {
          type: "line", // 指示器类型（'line' 直线指示器；'shadow' 阴影指示器；'none' 无指示器；'cross' 十字准星指示器。）
          snap: false, // 坐标轴指示器是否自动吸附到点上。默认自动判断。
        },
        triggerOn: "mousemove", // 提示框触发的条件（'mousemove'，鼠标移动时触发；'click'，鼠标点击时触发；'mousemove|click'，同时鼠标移动和点击时触发；'none'，不在 'mousemove' 或 'click' 时触发）
        confine: true, // 是否将 tooltip 框限制在图表的区域内
        backgroundColor: "#000", // 提示框浮层的背景颜色
        borderColor: "#000",
        borderRadius: 8,
        textStyle: {
          color: "#fff", // 文字的颜色
          fontStyle: "normal", // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体）
          fontWeight: "normal", // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
        },
      },
      legend: {
        itemGap: 30,
        data: ["success", "failed", "success rate"],
      },
      xAxis: [
        {
          type: "category",
          data: data.timeDate,
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      grid: {
        top: "25%",
        left: "0.5%",
        right: "0%",
        bottom: "8%",
        containLabel: true,
      },
      yAxis: [
        {
          type: "value",
          name: "",
          interval: 2,
          axisLabel: {
            formatter: "{value}",
          },
        },
        {
          type: "value",
          name: "",
          interval: 20,
          axisLabel: {
            formatter: "{value}",
          },
          splitLine: {
            show:false
          },
        },
      ],
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 0,          // 滑块的起始位置，表示百分比
          end: 33.33,       // 滑块的结束位置，表示百分比
          minSpan: 33.33,
          type: "inside",
          bottom: 10,
          height: 10,
          left: "center",
          width: "50%",
          filterMode: "empty",
        },
        {
          show: true,
          realtime: true,
          start: 0,          // 滑块的起始位置，表示百分比
          end: 33.33,       // 滑块的结束位置，表示百分比
          minSpan: 33.33,
          type: "slider",
          bottom: 10,
          left: "center",
          height: 10,
          width: "50%",
          filterMode: "empty",
        },
        {
          type: "inside",
          // 滚轮是否触发缩放
          zoomOnMouseWheel: false,
          // 鼠标滚轮触发滚动
          moveOnMouseMove: true,
          moveOnMouseWheel: true,
        },
      ],
      series: [
        {
          name: "success",
          type: "bar",
          tooltip: {
            valueFormatter: function (value) {
              return value;
            },
          },
          data: data.orderSuccessCount,
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
            // 设置柱子的颜色
            color: "#166307",
          },
        },
        {
          name: "failed",
          type: "bar",
          tooltip: {
            valueFormatter: function (value) {
              return value;
            },
          },
          data: data.orderFailCount,
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
            // 设置柱子的颜色
            color: "#58F287",
          },
        },
        {
          name: "success rate",
          type: "line",
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value;
            },
          },
          data: data.successRate,
          itemStyle: {
            // 设置柱子的颜色
            color: "#FDC97C",
          },
        },
      ],
    };
};
</script>
<style scoped lang='scss'>
.timeline-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #000;
}

.timeline-time,
.timeline-desc {
  font-size: 12px;
  color: #787878;
}

.rank-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.rank-item-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f2f2f2;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
}

.rank-item-content {
  flex: 1;
}

.rank-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #343434;
  margin-bottom: 10px;
}

.rank-item-desc {
  font-size: 14px;
  color: #999;
}
.map-chart {
  width: 100%;
  height: 350px;
}
.dashboard-title {
  margin-top: 4px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #101828;
  font-family: "Inter-Medium";
}
.navbar-box1 {
  margin-top: 36px;
}
.demo-tabs {
  margin-top: 10px;
}
.flex-box {
  display: flex;
  align-items: center;
}
.demo-date-picker {
  margin-left: 15px;
  border-radius: 8px;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.no-data-bg{
  display: block;
  width: 140px;
  height: 135px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.noData-box2{
  position: relative;
}
.navbar-title {
  color: #101828;
  font-size: 18px;
  font-family: "Inter-SemiBold";
}
</style>