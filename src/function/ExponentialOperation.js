// 生成指数计算题目
function generateExponentQuestion() {
  // 随机生成两个数字作为基数
  const base1 = Math.floor(Math.random() * 10) + 1; // 生成1到10之间的随机数
  const base2 = Math.floor(Math.random() * 10) + 1;

  // 随机生成两个数字作为指数
  const exponent1 = Math.floor(Math.random() * 2) + 1; // 生成1到2之间的随机数
  const exponent2 = Math.floor(Math.random() * 2) + 1;

  // 随机选择运算符
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  // 构建题目字符串
  let question = `${base1}^${exponent1} ${operator} ${base2}^${exponent2}`;

  // 计算题目的答案
  let answer;
  switch (operator) {
    case "+":
      answer = Math.pow(base1, exponent1) + Math.pow(base2, exponent2);
      break;
    case "-":
      answer = Math.pow(base1, exponent1) - Math.pow(base2, exponent2);
      break;
    case "*":
      answer = Math.pow(base1, exponent1) * Math.pow(base2, exponent2);
      break;
    case "/":
      answer = Math.pow(base1, exponent1) / Math.pow(base2, exponent2);
      break;
  }

  // 返回题目和答案
  return {
    question,
    answer,
  };
}

// 示例使用
const question = generateExponentQuestion();
console.log("Question:", question.question);
const userInput = prompt("请输入答案：");
if (userInput == question.answer) {
  console.log("right");
} else {
  console.log("no,the question's answer is", question.answer);
}
//   console.log("Answer:", question.answer);
