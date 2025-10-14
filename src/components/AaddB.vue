<script setup>
import { ref } from "vue";
import rightMp3 from "../assets/right.mp3?url";
import wrongMp3 from "../assets/wrong.mp3?url";

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
// let CongratulationsMessageAlert = ref(CongratulationsMessageAlert());
const showCongratulations = ref({ value: false }); // 控制弹窗的显示
const CongratulationsMessage = ref("");

// 生成随机整数的函数
function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
//加减法随机选择0，
const randomNumber = Math.floor(Math.random() * 2);
if (randomNumber === 0) {
  operator.value = "+";
} else {
  operator.value = "-";
}

//封装生成二位数加减法新题目的函数
function generateNewQuestion() {
  if (score.value < 5) {
    first.value = getRandomInt(1, 100);
    second.value = getRandomInt(1, 100);
    operator.value = Math.random() < 0.5 ? "+" : "-";
    formula.value = [first.value, operator.value, second.value, "="];
  }
  // 第二等级：算法进阶，从二位进阶到三位
  if (score.value >= 5) {
    first.value = getRandomInt(100, 999);
    second.value = getRandomInt(100, 999);
    operator.value = Math.random() < 0.5 ? "+" : "-";
    formula.value = [first.value, operator.value, second.value, "="];
    inputValue = "";
    judger.value = 0;
  }
  // 第三等级：四位数算法
  if (score.value >= 10) {
    first.value = getRandomInt(1000, 9999);
    second.value = getRandomInt(1000, 9999);
    operator.value = Math.random() < 0.5 ? "+" : "-";
    formula.value = [first.value, operator.value, second.value, "="];
    inputValue = "";
    judger.value = 0;
  }
  inputValue = "";
  // 重置评判结果
  judger.value = 0;
}

// 答案判断+进阶判断
function judgeAnswer(input) {
  const result = eval(
    `${formula.value[0]} ${formula.value[1]} ${formula.value[2]}`
  );
  ComputerResult.value = result;

  if (input == result) {
    judger.value = { value: 1 };
    score.value += 1;
    // Play right audio
    new Audio(rightMp3).play();
    // 进阶祝贺判断
    if (score.value == 5 || 10) {
      CongratulationsMessageAlert();
      // 1秒后跳转到下一题
      setTimeout(nextQuestion, 1000);
    }
  } else if (input !== "") {
    judger.value = { value: 2 };
    score.value -= 1;
    // Play wrong audio
    new Audio(wrongMp3).play();
  } else {
    judger.value = { value: 0 };
  }
}

// 进阶祝贺消息函数
function CongratulationsMessageAlert() {
  if (score.value == 5) {
    showCongratulations.value = { value: true }; // 显示祝贺弹窗
    CongratulationsMessage.value = "恭喜你掌握两位数的加减法";

    setTimeout(() => {
      showCongratulations.value = { value: false }; // 关闭弹窗
    }, 10000);
  }
  if (score.value == 10) {
    showCongratulations.value = { value: true }; // 显示祝贺弹窗
    CongratulationsMessage.value = "恭喜你掌握三位数的加减法";

    setTimeout(() => {
      showCongratulations.value = { value: false }; // 关闭弹窗
    }, 2000);
  }
}

// Function to get the next question
function nextQuestion() {
  generateNewQuestion();
}

// Initialize the first question
generateNewQuestion();

// 关闭弹窗
function closeModal() {
  showCongratulations.value = { value: false }; // 关闭弹窗
}
</script>

<template>
  <!-- 正式题目 -->
  <div class="body">
    <!-- 分数展示区 -->
    <div style="display: flex; justify-content: center; align-items: center">
      <img style="width: 20px; height: 20px" src="../assets/img/star.png" />
      <h2>&nbsp;&nbsp;Your score is : {{ score }}</h2>
    </div>

    <!-- 答题算式进阶弹窗提示 -->
    <div v-if="showCongratulations.value == true" class="modal">
      <div class="modal-content">
        <img style="width: 20px; height: 20px" src="../assets/img/star.png" />
        <span class="close" @click="closeModal">&times;</span>
        <p>{{ CongratulationsMessage }}</p>
        <p>接下来准备好挑战更难一点儿的题目了吗？</p>
      </div>
    </div>

    <!-- 加减法的题目渲染与对错判断 -->
    <div class="box-container">
      <!-- 题目渲染 -->
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

    <!-- 辅助功能按钮：提交、下一题 -->
    <div class="box-line">
      <button @click="judgeAnswer(inputValue)">Submit</button>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <button @click="nextQuestion">next question</button>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
    </div>

    <!-- 判定结果反馈 -->
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
</template>

<style scoped>
.body {
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
.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
  width: auto;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
