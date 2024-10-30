<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="sidebar.collapse"
            :background-color="sidebar.bgColor"
            :text-color="sidebar.textColor"
            router
        >
            <template v-for="item in menuData">
                <template v-if="item.children">
                    <el-sub-menu :index="item.index" :key="item.index" >
                        <template #title>
                            <div v-if="item.title === 'Transaction'">
                                <img src="./../assets/img/menu-icon/menu-icon2.png" class="menu-icon" v-show="route.path == '/payment' || route.path == '/refund' || route.path == '/system-menu'">
                                <img src="./../assets/img/menu-icon/menu-icon2-1.png" class="menu-icon" v-show="route.path !== '/payment' && route.path !== '/refund' && route.path !== '/system-menu'">
                            </div>
                            <div v-if="item.title === 'Settlement'">
                                <img src="./../assets/img/menu-icon/menu-icon3.png" class="menu-icon" v-show="route.path == '/balance'">
                                <img src="./../assets/img/menu-icon/menu-icon3-1.png" class="menu-icon" v-show="route.path !== '/balance'">
                            </div>
                            <div v-if="item.title === 'Management'">
                                <img src="./../assets/img/menu-icon/menu-icon5.png" class="menu-icon" v-show="route.path == '/createMerchant' || route.path == '/merchantList'">
                                <img src="./../assets/img/menu-icon/menu-icon5-1.png" class="menu-icon" v-show="route.path !== '/createMerchant' && route.path !== '/merchantList'">
                            </div>
                            <span class="nav-title-text">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.children">
                            <el-sub-menu
                                v-if="subItem.children"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem, i) in subItem.children"
                                    :key="i"
                                    :index="threeItem.index"
                                >
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :index="subItem.index"  :key="subItem.index">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" >
                        <div v-if="item.title === 'Dashboard'">
                            <img src="./../assets/img/menu-icon/menu-icon1.png" class="menu-icon" v-show="route.path == '/dashboard'">
                            <img src="./../assets/img/menu-icon/menu-icon1-1.png" class="menu-icon" v-show="route.path !== '/dashboard'">
                        </div>
                        <div v-if="item.title === 'Account'">
                                <img src="./../assets/img/menu-icon/menu-icon4.png" class="menu-icon" v-show="route.path == '/account'">
                                <img src="./../assets/img/menu-icon/menu-icon4-1.png" class="menu-icon" v-show="route.path !== '/account'">
                            </div>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        <div v-if="!sidebar.collapse"><img src="./../assets/img/menu-logo.png" class="menu-logo"></div>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';
import { menuData } from '@/components/menu';

const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});

const sidebar = useSidebarStore();
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar-el-menu {
    min-height: 100%;
    border-right: 1px solid #EAECF0!important;
}
.menu-icon{
    width: 24px;
    height: 24px;
    display: block;
    margin-right: 12px;
}
.nav-title-text{
    font-family: 'Inter-Regular';
}
.menu-logo{
    display: block;
    width: 180px;
    height: 29px;
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
