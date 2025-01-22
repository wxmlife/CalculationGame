<script setup>
// import Home from "./components/Home.vue";
import TabbleBar from "./components/TabbleBar.vue";
import AaddB from "./components/AaddB.vue";
import AmultB from "./components/AmultB.vue";
import { ref } from "vue";
const currentModule = ref(null); // 当前加载的模块

function loadModule(type) {
  if (type === "AaddB") {
    currentModule.value = AaddB; // 加载加法模块
  } else if (type === "AmultB") {
    currentModule.value = AmultB; // 加载乘法模块
  } else {
    currentModule.value = null; // 重置为 null
  }
}
</script>

<template>
  <TabbleBar @module-selected="loadModule" />
  <div style="display: flex; justify-content: center; align-items: center">
    <h1>Calculation Game</h1>
  </div>
  <component :is="currentModule" />
</template>

<style scoped></style>
