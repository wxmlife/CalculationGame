<script setup>
import { ref, watch } from "vue";
import {
  test,
  generateAmutiBNewQuestion,
} from "../function/caculateFourOperations.js";
// import TabbleBar from "./TabbleBar.vue";

// data区
defineProps({
  // msg: String,
  title: String,
  first: 0,
  second: 0,
  operator: "",
  formula: [],
});

// 第一次正式渲染二位数加减法的题目：算式里的各个元素
// let first = getRandomInt(1, 100);
// let second = getRandomInt(1, 100);
// let operator = "";
// if (randomNumber == 0) {
//   operator = "+";
// } else {
//   operator = "-";
// }
// let formula = [first, operator, second, relation_select];

const title = "Calculation Game";
// let count = 0;
// let Ru = false;
// let Process = false;
// let judge = false;
let relation_select = "=";
let inputValue = ref();
let judger = ref();
judger.value = 0;
let ComputerResult = 0;
let score = 0;

let AaddB = 0;
let AmutiB = 0;

// 生成随机整数的函数
function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
//加减法随机选择0，
const randomNumber = Math.floor(Math.random() * 2);

//封装生成二位数加减法新题目的函数
function generateNewQuestion() {
  // 算式里的各个元素
  let first = getRandomInt(1, 100);
  let second = getRandomInt(1, 100);
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

function generateAmutiBNewQuestions() {
  // 算式里的各个元素
  first = getRandomInt(1, 100);
  second = getRandomInt(1, 100);
  operator = "";
  if (randomNumber == 0) {
    operator = "X";
  } else {
    operator = "%";
  }
  formula = [first, operator, second, relation_select];
  // 清空输入框
  inputValue = "";
  // 重置评判结果
  judger.value = 0;
}

generateNewQuestion();
generateAmutiBNewQuestions();

//处理next question的函数
function nextQuestion() {
  // if (AopB == 1) {
  // generateAmutiBNewQuestions();
  generateNewQuestion();
  //生成新的题目
  // } else if (AmutiB == 1) {
  //   console.log("generateAmutiBNewQuestion()"); //
  // }
}

function changeAmutiBNewQuestions() {
  generateAmutiBNewQuestions();
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
  <!-- 正式题目 -->
  <h1>{{ title }}</h1>
  <div style="display: flex; justify-content: center; align-items: center">
    <img style="width: 20px; height: 20px" src="../assets/img/star.png" />
    <h2>&nbsp;&nbsp;Your score is : {{ score }}</h2>
  </div>

  <!-- 加减法的题目与对错判断 -->
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
      <button @click="nextQuestion">next question</button>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <button @click="generateAmutiBNewQuestions">test</button>
    </div>
  </div>
  <div style="display: flex; justify-content: center; align-items: center">
    <img
      style="width: 20px; height: 20px"
      v-show="judger == 1"
      src="../assets/img/right.png"
    />
    <img
      style="width: 20px; height: 20px"
      v-show="judger == 2"
      src="../assets/img/wrong.png"
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
    <div v-show="judger == 1">Your are right, good job!</div>
    <div v-show="judger == 2">the answer should be {{ ComputerResult }}</div>
  </div>

  <!-- 乘除法的题目与对错判断 -->
</template>

<style scoped>
.box-container {
  display: flex;
  /* align-items: center; */
  justify-content: space-around;
  margin: 10%;
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
