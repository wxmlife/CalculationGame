<script setup>
// import Home from "./components/Home.vue";
import TabbleBar from "./components/TabbleBar.vue";
import AaddB from "./components/AaddB.vue";
import AmultB from "./components/AmultB.vue";
import Home from "./components/Home.vue";
import { ref } from "vue";
const currentModule = ref(Home); // 当前加载的模块

function loadModule(type) {
  if (type === "AaddB") {
    currentModule.value = AaddB; // 加载加法模块
  } else if (type === "AmultB") {
    currentModule.value = AmultB; // 加载乘法模块
  } else if (type === "Home") {
    currentModule.value = Home; // 加载乘法模块
  } else {
    currentModule.value = null; // 重置为 null
  }
}
</script>

<template>
  <TabbleBar @module-selected="loadModule" />
  <component
    :is="currentModule"
    @start-game="loadModule"
    @module-selected="loadModule"
  />
  <!-- <component :is="currentModule" /> -->
</template>

<style scoped></style>
