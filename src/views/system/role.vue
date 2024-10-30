<template>
  <div class="role-container">
    <div class="title-box">
      <div class="title-row">
        <div>Transaction</div>
      </div>
      <div>Refund History</div>
    </div>
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
            placeholder="Transaction ID"
            v-model="stateData.value1"
            @input="inputValue"
          />
          <el-button color="black" class="search-btn" @click="transactionBtn"
            >Search</el-button
          >
        </div>
        <div class="search-box1">
          <el-icon color="#667085" class="search-icon"><Search /></el-icon>
          <input
            type="text"
            class="input-style"
            placeholder="Merchant Order No"
            v-model="stateData.value2"
            @input="inputValue1"
          />
          <el-button color="black" class="search-btn" @click="MerchantBtn"
            >Search</el-button
          >
        </div>
        <div class="search-box2">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ stateData.selectedItem }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in stateData.items"
                  :key="item.value"
                  :command="item.value"
                  >{{ item.text }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <el-button color="#4FD343" style="color: #fff;font-family: 'Inter-SemiBold';" @click="exportXlsx"
        >Download</el-button
      >
    </div>
    <div class="pay-ment-container">
      <el-table :data="tableData" style="width: 100%" height="100%">
        <el-table-column
          fixed
          prop="customerPayNum"
          label="Merchant Order No"
          width="200"
        />
        <el-table-column label="Transaction ID">
          <template v-slot="scope">
            {{ scope.row.orderNum ? scope.row.orderNum : "-" }}
          </template>
        </el-table-column>
        <el-table-column label="User ID" width="210">
          <template v-slot="scope">
            {{ scope.row.userId ? scope.row.userId : "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="orderCreateTime" label="Order time" />
        <el-table-column prop="cryptoVolume" label="Refund amount" />
        <el-table-column prop="usdt" label="Refund currency" />
        <el-table-column prop="refundType" label="Refund reason" width="300"/>
        <el-table-column prop="orderStatus" label="Order status"/>
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
</template>

<script setup lang="ts" name="system-user">
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import { User } from "@/types/user";
import { UseRefundPage, UseRefundPageDownload } from "@/api/api";
import * as XLSX from "xlsx";
const stateData = reactive({
  value: "",
  value1: "",
  value2: "",
  pageNo: 1,
  pageSize: 10,
  total: 0,
  items: [
    { value: "All", text: "All" },
    { value: "In processing of refund", text: "In processing of refund" },
    { value: "Refund succeed", text: "Refund succeed" },
    { value: "Refund failed", text: "Refund failed" },
    { value: "Refund timeout", text: "Refund timeout" },
  ],
  selectedItem: "All",
  ymdStr1:"",
  ymdStr2:"",
});
const { proxy } = getCurrentInstance() as any;
onMounted(async () => {
  proxy.$loading.show();
  getData();
});
const inputValue = () => {
  if (stateData.value1 === "") {
    stateData.pageNo = 1;
    stateData.pageSize = 10;
    stateData.tableData = [];
    getData(stateData.selectedItem === "All" ? "" : stateData.selectedItem);
  }
};
const inputValue1 = () => {
  if (stateData.value2 === "") {
    stateData.pageNo = 1;
    stateData.pageSize = 10;
    stateData.tableData = [];
    getData(stateData.selectedItem === "All" ? "" : stateData.selectedItem);
  }
};
const handleCommand = (command) => {
  if (command === "All") {
    stateData.selectedItem = command;
    stateData.pageNo = 1;
    stateData.pageSize = 10;
    stateData.tableData = [];
    getData("");
  } else {
    stateData.selectedItem = command;
    stateData.pageNo = 1;
    stateData.pageSize = 10;
    stateData.tableData = [];
    if(command === 'In processing of refund'){
      getData('INIT');
    }
    else if(command === 'Refund succeed'){
      getData('COMPLETED');
    }
    else if(command === 'Refund failed'){
      getData('FAILED');
    }
    else if(command === 'Refund timeout'){
      getData('TIMEOUT');
    }
  }
};

const PerformanceChange = async (val) => {
  if(val){
    stateData.pageNo = 1;
    stateData.pageSize = 10;
    stateData.tableData = [];
    await standardTimeToYYMMDD(val[0], val[1]);
  }
  else {
    stateData.ymdStr1 = ''
    stateData.ymdStr2 = ''
    getData(stateData.selectedItem === "All" ? "" : stateData.selectedItem);
  }
};
// 日期转义
const standardTimeToYYMMDD = (timeStr1, timeStr2) => {
  var date1 = new Date(timeStr1);
  var year1 = date1.getFullYear();
  var month1 = ("0" + (date1.getMonth() + 1)).slice(-2);
  var day1 = ("0" + date1.getDate()).slice(-2);
  var ymdStr1 = year1 + "-" + month1 + "-" + day1;
  stateData.ymdStr1 = ymdStr1

  var date2 = new Date(timeStr2);
  var year2 = date2.getFullYear();
  var month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
  var day2 = ("0" + date2.getDate()).slice(-2);
  var ymdStr2 = year2 + "-" + month2 + "-" + day2;
  stateData.ymdStr2 = ymdStr2
  getData(stateData.selectedItem === "All" ? "" : stateData.selectedItem);
};
const transactionBtn = () => {
  if (stateData.value1) {
    stateData.pageNo = 1;
    stateData.pageSize = 10;
    stateData.tableData = [];
    getData("");
  }
};
const MerchantBtn = () => {
  if (stateData.value2) {
    stateData.pageNo = 1;
    stateData.pageSize = 10;
    stateData.tableData = [];
    getData("");
  }
};
const tableData = ref<User[]>([]);
const getData = async (status) => {
  let params = {
    pageNo: stateData.pageNo,
    pageSize: stateData.pageSize,
    startDate: stateData.ymdStr1 ? stateData.ymdStr1 : "",
    endDate: stateData.ymdStr2 ? stateData.ymdStr2 : "",
    orderNum: stateData.value1 ? stateData.value1 : "",
    customerPayNum: stateData.value2 ? stateData.value2 : "",
    status: status ? status : "",
  };
  let res = await UseRefundPage(params);
  if (res.data.code === "0") {
    tableData.value = res.data.model.data;
    stateData.total = res.data.model.sumRow;
    tableData.value.forEach((item, index) => {
      res.data.model.data[index].usdt = "USDT";
    });
    proxy.$loading.hide();
  }
};

const changePage = (val: number) => {
  stateData.pageNo = 1;
  stateData.pageSize = 10;
  stateData.tableData = [];
  stateData.pageNo = val;
  getData(stateData.selectedItem == 'All'?'': stateData.selectedItem);
};
// 下载表格
const exportXlsx = async () => {
  let params = {
    orderNum: stateData.value1 ? stateData.value1 : "",
    customerPayNum: stateData.value2 ? stateData.value2 : "",
    startDate: stateData.ymdStr1?stateData.ymdStr1:"",
    endDate: stateData.ymdStr2?stateData.ymdStr2:"",
    status: stateData.selectedItem === "All"? "" : stateData.selectedItem,
  };
  let res = await UseRefundPageDownload(params);
  if (res) {
    var date1 = new Date();
    var year1 = date1.getFullYear();
    var month1 = ("0" + (date1.getMonth() + 1)).slice(-2);
    var day1 = ("0" + date1.getDate()).slice(-2);
    var ymdStr1 = year1 + "-" + month1 + "-" + day1;
    const filename = `crypto payment data ${ymdStr1}`;
    const fileContent = res.data;
    // 创建 Blob 对象
    const blob = new Blob([fileContent], {
      type: "application/vnd.ms-excel;charset=utf8",
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
</script>
<style lang="scss">
.role-container {
  .el-date-editor.el-input,
  .el-date-editor.el-input__wrapper {
    width: 237px;
    border-radius: 8px;
  }
  .el-range-editor.el-input__wrapper {
    padding: 5px 10px !important;
  }
  .el-pagination {
    --el-pagination-bg-color: none !important;
    --el-pagination-button-disabled-bg-color: none;
  }
  .el-table th {
    background-color: #f9fafb !important;
  }
  /* 设置表格内部单元格的高度 */
  .el-table__row {
    height: 50px; /* 你想要的高度 */
  }
  .el-table tr:last-of-type td {
    border-bottom: 0;
  }
  .el-table::before {
    height: 0px;
  }
  .el-dropdown-link{
    width: 190px;
    padding-left: 13px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
}
.pay-ment-container {
  .el-table .cell {
    font-size: 12px !important;
    color: #475467 !important;
    font-family: 'Inter-Regular';
  }
  .el-table__inner-wrapper:before {
    background-color: none !important;
    height: 0;
  }
  .el-table--fit {
    border-radius: 8px;
  }
}
</style>
<style scoped lang="scss">
.pay-ment-container {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.pageCount {
  margin-top: 1%;
}
.title-box div:nth-child(1) {
  font-size: 30px;
  color: #101828;
  line-height: 38px;
}
.title-box div:nth-child(2) {
  font-size: 18px;
  color: #101828;
  margin-top: 44px;
  margin-bottom: 20px;
}
.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Inter-SemiBold';
}
.title-info{
  font-family: 'Inter-SemiBold';
}
.demo-date-picker {
  border-radius: 8px;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.search-box {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-row {
  display: flex;
  align-items: center;
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
.search-box2 {
  width: 190px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  position: relative;
}
.input-style {
  width: 170px;
  border: none;
  height: 100%;
  background: transparent;
  padding-left: 6px;
  box-sizing: border-box;
}
.search-icon {
  margin-left: 16px;
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
  font-family: 'Inter-Regular';
}
</style>