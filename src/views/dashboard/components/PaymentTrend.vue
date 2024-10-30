<template>
  <div class="paymentTrend-container">
    <div class="navbar-flex">
        <div class="navbar-title">Payment Trend</div>
        <div class="tabs-box">
          <div
            :class="data.activeName === 3 ? 'active' : 'item-tabs-title'"
            @click="activeBtn(3)"
          >
            Daily
          </div>
          <div
            :class="data.activeName === 1 ? 'active' : 'item-tabs-title'"
            @click="activeBtn(1)"
          >
            Weekly
          </div>
          <div
            :class="data.activeName === 2 ? 'active' : 'item-tabs-title'"
            @click="activeBtn(2)"
          >
            Monthly
          </div>
        </div>
      </div>
      <div class="tabs-content">
        <div class="tabx-content" v-if="data.activeName === 3">
          <div style="margin-top: 20px">
            <el-row :gutter="20" class="mgb20">
              <el-col
                :span="8"
                v-for="(item, index) of data.listEcharts"
                :key="index"
              >
                <el-card shadow="hover" body-class="card-body">
                  <div class="card-content">
                    <img :src="item.img" class="Data-Performance-cion" />
                    <div class="dashboard-title">
                      {{ item.title }}
                    </div>
                    <div
                      v-show="index === 0"
                      :class="data.findPercentage.paymentAmountRate == null? 'card-num1': 'card-num'">
                      <div v-if="data.findPercentage.paymentAmountRate !== null">
                        <div v-if="data.findPercentage.paymentAmountRate !== undefined">{{ data.findPercentage.paymentAmountRate + "%"}}</div>
                      </div>
                      <div class="no-data-box" v-else>
                        <img src="./../../../assets/img/dashboard/no-data1.png" class="no-data-icon">
                        <span class="no-data-text">No Data Yet, Please Wait</span>
                      </div>
                    </div>
                    <div
                      v-show="index === 1"
                      :class="data.findPercentage.orderCountRate == null? 'card-num1': 'card-num'">
                      <div v-if="data.findPercentage.orderCountRate !== null">
                        <div v-if="data.findPercentage.orderCountRate !== undefined">{{data.findPercentage.orderCountRate + "%"}}</div>
                      </div>
                      <div class="no-data-box" v-else>
                        <img src="./../../../assets/img/dashboard/no-data1.png" class="no-data-icon">
                        <span class="no-data-text">No Data Yet, Please Wait</span>
                      </div>
                    </div>
                    <div v-show="index === 2"
                      :class="data.findPercentage.orderSuccessRate == null? 'card-num1': 'card-num'">
                      <div v-if="data.findPercentage.orderSuccessRate !== null">
                        <div v-if="data.findPercentage.orderSuccessRate !== undefined">{{data.findPercentage.orderSuccessRate + "%"}}</div>
                      </div>
                      <div class="no-data-box" v-else>
                        <img src="./../../../assets/img/dashboard/no-data1.png" class="no-data-icon">
                        <span class="no-data-text">No Data Yet, Please Wait</span>
                      </div>
                    </div>
                    <div class="card-info" v-show="index === 0 && data.findPercentage.paymentAmountRate !== null">
                      <div v-if="data.findPercentage.paymentAmount">Payment Amount：{{ data.findPercentage.paymentAmount }} USDT</div>
                    </div>
                    <div class="card-info" v-show="index === 1 && data.findPercentage.orderCountRate !== null">
                      <div v-if="data.findPercentage.orderCount">Order Volume：{{ data.findPercentage.orderCount }}</div>
                    </div>
                    <div class="card-info" v-show="index === 2 && data.findPercentage.orderSuccessRate !== null">
                      <div v-if="data.findPercentage.orderSuccessCount">The number of successful orders：{{ data.findPercentage.orderSuccessCount }}</div>
                    </div>
                    <v-chart
                      class="title-chart"
                      :option="item.option"
                      ref="myChart"
                    />
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="tabx-content" v-if="data.activeName === 1">
          <div style="margin-top: 20px">
            <el-row :gutter="20" class="mgb20">
              <el-col
                :span="8"
                v-for="(item, index) of data.listEcharts"
                :key="index"
              >
                <el-card shadow="hover" body-class="card-body">
                  <div class="card-content">
                    <img :src="item.img" class="Data-Performance-cion" />
                    <div class="dashboard-title">
                      {{ item.title }}
                    </div>
                    <div
                      v-show="index === 0"
                      :class="data.findPercentage.paymentAmountRate == null? 'card-num1': 'card-num'">
                      <div v-if="data.findPercentage.paymentAmountRate !== null">
                        <div v-if="data.findPercentage.paymentAmountRate !== undefined">{{ data.findPercentage.paymentAmountRate + "%"}}</div>
                      </div>
                      <div class="no-data-box" v-else>
                        <img src="./../../../assets/img/dashboard/no-data1.png" class="no-data-icon">
                        <span class="no-data-text">No Data Yet, Please Wait</span>
                      </div>
                    </div>
                    <div
                      v-show="index === 1"
                      :class="data.findPercentage.orderCountRate == null? 'card-num1': 'card-num'">
                      <div v-if="data.findPercentage.orderCountRate !== null">
                        <div v-if="data.findPercentage.orderCountRate !== undefined">{{data.findPercentage.orderCountRate + "%"}}</div>
                      </div>
                      <div class="no-data-box" v-else>
                        <img src="./../../../assets/img/dashboard/no-data1.png" class="no-data-icon">
                        <span class="no-data-text">No Data Yet, Please Wait</span>
                      </div>
                    </div>
                    <div v-show="index === 2"
                      :class="data.findPercentage.orderSuccessRate == null? 'card-num1': 'card-num'">
                      <div v-if="data.findPercentage.orderSuccessRate !== null">
                        <div v-if="data.findPercentage.orderSuccessRate !== undefined">{{data.findPercentage.orderSuccessRate + "%"}}</div>
                      </div>
                      <div class="no-data-box" v-else>
                        <img src="./../../../assets/img/dashboard/no-data1.png" class="no-data-icon">
                        <span class="no-data-text">No Data Yet, Please Wait</span>
                      </div>
                    </div>
                    <div class="card-info" v-show="index === 0 && data.findPercentage.paymentAmountRate !== null">
                      <div v-if="data.findPercentage.paymentAmount">Payment Amount：{{ data.findPercentage.paymentAmount }} USDT</div>
                    </div>
                    <div class="card-info" v-show="index === 1 && data.findPercentage.orderCountRate !== null">
                      <div v-if="data.findPercentage.orderCount">Order Volume：{{ data.findPercentage.orderCount }}</div>
                    </div>
                    <div class="card-info" v-show="index === 2 && data.findPercentage.orderSuccessRate !== null">
                      <div v-if="data.findPercentage.orderSuccessCount">The number of successful orders：{{ data.findPercentage.orderSuccessCount }}</div>
                    </div>
                    <v-chart
                      class="title-chart"
                      :option="item.option"
                      ref="myChart"
                    />
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="tabx-content" v-if="data.activeName === 2">
          <div style="margin-top: 20px">
            <el-row :gutter="20" class="mgb20">
              <el-col
                :span="8"
                v-for="(item, index) of data.listEcharts"
                :key="index"
              >
                <el-card shadow="hover" body-class="card-body">
                  <div class="card-content">
                    <img :src="item.img" class="Data-Performance-cion" />
                    <div class="dashboard-title">
                      {{ item.title }}
                    </div>
                    <div
                      v-show="index === 0"
                      :class="data.findPercentage.paymentAmountRate == null? 'card-num1': 'card-num'">
                      <div v-if="data.findPercentage.paymentAmountRate !== null">
                        <div v-if="data.findPercentage.paymentAmountRate !== undefined">{{ data.findPercentage.paymentAmountRate + "%"}}</div>
                      </div>
                      <div class="no-data-box" v-else>
                        <img src="./../../../assets/img/dashboard/no-data1.png" class="no-data-icon">
                        <span class="no-data-text">No Data Yet, Please Wait</span>
                      </div>
                    </div>
                    <div
                      v-show="index === 1"
                      :class="data.findPercentage.orderCountRate == null? 'card-num1': 'card-num'">
                      <div v-if="data.findPercentage.orderCountRate !== null">
                        <div v-if="data.findPercentage.orderCountRate !== undefined">{{data.findPercentage.orderCountRate + "%"}}</div>
                      </div>
                      <div class="no-data-box" v-else>
                        <img src="./../../../assets/img/dashboard/no-data1.png" class="no-data-icon">
                        <span class="no-data-text">No Data Yet, Please Wait</span>
                      </div>
                    </div>
                    <div v-show="index === 2"
                      :class="data.findPercentage.orderSuccessRate == null? 'card-num1': 'card-num'">
                      <div v-if="data.findPercentage.orderSuccessRate !== null">
                        <div v-if="data.findPercentage.orderSuccessRate !== undefined">{{data.findPercentage.orderSuccessRate + "%"}}</div>
                      </div>
                      <div class="no-data-box" v-else>
                        <img src="./../../../assets/img/dashboard/no-data1.png" class="no-data-icon">
                        <span class="no-data-text">No Data Yet, Please Wait</span>
                      </div>
                    </div>
                    <div class="card-info" v-show="index === 0 && data.findPercentage.paymentAmountRate !== null">
                      <div v-if="data.findPercentage.paymentAmount">Payment Amount：{{ data.findPercentage.paymentAmount }} USDT</div>
                    </div>
                    <div class="card-info" v-show="index === 1 && data.findPercentage.orderCountRate !== null">
                      <div v-if="data.findPercentage.orderCount">Order Volume：{{ data.findPercentage.orderCount }}</div>
                    </div>
                    <div class="card-info" v-show="index === 2 && data.findPercentage.orderSuccessRate !== null">
                      <div v-if="data.findPercentage.orderSuccessCount">The number of successful orders：{{ data.findPercentage.orderSuccessCount }}</div>
                    </div>
                    <v-chart
                      class="title-chart"
                      :option="item.option"
                      ref="myChart"
                    />
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
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
} from "vue";
import { useRouter, useRoute } from "vue-router";
import VChart from "vue-echarts";
import useECharts from "vue-echarts";
import { UseFindPercentage } from "@/api/api";
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const queryRoute = useRoute();
const data = reactive({
  activeName: 3,
  listEcharts: [],
  findPercentage: {},
  payAmountListA: [],
  payAmountListB: [],
  payAmountListC: [],
});
const myChart = ref(null);
defineExpose({ // 把参数暴露给父组件
  myChart
})
onMounted( async () => {
  await getFindPercentage();
});
const activeBtn = async (type) => {
  proxy.$loading.show();
  data.activeName = type;
  data.findPercentage = {};
  data.payAmountListA = [];
  data.payAmountListB = [];
  data.payAmountListC = [];
  data.listEcharts[0].option.series = [];
  data.listEcharts[1].option.series = [];
  data.listEcharts[2].option.series = [];
  myChart.value[0].clear();
  myChart.value[1].clear();
  myChart.value[2].clear();
  await getFindPercentage();
};
// 顶部曲线图
const getFindPercentage = async () => {
  let res = await UseFindPercentage(data.activeName);
  if (res.data.code === "0") {
    data.findPercentage = res.data.model;
    data.findPercentage.list.map((item, index) => {
      data.payAmountListA.push(item.payAmount);
      data.payAmountListB.push(item.orderCount);
      data.payAmountListC.push(item.orderSuccessRate);
    });
    await optionData();
    proxy.$loading.hide();
  } else {
    proxy.$loading.hide();
  }
};
const optionData = async () => {
  data.listEcharts = [
    {
      id: 0,
      img: new URL(
        "./../../../assets/img/dashboard/Data-Performance-cion1.png",
        import.meta.url
      ).href,
      title: "Payment amount growth rate",
      number: 18,
      count: "Payment Amount: 1350 USDT",
      option: {
        // ECharts 配置项
        xAxis: {
          type: "category",
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            data: data.findPercentage.paymentAmountRate == null?[]:data.payAmountListA,
            type: "line",
            symbolSize: 8, //小圆点的大小
            lineStyle: {
              width: 2,
              color: "#4D92FA", //线条颜色
              // type: "dotted", //'dotted'虚线 'solid'实线
              shadowColor: "#4D92FA", //阴影颜色
              shadowBlur: 25, //阴影的模糊大小。
              shadowOffsetX: 8, // 阴影水平方向上的偏移距离
              shadowOffsetY: 8, // 阴影垂直方向上的偏移距离
            },
            itemStyle: {
              color: "#4D92FA", // 圆点背景色
              borderColor: "rgba(94, 183, 249,  0.13)", //边框颜色
            },
          },
        ],
      },
    },
    {
      id: 1,
      img: new URL(
        "./../../../assets/img/dashboard/Data-Performance-cion2.png",
        import.meta.url
      ).href,
      title: "Order volume growth rate",
      number: 38,
      count: "Order Volume: 200",
      option: {
        // ECharts 配置项
        xAxis: {
          type: "category",
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            data: data.findPercentage.orderCountRate == null?[]:data.payAmountListB,
            type: "line",
            symbolSize: 8, //小圆点的大小
            lineStyle: {
              width: 2,
              color: "#4D92FA", //线条颜色
              // type: "dotted", //'dotted'虚线 'solid'实线
              shadowColor: "#4D92FA", //阴影颜色
              shadowBlur: 25, //阴影的模糊大小。
              shadowOffsetX: 8, // 阴影水平方向上的偏移距离
              shadowOffsetY: 8, // 阴影垂直方向上的偏移距离
            },
            itemStyle: {
              color: "#4D92FA", // 圆点背景色
              borderColor: "rgba(94, 183, 249,  0.13)", //边框颜色
            },
          },
        ],
      },
    },
    {
      id: 2,
      img: new URL(
        "./../../../assets/img/dashboard/Data-Performance-cion3.png",
        import.meta.url
      ).href,
      title: "Order success rate",
      number: 94.34,
      count: "The number of successful orders: 196",
      option: {
        // ECharts 配置项
        xAxis: {
          type: "category",
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            data: data.findPercentage.orderSuccessRate == null?[]:data.payAmountListC,
            type: "line",
            symbolSize: 8, //小圆点的大小
            lineStyle: {
              width: 2,
              color: "#4D92FA", //线条颜色
              // type: "dotted", //'dotted'虚线 'solid'实线
              shadowColor: "#4D92FA", //阴影颜色
              shadowBlur: 25, //阴影的模糊大小。
              shadowOffsetX: 8, // 阴影水平方向上的偏移距离
              shadowOffsetY: 8, // 阴影垂直方向上的偏移距离
            },
            itemStyle: {
              color: "#4D92FA", // 圆点背景色
              borderColor: "rgba(94, 183, 249,  0.13)", //边框颜色
            },
          },
        ],
      },
    },
  ];
};
</script>
<style scoped lang='scss'>
.navbar-flex {
  display: flex;
  align-items: center;
}
.navbar-title {
  color: #101828;
  font-size: 18px;
  font-family: "Inter-SemiBold";
}
.item-tabs-title {
  width: 82px;
  color: #182230;
  font-size: 14px;
  text-align: center;
}
.tabs-box {
  width: 236px;
  height: 40px;
  line-height: 40px;
  display: flex;
  background: #f2f2f2;
  margin-left: 16px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #e4e7ed;
  box-sizing: border-box;
}
.active {
  width: 82px;
  background: #fff;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: #182230;
}
.card-body {
  display: flex;
  height: 178px;
  padding: 0;
  position: relative;
}
  .card-content {
  padding-top: 24px;
  margin: 0 24px 12px 24px;
  box-sizing: border-box;
}
.Data-Performance-cion {
  display: block;
  width: 24px;
  height: 24px;
}
.dashboard-title {
  margin-top: 4px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #101828;
  font-family: "Inter-Medium";
}
.card-num {
  height: 38px;
  font-size: 36px;
  line-height: 38px;
  color: #101828;
  font-family: "Inter-SemiBold";
  margin-bottom: 15px;
}
.card-num1 {
  font-size: 14px;
  line-height: 38px;
  color: #101828;
  font-family: "Inter-Regular";
  margin-left: -6px;
  margin-bottom: 10px;
}
.no-data-box{
  display: flex;
  align-items: center;
}
.no-data-text{
  font-size: 12px;
  color: #A7A7A7;
  font-family: "Inter-Regular";
}
.no-data-icon{
  display: block;
  width: 77px;
  height: 58px;
}
.card-info {
  font-size: 12px;
  color: #a7a7a7;
  opacity: 0.8;
  font-family: "Inter-Regular";
}
.title-chart {
  width: 50%;
  position: absolute;
  top: 20px;
  right: 0px;
}
</style>