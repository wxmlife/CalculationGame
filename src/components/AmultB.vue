<script setup>
import { ref } from "vue";

// data区
const props = defineProps({
  title: {
    type: String,
    default: "Calculation Game",
  },
});

// 第一次正式渲染
// 二位数加减法的题目：算式里的各个元素
let first = ref(getRandomInt(1, 100));
let second = ref(getRandomInt(1, 100));
let operator = ref("");
let formula = ref([]);
let inputValue = ref("");
let judger = ref({ value: 0 });
let ComputerResult = ref(0);
let score = ref(0);

let AaddB = 0;
let AmutiB = 0;

// 生成随机整数的函数
function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
//加减法随机选择0，
const randomNumber = Math.floor(Math.random() * 2);
if (randomNumber === 0) {
  operator.value = "*";
} else {
  operator.value = "//";
}

//封装生成二位数加减法新题目的函数
function generateNewQuestion() {
  first.value = getRandomInt(1, 100);
  second.value = getRandomInt(1, 100);
  operator.value = Math.random() < 0.5 ? "*" : "//";
  formula.value = [first.value, operator.value, second.value, "="];
  // 清空输入框
  inputValue = "";
  // 重置评判结果
  judger.value = 0;
}

// 答案判断
function judgeAnswer(input) {
  const result = eval(
    `${formula.value[0]} ${formula.value[1]} ${formula.value[2]}`
  );
  ComputerResult.value = result;

  if (input == result) {
    judger.value = { value: 1 };
    score.value += 1;
    // Play right audio
    new Audio("../src/assets/right.mp3").play();
    setTimeout(nextQuestion, 1000);
  } else if (input !== "") {
    judger.value = { value: 2 };
    // Play wrong audio
    new Audio("../src/assets/wrong.mp3").play();
  } else {
    judger.value = { value: 0 };
  }
}

// Function to get the next question
function nextQuestion() {
  generateNewQuestion();
}

// Initialize the first question
generateNewQuestion();
</script>

<template>
  <!-- 正式题目 -->
  <div class="context">
    <div style="display: flex; justify-content: center; align-items: center">
      <img style="width: 20px; height: 20px" src="../assets/img/star.png" />
      <h2>&nbsp;&nbsp;Your score is : {{ score }}</h2>
    </div>

    <!-- 加减法的题目与对错判断 -->
    <div class="box-container">
      <div v-for="(item, index) in formula" :key="index" class="box">
        {{ item }}
      </div>
      <input
        class="box"
        type="text"
        v-model="inputValue"
        @keyup.enter="judgeAnswer(inputValue)"
        placeholder="..."
      />
    </div>
    <div class="box-line">
      <button @click="judgeAnswer(inputValue)">Submit</button>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <button @click="nextQuestion">next question</button>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <button @click="generateAmutiBNewQuestions">test</button>
    </div>
    <div style="display: flex; justify-content: center; align-items: center">
      <img
        style="width: 20px; height: 20px"
        v-show="judger.value === 1"
        src="../assets/img/right.png"
      />
      <img
        style="width: 20px; height: 20px"
        v-show="judger.value === 2"
        src="../assets/img/wrong.png"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div v-show="judger.value === 1">Your are right, good job!</div>
      <div v-show="judger.value === 2">
        the answer should be {{ ComputerResult }}
      </div>
    </div>
  </div>
  <!-- 乘除法的题目与对错判断 -->
</template>

<style scoped>
.context {
  display: block;
  justify-content: space-around;
}
.box-line {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10%;
}
.box-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10%;
}
.box {
  /* background-color: #beefc2; */
  box-sizing: border-box;
  height: 50px;
  border: 1px solid #13181b;
  padding: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
</style>
