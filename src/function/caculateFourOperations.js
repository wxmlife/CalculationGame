// let judge = false;
import { ref, watch } from "vue";
let relation_select = "=";
let inputValue = ref();
let judger = ref();
judger.value = 0;

// 生成随机整数的函数
function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
//加减法随机选择0，
const randomNumber = Math.floor(Math.random() * 2);

// 第一次正式渲染二位数加减法的题目：算式里的各个元素
let first = getRandomInt(1, 100);
let second = getRandomInt(1, 100);
let operator = "";
if (randomNumber == 0) {
  operator = "+";
} else {
  operator = "-";
}
let formula = [first, operator, second, relation_select];

//封装生成二位数加减法新题目的函数
export function generateNewQuestion() {
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

//封装生成二位数乘除法新题目的函数
export function generateAmutiBNewQuestion() {
  console.log("Generating");
  // 算式里的各个元素
  first = getRandomInt(1, 100);
  second = getRandomInt(1, 100);
  operator = "";
  if (randomNumber == 0) {
    operator = "×";
  } else {
    operator = "÷";
  }
  formula = [first, operator, second, relation_select];
  // 清空输入框
  inputValue = "";
  // 重置评判结果
  judger.value = 0;
}

export function test() {
  console.log("hello world!");
}
