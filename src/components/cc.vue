<!-- CalculationGame.vue -->
<template>
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
    </div>
    <div class="box-container">
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <button @click="judgeAnswer(inputValue)">Submit</button>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <button @click="nextQuestion">Next Question</button>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <button @click="generateAmutiBNewQuestions">Test</button>
    </div>
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
    <div v-show="judger.value === 1">You are right, good job!</div>
    <div v-show="judger.value === 2">
      The answer should be {{ ComputerResult }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Props
const props = defineProps({
  title: {
    type: String,
    default: "Calculation Game",
  },
});

// Reactive variables
let first = ref(getRandomInt(1, 100));
let second = ref(getRandomInt(1, 100));
let operator = ref("");
let formula = ref([]);
let inputValue = ref("");
let judger = ref({ value: 0 });
let ComputerResult = ref(0);
let score = ref(0);

// Generate random integers
function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// Random operator selection
const randomNumber = Math.floor(Math.random() * 2);
if (randomNumber === 0) {
  operator.value = "+";
} else {
  operator.value = "-";
}

// Function to generate a new question
function generateNewQuestion() {
  first.value = getRandomInt(1, 100);
  second.value = getRandomInt(1, 100);
  operator.value = Math.random() < 0.5 ? "+" : "-";
  formula.value = [first.value, operator.value, second.value];
  inputValue.value = "";
  judger.value = { value: 0 };
}

// Function to judge the answer
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

<style scoped>
.box-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10%;
}
.box {
  border: 1px solid #13181b;
  padding: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
</style>
