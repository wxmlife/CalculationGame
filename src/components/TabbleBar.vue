<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Home from "./Home.vue";
import AaddB from "./AaddB.vue";
import AmultB from "./AmultB.vue";

// import generateAmutiBNewQuestion from "../function/caculate.js";
import { defineEmits } from "vue";
const emit = defineEmits();

const activeDrop = ref(""); // 当前展开的父项名字
function selectModule(type) {
  emit("module-selected", type); //触发事件并传递模块类型
}
function toggleDrop(name) {
  // 点击同一项就关闭，否则打开新项
  activeDrop.value = activeDrop.value === name ? "" : name;
}

function clickOutside(e) {
  // 点在非导航区域就关闭所有下拉
  if (!e.target.closest(".nav")) activeDrop.value = "";
}

// 挂载全局监听
onMounted(() => document.addEventListener("click", clickOutside));
onUnmounted(() => document.removeEventListener("click", clickOutside));
</script>

<template>
  <nav class="nav" @click.stop>
    <li class="father" @click="$emit('module-selected', 'Home')">Home</li>

    <li
      class="father"
      @click="toggleDrop('func')"
      :class="{ open: activeDrop === 'func' }"
    >
      Function
      <ul class="son">
        <li @click="$emit('module-selected', 'AaddB')">A+B</li>
        <li @click="$emit('module-selected', 'AmultB')">A*B</li>
      </ul>
    </li>

    <li
      class="father"
      @click="toggleDrop('learn')"
      :class="{ open: activeDrop === 'learn' }"
    >
      Learn more
      <ul class="son"></ul>
    </li>

    <li
      class="father"
      @click="toggleDrop('contact')"
      :class="{ open: activeDrop === 'contact' }"
    >
      Contact us
      <ul class="son"></ul>
    </li>
  </nav>
</template>

<style scoped>
/* ========= 基础导航 ========= */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgb(26, 26, 26);
  color: #fff;
  z-index: 10;
  user-select: none;
}

.father {
  list-style: none;
  position: relative;
  padding: 0.6rem 1rem;
  font-weight: 600;
  cursor: pointer;
}
.father::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px; /* 2px 足够贴住，又几乎看不见 */
  background: transparent;
}

/* ========= 下拉列表 ========= */
.son {
  position: absolute;
  left: 0;
  top: 100%; /* 紧贴父项底部，无缝隙 */
  margin-top: -2px; /* 向上贴 2px 彻底消除可见缝隙 */
  text-align: left;
  min-width: 100%;
  background: #000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  overflow: hidden;

  /* 默认隐藏 */
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
}

.son li {
  list-style: none;
  padding: 0.5rem 0.8rem;
  white-space: nowrap;
}
.son li:hover {
  color: orange;
}

/* ========= 有鼠标设备：hover 展开 ========= */
@media (hover: hover) {
  .father:hover .son,
  .father.open .son {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

/* ========= 无鼠标设备：只有点击才展开 ========= */
@media (hover: none) {
  .father.open .son {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

/* ========= 小屏适配 ========= */
@media (max-width: 600px) {
  .nav {
    font-size: 0.9rem;
    padding: 0 0.5rem;
  }
  .father {
    padding: 0.5rem 0.6rem;
  }
}
</style>
