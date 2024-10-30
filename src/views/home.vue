<template>
  <div class="wrapper">
    <v-header />
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tabs.nameList">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSidebarStore } from "@/store/sidebar";
import { useTabsStore } from "@/store/tabs";
import vHeader from "@/components/header.vue";
import vSidebar from "@/components/sidebar.vue";

const sidebar = useSidebarStore();
const tabs = useTabsStore();
</script>

<style>
.wrapper {
  height: 100vh;
  overflow: hidden;
}
.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 70px;
  bottom: 0;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f8f8f9;
  overflow: hidden;
}

.content {
  width: auto;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
  box-sizing: border-box;
}

.content::-webkit-scrollbar {
  width: 0;
}

.content-collapse {
  left: 65px;
}
</style>
