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
  <!-- 最外层：上下居中 + 轻微渐变背景 -->
  <div class="game-wrap">
    <!-- 1. 分数 -->
    <div class="score">
      <!-- <img class="score img" src="../assets/img/star.png" /> -->
      <h2>🌟 Your score is : {{ score }}</h2>
    </div>

    <!-- 5.弹窗：答题算式进阶弹窗提示 -->
    <div v-if="showCongratulations.value == true" class="modal">
      <div class="modal-content">
        <img style="width: 20px; height: 20px" src="../assets/img/star.png" />
        <span class="close" @click="closeModal">&times;</span>
        <p>{{ CongratulationsMessage }}</p>
        <p>接下来准备好挑战更难一点儿的题目了吗？</p>
      </div>
    </div>

    <!-- 2. 题目呈现：像一张卡片 -->
    <section class="question-box">
      <div class="formula">
        <span class="num">{{ first }}</span>
        <span class="op">{{ operator }}</span>
        <span class="num">{{ second }}</span>
        <span class="eq">=</span>
        &nbsp;
      </div>
      <input
        v-model="inputValue"
        @keyup.enter="judgeAnswer(inputValue)"
        class="answer-input"
        placeholder=" ? "
      />
    </section>

    <!-- 3. 按钮 -->
    <section class="ctrl-bar">
      <button class="btn" @click="judgeAnswer(inputValue)">提交</button>
      &nbsp;&nbsp;
      <button class="btn" @click="nextQuestion">下一题</button>
    </section>

    <!-- 4. 反馈 -->
    <transition name="fade">
      <div v-if="judger.value" class="feedback">
        <img v-if="judger.value === 1" src="../assets/img/right.png" />
        <img v-else src="../assets/img/wrong.png" />
        <span v-if="judger.value === 1">答对了！继续加油~</span>
        <span v-else>正确答案：{{ ComputerResult }}</span>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* ------ CSS 变量，改这里就能换主题 ------ */
:root {
  /* 连续变化字号：最小值, 首选值, 最大值 */
  --fs-score: clamp(0.9rem, 1.2vw, 1.1rem);
  --fs-formula: clamp(1.5rem, 4vw, 2.2rem);
  --fs-input: clamp(1.2rem, 3vw, 1.8rem);
  --fs-btn: clamp(0.8rem, 2vw, 1rem);

  /* 卡片宽度：手机几乎满屏，桌面最大 480px */
  --card-w: min(92vw, 480px);
  /* 按钮高度：手机 32px → 电脑 40px */
  --btn-h: clamp(28px, 6vw, 36px);

  /* 圆角 & 阴影 也随屏宽变化 */
  --radius: clamp(4px, 1vw, 8px);
  --shadow: 0 2px clamp(4px, 1vw, 12px) rgba(0, 0, 0, 0.08);

  /* 颜色保持刚才的“普通风” */
  --bg: #f3f5f7;
  --card: #ffffff;
  --text: #333333;
  --text-light: #666666;
  --border: #e0e0e0;
}

/* 整体卡片 */
.game-wrap {
  width: var(--card-w);
  margin: 2rem auto;
  background: var(--bg);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: var(--text);
  text-align: center;
  padding: clamp(1rem, 3vw, 2rem);
  border-radius: var(--radius);
}

/* 1. 分数栏 */
.score {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.4rem;
  font-size: var(--fs-score);
  margin-bottom: clamp(1rem, 3vw, 2rem);
}
.score img {
  width: clamp(16px, 2vw, 40px);
  height: clamp(16px, 2vw, 40px);
}

/* 2. 题目卡片 */
.question-box {
  background: #fafafa;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  margin-bottom: 24px;
}
.formula {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 16px;
}
.formula .num {
  min-width: 60px;
}
.formula .op {
  color: var(--primary);
}
.formula .eq {
  margin: 0 4px;
}

/* 输入框 */
.answer-input {
  width: 120px;
  height: 48px;
  font-size: 28px;
  text-align: center;
  border: 2px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}
.answer-input:focus {
  border-color: var(--primary);
}

/* 3. 按钮栏 */
.ctrl-bar {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
}
.btn {
  height: var(--btn-h);
  line-height: var(--btn-h);
  padding: 10px 24px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #000;
  background: #fff;
  color: #000;
  cursor: pointer;
  transition: background 0.2s;
}
.btn:hover {
  background: #fff8f0;
  border-color: #000;
}

/* 4. 反馈 */
.feedback {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
  min-height: 24px;
}
.feedback img {
  width: 24px;
  height: 24px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
