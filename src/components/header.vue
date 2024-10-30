<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="header-left">
      <img class="logo" src="../assets/img/logo.png" alt="" />
      <div class="collapse-btn" @click="collapseChage">
        <el-icon v-if="sidebar.collapse" color="#101828">
          <Expand/>
        </el-icon>
        <el-icon v-else color="#101828">
          <Fold />
        </el-icon>
      </div>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- <div class="btn-icon" @click="router.push('/theme')">
                    <el-tooltip effect="dark" content="设置主题" placement="bottom">
                        <i class="el-icon-lx-skin"></i>
                    </el-tooltip>
                </div> -->
        <!-- <div class="btn-icon" @click="router.push('/ucenter')">
                    <el-tooltip
                        effect="dark"
                        :content="message ? `有${message}条未读消息` : `消息中心`"
                        placement="bottom"
                    >
                        <i class="el-icon-lx-notice"></i>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
        <div class="btn-icon" @click="setFullScreen">
          <el-tooltip effect="dark" content="Full screen" placement="bottom">
            <!-- <i class="el-icon-lx-full"></i> -->
            <el-icon><FullScreen color="#101828"/></el-icon>
          </el-tooltip>
        </div>
        <!-- 用户头像 -->
        <el-avatar class="user-avator" :size="30" :src="data.logo"/>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <div class="user-top">
              <div class="flex-column">
                <div>{{ userStore.userInfo.merchantNo }}</div>
                <div>{{ userStore.userInfo.merchantName }}</div>
              </div>
              <el-icon class="el-icon--right" color="#101828">
              <arrow-down />
            </el-icon>
            </div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="loginout">Sign Out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted,reactive } from "vue";
import { useSidebarStore } from "../store/sidebar";
import { useRouter } from "vue-router";
import imgurl from "../assets/img/img.jpg";
import { useCounterStore } from '@/store/user';
import { UseLogout,UseQueryUserInfo } from "@/api/api";

const username: string | null = localStorage.getItem("vuems_name");
// const message: number = 2;
const userStore = useCounterStore();

const data = reactive({
  userInfo:{} as object,
  logo:new URL('./../assets/img/user-logo.jpg',import.meta.url).href
})
const sidebar = useSidebarStore();
// 侧边栏折叠
const collapseChage = () => {
  sidebar.handleCollapse();
};

onMounted( async () => {
  if (document.body.clientWidth < 1500) {
    await collapseChage();
  }
   userStore.getQueryUserInfo()
});
// 用户名下拉菜单选择事件
const router = useRouter();
const handleCommand = async (command: string) => {
  if (command == "loginout") {
    getLogout();
  }
  // else if (command == 'user') {
  //     router.push('/ucenter');
  // }
};
const getLogout = async () => {
  let res = await UseLogout();
  if (res.data.code === "0") {
    localStorage.removeItem(username);
    router.push("/login");
  }
  else if(res.data.code === '9013'){
    router.push("/login");
  }
};
const setFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.body.requestFullscreen.call(document.body);
  }
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  color: var(--header-text-color);
  background-color: var(--header-bg-color1);
  border-bottom: 1px solid #EAECF0;
}

.header-left {
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 100%;
}

.logo {
  width: 124px;
  height: 24px;
}

.collapse-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  opacity: 0.8;
  font-size: 22px;
  margin-left: 75px;
}

.collapse-btn:hover {
  opacity: 1;
}

.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-icon {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--header-text-color);
  margin: 0 5px;
  font-size: 20px;
}

.btn-bell-badge {
  position: absolute;
  right: 4px;
  top: 0px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: var(--header-text-color);
}

.user-avator {
  margin: 0 10px 0 20px;
  background: #fff;
}
.user-top{
  display: flex;
}
.flex-column{
  display: flex;
  flex-direction: column;
}
.flex-column div:nth-child(2){
  font-size: 11px;
  margin-top: 3px;
}
.el-dropdown-link {
  color: var(--header-text-color1);
  cursor: pointer;
  display: flex;
  align-items: center; 
  flex-direction: column;
  font-family: 'Inter-Medium';
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
