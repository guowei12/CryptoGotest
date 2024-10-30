<template>
  <div class="dataPerformance-container">
    <div class="navbar-box1">
      <div class="flex-box">
        <div class="navbar-title">Data Performance</div>
        <div class="demo-date-picker">
          <div class="block">
            <el-date-picker
              v-model="data.value"
              type="datetimerange"
              format="YYYY-MM-DD"
              date-format="YYYY/MM/DD"
              start-placeholder="Start date"
              end-placeholder="End date"
              :default-value="defaultStartDate"
              @change="PerformanceChange"
              :clearable="false"
            />
          </div>
        </div>
      </div>
      <div style="margin-top: 20px">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="14">
            <el-card shadow="hover">
              <div class="card-header">
                <p class="card-header-title">
                  Daily trend chart of payment amount
                </p>
              </div>
              <div style="width: 100%; height: 400px" class="noData-box">
                <v-chart
                  ref="myChart1"
                  :option="data.option4"
                  v-if="data.amountResponseList.length > 0"
                />
                <img
                  v-else
                  src="./../../../assets/img/dashboard/no-data.png"
                  class="no-data-bg"
                />
              </div>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card shadow="hover">
              <div class="card-header">
                <p class="card-header-title">Payment currency usage ranking</p>
              </div>
              <div style="width: 100%; height: 400px" class="noData-box1">
                <v-chart
                  ref="myChart2"
                  :option="data.option3"
                  style="width: 100%; height: 400px"
                  v-if="data.currencyList.length > 0"
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
  ref,
  computed,
} from "vue";
import VChart from "vue-echarts";
import useECharts from "vue-echarts";
import { useRouter, useRoute } from "vue-router";
import { UsePaymentTrend } from "@/api/api";
import { graphic } from "echarts/core";
const myChart1 = ref(null);
const myChart2 = ref(null);
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const queryRoute = useRoute();
const data = reactive({
  value:"",
  option3: {},
  option4: {},
  amountResponseList: [],
  currencyList: [],
  timeDate1: [],
});
defineExpose({ // 把参数暴露给父组件
  myChart1,
  myChart2,
})
onMounted(() => {});
const defaultStartDate = computed(() => {
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
// Data Performance 时间选择
const PerformanceChange = async (val) => {
  proxy.$loading.show();
  let num = 2;
  data.currencyList = [];
  data.timeDate1 = [];
  data.amountResponseList = [];
  await standardTimeToYYMMDD(val[0], val[1], num);
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
    getPerformance(ymdStr1, ymdStr2);
    data.value = [ymdStr1, ymdStr2];
  }
  if (num === 2) {
    getPerformance(ymdStr1, ymdStr2);
  }
};
// Data Performance 接口
const getPerformance = async (startDate, endDate) => {
  let res = await UsePaymentTrend(
    startDate ? startDate : "",
    endDate ? endDate : ""
  );
  if (res.data.code === "0") {
    let daySumAmountResponseList = res.data.model.daySumAmountResponseList;
    let currencyList = res.data.model.currencyList;
    currencyList.forEach((item, index) => {
      let value = item.orderAmount;
      let name = item.orderCurrency;
      data.currencyList.push({ value: value, name: name });
    });
    daySumAmountResponseList.map((item, index) => {
      data.amountResponseList.push(item.accountAmount);
      data.timeDate1.push(item.date);
    });
    await optionData1();
    await optionData2();
    proxy.$loading.hide();
  } else {
    proxy.$loading.hide();
  }
};
const optionData1 = async () => {
  data.option4 = {
    xAxis: {
      type: "category",
      data: data.timeDate1, // 表示需要显示3个刻度，即每隔2个刻度显示一个刻度
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
    },
    grid: {
      top: "2%",
      left: "1.5%",
      right: "0.5%",
      bottom: "7%",
      containLabel: true,
    },
    right: "center",
    color: ["#4D92FA", "#4D92FA"],
    tooltip: {
      trigger: "axis",
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
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 0, // 滑块的起始位置，表示百分比
        end: 33.33, // 滑块的结束位置，表示百分比
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
        start: 0, // 滑块的起始位置，表示百分比
        end: 33.33, // 滑块的结束位置，表示百分比
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
        type: "line",
        symbolSize: 10,
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#91bdfe",
            },
            {
              offset: 1,
              color: "rgb(248, 250, 251)",
            },
          ]),
        },
        smooth: true,
        data: data.amountResponseList,
      },
    ],
  };
};
const optionData2 = async () => {
  data.option3 = {
    title: {
      left: "left",
    },
    tooltip: {
      trigger: "item",
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
      orient: "vertical",
      left: "1.5%",
      top: 50,
      itemGap: 50,
    },
    series: [
      {
        type: "pie",
        left: 50,
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "cenlter",
        },
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data.currencyList,
      },
    ],
  };
};
</script>
<style scoped lang='scss'>
.navbar-box1 {
  margin-top: 36px;
}
.flex-box {
  display: flex;
  align-items: center;
}
.navbar-title {
  color: #101828;
  font-size: 18px;
  font-family: "Inter-SemiBold";
}
.demo-date-picker {
  margin-left: 15px;
  border-radius: 8px;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.card-header {
  padding-left: 10px;
  margin-bottom: 20px;
}

.card-header-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  font-family: "Inter-Medium";
}
.noData-box{
  position: relative;
}
.noData-box1{
  position: relative;
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
</style>