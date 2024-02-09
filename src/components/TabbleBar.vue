<script setup>
// import generateAmutiBNewQuestion from "../function/caculate.js";
cc = 0;
function test() {
  cc = 1;
}
</script>
<template>
  <div class="nav">
    <li class="father">
      Home
      <ul class="son">
        <li>Home1</li>
        <li>Home2</li>
      </ul>
    </li>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <li class="father">
      function
      <ul class="son">
        <li>A+B</li>
        <li @click="test()">A*B</li>
      </ul>
    </li>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <li class="father">
      Learn more
      <ul class="son"></ul>
    </li>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <li class="father">
      Contact us
      <ul class="son"></ul>
    </li>
  </div>
  <div v-show="(cc = 1)">{{ cc }}</div>
</template>
<style scoped>
/* 手搓导航条 */
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(255, 248, 240);
  /* height: 6%; */
  z-index: 3;
  /*border-bottom: 1px solid #13181b; */
}
.father {
  background-color: rgb(255, 248, 240);
  list-style: none;
  display: inline-flex;
  font-weight: bolder;
  position: relative;
  padding: 1%;
}
.father:hover {
  background-color: rgba(250, 245, 238, 0.548);
}
.son {
  width: 100%;
  background-color: rgba(250, 245, 238, 0.548);
  display: none;
  justify-content: center;
  align-items: center;
  padding: 20%;
  position: absolute;
  top: 38px;
  left: 0px;
}
.son li {
  list-style: none;
  padding: 1%;
}
.son li:hover {
  color: orange;
}

.father:hover .son {
  display: block;
}
.father:click .son {
  display: block;
}
</style>
