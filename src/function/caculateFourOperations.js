// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// //封装生成二位数加减法新题目的函数
// function generateNewQuestion() {
//   // 算式里的各个元素
//   // const first = getRandomInt(1, 100);
//   // const second = getRandomInt(1, 100);
//   const operator = "";
//   const randomNumber = getRandomInt(0, 1);
//   if (randomNumber == 0) {
//     operator = "+";
//   } else {
//     operator = "-";
//   }
//   formula = [first, operator, second, relation_select];
//   // 清空输入框
//   inputValue = "";
//   // 重置评判结果
//   judger.value = 0;
// }

// //封装生成二位数乘除法新题目的函数
// function generateAmutiBNewQuestion() {
//   console.log("Generating");
//   // 算式里的各个元素
//   first = getRandomInt(1, 100);
//   second = getRandomInt(1, 100);
//   operator = "";
//   const randomNumber = getRandomInt(0, 1);
//   if (randomNumber == 0) {
//     operator = "×";
//   } else {
//     operator = "÷";
//   }
//   formula = [first, operator, second, relation_select];
//   // 清空输入框
//   inputValue = "";
//   // 重置评判结果
//   judger.value = 0;
// }

function test() {
  console.log("hello world!");
}

// export const generateAmutiBNewQuestions = generateNewQuestion();
export const tests = test();
