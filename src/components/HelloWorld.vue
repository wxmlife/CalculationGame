<script setup>
import { ref, watch } from "vue";

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

// 生成随机整数的函数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomNumber = Math.floor(Math.random() * 2);

// 算式里的各个元素
let first = getRandomInt(1, 100);
let second = getRandomInt(1, 100);
let operator = "";
if (randomNumber == 0) {
  operator = "+";
} else {
  operator = "-";
}
// result = eval(first, operator, second);
// result = first + second;
let formula = [first, operator, second, relation_select];

function judgeAnswer(inputValue) {
  let result = 0;
  result = eval(String(first) + operator + String(second));
  console.log(formula);
  {
    if (inputValue == result) {
      judger.value = 1;
      let audio_right = new Audio("../src/assets/right.mp3");
      audio_right.play();
    } else if (inputValue != "") {
      judger.value = 2;
      let audio_wrong = new Audio("../src/assets/wrong.mp3");
      audio_wrong.play();
    } else {
      judger.value = 0;
    }
  }
  console.log(result, judger.value);
  return judger.value;
}
// judger = judgeAnswer(inputValue, judger);
// const relation = ''
// if()
// function ProcessData(inputValue, judge) {
//   // this.Process = true;
//   // Process = this.Process;
//   this.judge = 0;
//   const result = a + b;
//   console.log(result);
//   if (inputValue == result) {
//     this.judge = 1;
//     console.log(result, this.judge);
//   } else this.judge = 2;

//   judge = this.judge;
//   return judge;
// }
// console.log(judger.value);
// function Process(inputValue, judge) {
//   watch(inputValue, (newValue, oldValue) => {
//     judge = 0;
//     const result = a + b;
//     console.log(result);
//     if (inputValue == result) {
//       judge = 1;
//     } else judge = 2;

//     return judge;
//   });
// }
// console.log(typeof newValue);
// console.log("Now Ru is " + Ru);
// console.log(`count 变化了：从 ${oldValue} 到 ${newValue}`);

// toggleButtonState() {
//       if (judge==true) {
//         this.buttonState = true;
//       } else if (this.buttonState == false) {
//         this.buttonState = 'state3';
//       } else {
//         this.buttonState = 'state1';
//       }
//     }
</script>

<template>
  <div>
    <h1>{{ title }}</h1>

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
      <button
        v-show="judger == 1"
        style="
          background-color: rgba(47, 255, 109, 0.775);
          flex: 1; /* 使用flex属性，让按钮自适应宽高并平均分配父容器的空间 */
          min-width: 100px; /* 设置最小宽度，确保按钮不会过小 */
          min-height: 100px; /* 设置最小高度，确保按钮不会过小 */
          color: aliceblue;
          font-size: xx-large;
          border-radius: 25%;
        "
      >
        √
      </button>
      <button
        v-show="judger == 2"
        style="
          background-color: rgba(255, 66, 4, 0.775);
          color: aliceblue;
          font-size: xx-large;
          border-radius: 25%;
        "
      >
        ×
      </button>
    </div>

    <!-- <div class="box-container">
      <div class="box">{{ a }}</div>
      <div class="box">+</div>
      <div class="box">{{ b }}</div>
      <div class="box">=</div>
      <input class="box" v-model="inputValue" placeholder="Enter your result" />
      <p>{{ judge }}</p>
      <button @click="ProcessData(inputValue, judge)">Submit</button>
      <p>&nbsp;&nbsp;&nbsp;</p> -->

    <!-- <button
        v-if="judge == 1"
        style="
          background-color: rgba(47, 255, 109, 0.775);
          color: aliceblue;
          font-size: larger;
          font-style: bold;
          border-radius: 50%;
        "
      >
        √
      </button>
      <button
        v-else-if="judge == 2"
        style="
          background-color: rgba(255, 66, 4, 0.775);
          color: aliceblue;
          font-size: larger;
          font-style: bold;
          border-radius: 50%;
        "
      >
        ×
      </button> -->
    <slot>your judger now is {{ judger }}</slot>
  </div>
</template>

<style scoped>
.box-container {
  display: flex;
  /* align-items: left; */
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
