<script setup>
import { ref, watch } from "vue";

// data区
defineProps({
  // msg: String,
  title: String,
});

const title = "Calculation Game";
let count = 0;
let Ru = false;
let Process = false;
// let judge = false;
let relation_select = "=";
let inputValue = ref();
let judger = ref();
judger.value = 0;
let ComputerResult = 0;
let score = 0;

// 生成随机整数的函数
function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
//加减法随机选择0，
const randomNumber = Math.floor(Math.random() * 2);

// 第一次正式渲染题目：算式里的各个元素
let first = getRandomInt(1, 100);
let second = getRandomInt(1, 100);
let operator = "";
if (randomNumber == 0) {
  operator = "+";
} else {
  operator = "-";
}
let formula = [first, operator, second, relation_select];

//封装生成新题目的函数
function generateNewQuestion() {
  // 算式里的各个元素
  first = getRandomInt(1, 100);
  second = getRandomInt(1, 100);
  operator = "";
  if (randomNumber == 0) {
    operator = "+";
  } else {
    operator = "-";
  }
  formula = [first, operator, second, relation_select];
  // 清空输入框
  inputValue = "";
  // 重置评判结果
  judger.value = 0;
}
generateNewQuestion();

//处理next question的函数
function nextQuestion() {
  generateNewQuestion(); //生成新的题目
}

//判断功能
function judgeAnswer(inputValue) {
  let result = 0;
  result = eval(String(formula[0]) + formula[1] + String(formula[2]));
  ComputerResult = result;
  console.log(formula);
  {
    if (inputValue == result) {
      judger.value = 1;
      score += 1;
      let audio_right = new Audio("../src/assets/right.mp3");
      audio_right.play();
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    } else if (inputValue != "") {
      judger.value = 2;
      let audio_wrong = new Audio("../src/assets/wrong.mp3");
      audio_wrong.play();
    } else {
      judger.value = 0;
    }
  }
  console.log(result, judger.value);
  return judger.value, ComputerResult;
}
</script>

<template>
  <div class="nav">
    <div>Home</div>
    <div>Learn more</div>
    <div>Contact us</div>
  </div>
  <h1>{{ title }}</h1>
  <div style="display: flex; justify-content: center; align-items: center">
    <img style="width: 20px; height: 20px" src="../assets/img/star.png" />
    <h2>&nbsp;&nbsp;Your score is : {{ score }}</h2>
  </div>
  <div>
    <div class="box-container">
      <div v-for="(item, index) in formula" :key="index" class="box">
        {{ item }}
      </div>
      <input
        class="box"
        type="text"
        v-model="inputValue"
        @keyup.enter="judgeAnswer(inputValue)"
        placeholder="Enter your result"
      />
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <button @click="judgeAnswer(inputValue)">Submit</button>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <img
        class="box-container img"
        v-show="judger == 1"
        src="../assets/img/right.png"
      />
      <img
        class="box-container img"
        v-show="judger == 2"
        src="../assets/img/wrong.png"
      />
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <button @click="nextQuestion">next question</button>
    </div>
  </div>
  <div v-show="judger == 2">the answer should be {{ ComputerResult }}</div>
</template>

<style scoped>
/* 手搓导航条 */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  z-index: 3;
  border-bottom: 1px solid #13181b;
}

.box-container {
  display: flex;
  /* align-items: center; */
  justify-content: space-around;
  margin: 10%;
}
.box-container img {
  max-width: 10%; /* 图片的最大宽度为容器的宽度 */
  height: 10%; /* 图片的最大高度为容器的高度 */
  margin: auto; /* 居中图片 */
}
.box {
  /* background-color: #beefc2; */
  border: 1px solid #13181b;
  padding: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
</style>
