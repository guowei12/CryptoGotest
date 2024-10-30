<template>
  <div class='balanceList-container'>
    <div class="settlement-history-box">
      <div class="history-title">Withdrawal History</div>
      <div class="tabs-box">
        <div class="tabs-row">
          <div
            :class="stateData.activeName === 3 ? 'active' : 'item-tabs-title'"
            @click="activeBtn(3)"
          >
            Pre-settlement Record
          </div>
          <div
            :class="stateData.activeName === 1 ? 'active' : 'item-tabs-title'"
            @click="activeBtn(1)"
          >
            Transfer Record
          </div>
          <div
            :class="stateData.activeName === 2 ? 'active' : 'item-tabs-title'"
            @click="activeBtn(2)"
          >
          Withdrawal Detail
          </div>
        </div>
        
      </div>
      <div class="active-box" v-if="stateData.activeName === 1">
        <div class="search-box">
          <div class="search-row">
            <div class="demo-date-picker">
              <div class="block">
                <el-date-picker
                  v-model="stateData.value"
                  type="datetimerange"
                  format="YYYY-MM-DD"
                  date-format="YYYY/MM/DD"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                  @change="PerformanceChange"
                />
              </div>
            </div>
            <div class="search-box1">
              <el-icon color="#667085" class="search-icon"><Search /></el-icon>
              <input
                type="text"
                class="input-style"
                placeholder="Merchant order No"
                v-model="stateData.value1"
                @input="inputValue"
              />
              <el-button
                color="black"
                class="search-btn"
                @click="transactionBtn"
                >Search</el-button
              >
            </div>
          </div>
          <el-button
            color="#4FD343"
            style="color: #fff; font-family: 'Inter-SemiBold'"
            @click="exportXlsx"
            >Download</el-button
          >
        </div>
        <div class="pay-ment-container">
          <el-table :data="tableData" style="width: 100%" height="100%">
            <el-table-column
              fixed
              prop="customPayNum"
              label="Merchant order No"
            />
            <el-table-column
              fixed
              prop="settlementDate"
              label="Transfer time"
            />
            <el-table-column
              prop="type"
              label="Transfer Type"
            />
            <el-table-column prop="amount" label="Amount" />
            <el-table-column prop="afterAmount" label="Available Balance Amount （USDT）"/>
          </el-table>
        </div>
        <el-pagination
          :page-size="stateData.pageSize"
          :pager-count="11"
          layout="prev, pager, next"
          prev-text="Previous"
          next-text="Next"
          :total="stateData.total"
          class="pageCount"
          @current-change="changePage"
          :current-page="stateData.pageNo"
        />
      </div>
      <div class="active-box" v-if="stateData.activeName === 2">
        <div class="search-box">
          <div class="search-row">
            <div class="demo-date-picker">
              <div class="block">
                <el-date-picker
                  v-model="stateData.value2"
                  type="datetimerange"
                  format="YYYY-MM-DD"
                  date-format="YYYY/MM/DD"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                  @change="PerformanceChange"
                />
              </div>
            </div>
            <div class="search-box1">
              <el-icon color="#667085" class="search-icon"><Search /></el-icon>
              <input
                type="text"
                class="input-style"
                placeholder="Transaction ID"
                v-model="stateData.value3"
                @input="inputValue1"
              />
              <el-button
                color="black"
                class="search-btn"
                @click="transactionBtn1"
                >Search</el-button
              >
            </div>
          </div>
          <el-button
            color="#4FD343"
            style="color: #fff; font-family: 'Inter-SemiBold'"
            @click="exportXlsx1"
            >Download</el-button
          >
        </div>
        <div class="pay-ment-container">
          <el-table :data="tableData1" style="width: 100%" height="100%">
            <el-table-column
              fixed
              prop="num"
              label="Transaction ID"
            />
            <el-table-column
              prop="createTime"
              label="Withdrawal Time"
            />
            <el-table-column label="Amount">
              <template v-slot="scope">
                {{scope.row.drawAmount ?scope.row.drawAmount :'-'}}
              </template>
            </el-table-column>
            <el-table-column label="Receive Time">
              <template v-slot="scope">
                {{scope.row.receivedTime ?scope.row.receivedTime :'-'}}
              </template>
            </el-table-column>
            <el-table-column label="Withdrawal Currency">
              <template v-slot="scope">
                {{scope.row.drawCurrency ?scope.row.drawCurrency :'-'}}
              </template>
            </el-table-column>
            <el-table-column label="Withdrawal Status">
              <template v-slot="scope">
                {{scope.row.status ? scope.row.status : '-'}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          :page-size="stateData.pageSize1"
          :pager-count="11"
          layout="prev, pager, next"
          prev-text="Previous"
          next-text="Next"
          :total="stateData.total1"
          class="pageCount"
          @current-change="changePage"
          :current-page="stateData.pageNo1"
        />
      </div>
      <div class="active-box" v-if="stateData.activeName === 3">
        <div class="search-box">
          <div class="search-row">
            <div class="demo-date-picker">
              <div class="block">
                <el-date-picker
                  v-model="stateData.value4"
                  type="datetimerange"
                  format="YYYY-MM-DD"
                  date-format="YYYY/MM/DD"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                  @change="PerformanceChange"
                />
              </div>
            </div>
            <div class="search-box1">
              <el-icon color="#667085" class="search-icon"><Search /></el-icon>
              <input
                type="text"
                class="input-style"
                placeholder="Merchant order No"
                v-model="stateData.value5"
                @input="inputValue2"
              />
              <el-button
                color="black"
                class="search-btn"
                @click="transactionBtn2"
                >Search</el-button
              >
            </div>
          </div>
          <el-button
            color="#4FD343"
            style="color: #fff; font-family: 'Inter-SemiBold'"
            @click="exportXlsx2"
            >Download</el-button
          >
        </div>
        <div class="pay-ment-container">
          <el-table :data="tableData2" style="width: 100%" height="100%">
            <el-table-column
              fixed
              prop="customPayNum"
              label="Merchant order No"
            />
            <el-table-column label="Transaction ID">
              <template v-slot="scope">
                {{scope.row.orderNo ?scope.row.orderNo :'-'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="settlementDate"
              label="Transaction Time"
            />
            <el-table-column label="Transfer Type">
              <template v-slot="scope">
                {{scope.row.type ?scope.row.type :'-'}}
              </template>
            </el-table-column>
            <el-table-column label="Amount">
              <template v-slot="scope">
                {{scope.row.accountFundsAmount ?scope.row.accountFundsAmount :'-'}}
              </template>
            </el-table-column>
            <el-table-column label="Currency">
              <template v-slot="scope">
                {{scope.row.accountCurrency ? scope.row.accountCurrency : '-'}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          :page-size="stateData.pageSize2"
          :pager-count="11"
          layout="prev, pager, next"
          prev-text="Previous"
          next-text="Next"
          :total="stateData.total2"
          class="pageCount"
          @current-change="changePage"
          :current-page="stateData.pageNo2"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {defineComponent, reactive, onMounted, getCurrentInstance, ref } from 'vue'
import {useRouter,useRoute} from 'vue-router'
import { User } from "@/types/user";
import { UseWithdrawPage,UseSettlementPage,UsePreSettlementPage ,UseSettlementPageDownload, UseWithdrawPageDownload,UseAccountpreSettlementPageDownload } from "@/api/api";
 const { proxy } = getCurrentInstance() as any
 const router = useRouter()
 const queryRoute = useRoute()
 const stateData = reactive({
  activeName: 3,
  value: "",
  value1: "",
  value2: "",
  value3: "",
  value4: "",
  value5: "",
  pageNo: 1,
  pageSize: 10,
  pageNo1: 1,
  pageSize1: 10,
  pageNo2: 1,
  pageSize2: 10,
  total: 0,
  total1: 0,
  total2: 0,
  ymdStr1: "",
  ymdStr2: "",
  ymdStr3: "",
  ymdStr4: "",
  ymdStr5: "",
  ymdStr6: "",
 })
 onMounted(async() => {
  await getData2();
 })
 const activeBtn = async (type) => {
  proxy.$loading.show();
  stateData.activeName = type;
  if(type === 1){
    stateData.pageNo1 = 1;
    stateData.pageSize1 = 10;
    stateData.pageNo2 = 1;
    stateData.pageSize2 = 10;
    stateData.value2 = ''
    stateData.value3 = ''
    stateData.value4 = ''
    stateData.value5 = ''
    tableData1.value = [];
    tableData2.value = [];
    stateData.ymdStr3 = "",
    stateData.ymdStr4 = "",
    stateData.ymdStr5 = "",
    stateData.ymdStr6 = "",
    await getData()
  } 
  else if(type === 2){
    stateData.pageNo = 1;
    stateData.pageSize = 10;
    stateData.pageNo2 = 1;
    stateData.pageSize2 = 10;
    stateData.value = ''
    stateData.value1 = ''
    stateData.value4 = ''
    stateData.value5 = ''
    tableData.value = [];
    tableData2.value = [];
    stateData.ymdStr1 = "",
    stateData.ymdStr2 = "",
    stateData.ymdStr5 = "",
    stateData.ymdStr6 = "",
    await getData1()
  }
  else {
    stateData.pageNo = 1;
    stateData.pageSize = 10;
    stateData.pageNo1 = 1;
    stateData.pageSize1 = 10;
    stateData.value = ''
    stateData.value1 = ''
    stateData.value2 = ''
    stateData.value3 = ''
    tableData.value = [];
    tableData1.value = [];
    stateData.ymdStr1 = "",
    stateData.ymdStr2 = "",
    stateData.ymdStr3 = "",
    stateData.ymdStr4 = "",
    await getData2()
  }
};
const PerformanceChange = async (val) => {
  if(stateData.activeName === 1){
    if (val) {
    stateData.pageNo = 1;
    stateData.pageSize = 10;
    tableData.value = [];
    await standardTimeToYYMMDD(val[0], val[1]);
  } 
  else {
    stateData.ymdStr1 = "";
    stateData.ymdStr2 = "";
    getData();
   }
  } else if(stateData.activeName === 2){
    if (val) {
      stateData.pageNo1 = 1;
      stateData.pageSize1 = 10;
      tableData1.value = [];
      await standardTimeToYYMMDD(val[0], val[1]);
  } 
    else {
      stateData.ymdStr3 = "";
      stateData.ymdStr4 = "";
      getData1();
    }
  }
  else {
    if (val) {
      stateData.pageNo2 = 1;
      stateData.pageSize2 = 10;
      tableData2.value = [];
      await standardTimeToYYMMDD(val[0], val[1]);
  } 
    else {
      stateData.ymdStr5 = "";
      stateData.ymdStr6 = "";
      getData2();
    }
  }
};
const inputValue = () => {
  if (stateData.value1 === "") {
    stateData.pageNo = 1;
    stateData.pageSize = 10;
    tableData.value = [];
    getData();
  }
};
const inputValue1 = () => {
  if (stateData.value3 === "") {
    stateData.pageNo1 = 1;
    stateData.pageSize1 = 10;
    tableData1.value = [];
    getData1();
  }
};
const inputValue2 = () => {
  if (stateData.value5 === "") {
    stateData.pageNo2 = 1;
    stateData.pageSize2 = 10;
    tableData2.value = [];
    getData2();
  }
};
const transactionBtn = () => {
  if (stateData.value1) {
    stateData.pageNo = 1;
    stateData.pageSize = 10;
    tableData.value = [];
    getData();
  }
};
const transactionBtn1 = () => {
  if (stateData.value3) {
    stateData.pageNo1 = 1;
    stateData.pageSize1 = 10;
    tableData1.value = [];
    getData1();
  }
};
const transactionBtn2 = () => {
  if (stateData.value5) {
    stateData.pageNo2 = 1;
    stateData.pageSize2 = 10;
    tableData2.value = [];
    getData2();
  }
};
const tableData = ref<User[]>([]);
const getData = async () => {
  let params = {
    pageNo: stateData.pageNo,
    pageSize: stateData.pageSize,
    startDate: stateData.ymdStr1 ? stateData.ymdStr1 : "", 
    endDate: stateData.ymdStr2 ? stateData.ymdStr2 : "",
    customPayNum: stateData.value1 ? stateData.value1 : "",
  };
  let res = await UseSettlementPage(params);
  if (res.data.code === "0") {
    tableData.value = res.data.model.data;
    stateData.total = res.data.model.sumRow;
    proxy.$loading.hide();
  }
};
const tableData1 = ref<User[]>([]);
const getData1 = async () => {
  let params = {
    pageNo: stateData.pageNo1,
    pageSize: stateData.pageSize1,
    startDate: stateData.ymdStr3 ? stateData.ymdStr3 : "",
    endDate: stateData.ymdStr4 ? stateData.ymdStr4 : "",
    orderNum: stateData.value3 ? stateData.value3 : "",
  };
  let res = await UseWithdrawPage(params);
  if (res.data.code === "0") {
    tableData1.value = res.data.model.data;
    stateData.total1 = res.data.model.sumRow;
    proxy.$loading.hide();
  }
};
const tableData2 = ref<User[]>([]);
const getData2 = async () => {
  let params = {
    pageNo: stateData.pageNo2,
    pageSize: stateData.pageSize2,
    startDate: stateData.ymdStr5 ? stateData.ymdStr5 : "",
    endDate: stateData.ymdStr6 ? stateData.ymdStr6 : "",
    customPayNum: stateData.value5 ? stateData.value5 : "",
  };
  let res = await UsePreSettlementPage(params);
  if (res.data.code === "0") {
    tableData2.value = res.data.model.data;
    stateData.total2 = res.data.model.sumRow;
    proxy.$loading.hide();
  }
};
// 分页
const changePage = (val: number) => {
  proxy.$loading.show();
  if(stateData.activeName === 1){
    stateData.pageNo = 1;
    stateData.pageSize = 10;
    tableData.value = [];
    stateData.pageNo = val;
    getData();
  }
  else if(stateData.activeName === 2){
    stateData.pageNo1 = 1;
    stateData.pageSize1 = 10;
    tableData1.value = [];
    stateData.pageNo1 = val;
    getData1();
  }
  else {
    stateData.pageNo2 = 1;
    stateData.pageSize2 = 10;
    tableData2.value = [];
    stateData.pageNo2 = val;
    getData2();
  }
};
// 日期转义
const standardTimeToYYMMDD = (timeStr1, timeStr2) => {
  var date1 = new Date(timeStr1);
  var year1 = date1.getFullYear();
  var month1 = ("0" + (date1.getMonth() + 1)).slice(-2);
  var day1 = ("0" + date1.getDate()).slice(-2);
  var ymdStr1 = year1 + "-" + month1 + "-" + day1;
  if(stateData.activeName === 1){
    stateData.ymdStr1 = ymdStr1;
  } else if(stateData.activeName === 2){
    stateData.ymdStr3 = ymdStr1;
  } else {
    stateData.ymdStr5 = ymdStr1
  }

  var date2 = new Date(timeStr2);
  var year2 = date2.getFullYear();
  var month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
  var day2 = ("0" + date2.getDate()).slice(-2);
  var ymdStr2 = year2 + "-" + month2 + "-" + day2;
  if(stateData.activeName === 1){
    stateData.ymdStr2 = ymdStr2;
    getData();
  } else if(stateData.activeName === 2){
    stateData.ymdStr4 = ymdStr2;
    getData1();
  } else {
    stateData.ymdStr6 = ymdStr2;
    getData2()
  }
};
const exportXlsx = async () => {
  let params = {
    orderNum: stateData.value1 ? stateData.value1 : "",
    startDate: stateData.ymdStr1 ? stateData.ymdStr1 : "",
    endDate: stateData.ymdStr2 ? stateData.ymdStr2 : "",
  };
  let res = await UseSettlementPageDownload(params);
  if (res) {
    var date1 = new Date();
    var year1 = date1.getFullYear();
    var month1 = ("0" + (date1.getMonth() + 1)).slice(-2);
    var day1 = ("0" + date1.getDate()).slice(-2);
    var ymdStr1 = year1 + "-" + month1 + "-" + day1;
    const filename = `Transfer data + ${ymdStr1}`;

    const fileContent = res.data;
    // 创建 Blob 对象
    const blob = new Blob([fileContent], {
      type: "application/vnd.ms-excel;charset=utf-8",
    });
    // 创建下载链接
    const downloadUrl = URL.createObjectURL(blob);
    // 创建下载链接的 <a> 元素
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = filename;
    // 模拟点击下载链接
    downloadLink.click();
    // 清理创建的 URL 对象
    URL.revokeObjectURL(downloadUrl);
  }
};
const exportXlsx1 = async () => {
  let params = {
    orderNum: stateData.value3 ? stateData.value3 : "",
    startDate: stateData.ymdStr3 ? stateData.ymdStr3 : "",
    endDate: stateData.ymdStr4 ? stateData.ymdStr4 : "",
  };
  let res = await UseWithdrawPageDownload(params);
  if (res) {
    var date1 = new Date();
    var year1 = date1.getFullYear();
    var month1 = ("0" + (date1.getMonth() + 1)).slice(-2);
    var day1 = ("0" + date1.getDate()).slice(-2);
    var ymdStr1 = year1 + "-" + month1 + "-" + day1;
    const filename = `Withdrawal data ${ymdStr1}`;

    const fileContent = res.data;
    // 创建 Blob 对象
    const blob = new Blob([fileContent], {
      type: "application/vnd.ms-excel;charset=utf-8",
    });
    // 创建下载链接
    const downloadUrl = URL.createObjectURL(blob);
    // 创建下载链接的 <a> 元素
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = filename;
    // 模拟点击下载链接
    downloadLink.click();
    // 清理创建的 URL 对象
    URL.revokeObjectURL(downloadUrl);
  }
}
const exportXlsx2 = async () => {
  let params = {
    orderNum: stateData.value5 ? stateData.value5 : "",
    startDate: stateData.ymdStr5 ? stateData.ymdStr5 : "",
    endDate: stateData.ymdStr6 ? stateData.ymdStr6 : "",
  };
  let res = await UseAccountpreSettlementPageDownload(params);
  if (res) {
    var date1 = new Date();
    var year1 = date1.getFullYear();
    var month1 = ("0" + (date1.getMonth() + 1)).slice(-2);
    var day1 = ("0" + date1.getDate()).slice(-2);
    var ymdStr1 = year1 + "-" + month1 + "-" + day1;
    const filename = `PreSettlementRecord data ${ymdStr1}`;

    const fileContent = res.data;
    // 创建 Blob 对象
    const blob = new Blob([fileContent], {
      type: "application/vnd.ms-excel;charset=utf-8",
    });
    // 创建下载链接
    const downloadUrl = URL.createObjectURL(blob);
    // 创建下载链接的 <a> 元素
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = filename;
    // 模拟点击下载链接
    downloadLink.click();
    // 清理创建的 URL 对象
    URL.revokeObjectURL(downloadUrl);
  }
}
</script>
<style scoped lang='scss'>
.history-title {
  margin-top: 24px;
  font-size: 18px;
  color: #101828;
  font-family: "Inter-SemiBold";
}
.tabs-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 16px;
}
.tabs-row {
  display: flex;
  align-items: center;
}
.active {
  color: #101828;
  font-size: 14px;
  font-family: "Inter-SemiBold";
  margin-right: 28px;
  position: relative;
}
.active::before {
  position: absolute;
  margin-top: 30px;
  content: "";
  width: 100%;
  height: 2px;
  background: #101828;
}
.item-tabs-title {
  color: #667085;
  font-size: 14px;
  font-family: "Inter-SemiBold";
  margin-right: 28px;
}
.search-box {
  margin-top: 26px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-row {
  display: flex;
  align-items: center;
}
.demo-date-picker {
  border-radius: 8px;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.search-box1 {
  width: 260px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  background: #fff;
}
.search-icon {
  margin-left: 16px;
}
.input-style {
  width: 170px;
  border: none;
  height: 100%;
  background: transparent;
  padding-left: 6px;
  box-sizing: border-box;
}
.search-btn {
  width: 56px;
  height: 28px;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 6px;
  font-family: "Inter-Regular";
}
.pay-ment-container {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.pageCount {
  margin-top: 1%;
}
</style>