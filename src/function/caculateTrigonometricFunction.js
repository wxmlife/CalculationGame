// 生成三角函数计算题目
function generateTrigonometryQuestion() {
  // 随机生成一个角度（以度为单位）
  const angle = Math.floor(Math.random() * 360);

  // 随机选择运算符
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  // 构建题目字符串
  let question = "";
  switch (operator) {
    case "+":
      question = `sin(${angle}°) + cos(${angle}°)`;
      break;
    case "-":
      question = `tan(${angle}°) - cot(${angle}°)`;
      break;
    case "*":
      question = `sec(${angle}°) * cosec(${angle}°)`;
      break;
    case "/":
      question = `sin(${angle}°) / cos(${angle}°)`;
      break;
  }

  // 计算题目的答案
  let answer;
  switch (operator) {
    case "+":
      answer = Math.sin(toRadians(angle)) + Math.cos(toRadians(angle));
      break;
    case "-":
      answer = Math.tan(toRadians(angle)) - 1 / Math.tan(toRadians(angle));
      break;
    case "*":
      answer =
        ((1 / Math.cos(toRadians(angle))) * 1) / Math.sin(toRadians(angle));
      break;
    case "/":
      answer = Math.sin(toRadians(angle)) / Math.cos(toRadians(angle));
      break;
  }

  // 返回题目和答案
  return {
    question,
    answer,
  };
}

// 辅助函数：将角度转换为弧度
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// 生成特殊角度及其+k*180的三角函数计算题目
function generateSpecialAngleQuestion() {
  // 随机选择一个特殊角度
  const specialAngles = [15, 30, 45, 60, 75];
  const angle = specialAngles[Math.floor(Math.random() * specialAngles.length)];

  // 随机选择 k 的值，范围为 -2 到 2（包括 -2 和 2）
  const k = Math.floor(Math.random() * 5) - 2;

  // 随机选择运算符
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  // 构建题目字符串
  let question = "";
  switch (operator) {
    case "+":
      question = `sin(${angle}°${
        k !== 0 ? ` + ${k}*180°` : ""
      }) + cos(${angle}°${k !== 0 ? ` + ${k}*180°` : ""})`;
      break;
    case "-":
      question = `tan(${angle}°${
        k !== 0 ? ` + ${k}*180°` : ""
      }) - cot(${angle}°${k !== 0 ? ` + ${k}*180°` : ""})`;
      break;
    case "*":
      question = `sec(${angle}°${
        k !== 0 ? ` + ${k}*180°` : ""
      }) * cosec(${angle}°${k !== 0 ? ` + ${k}*180°` : ""})`;
      break;
    case "/":
      question = `sin(${angle}°${
        k !== 0 ? ` + ${k}*180°` : ""
      }) / cos(${angle}°${k !== 0 ? ` + ${k}*180°` : ""})`;
      break;
  }

  // 计算题目的答案
  let answer;
  switch (operator) {
    case "+":
      answer =
        Math.sin(toRadians(angle + k * 180)) +
        Math.cos(toRadians(angle + k * 180));
      break;
    case "-":
      answer =
        Math.tan(toRadians(angle + k * 180)) -
        1 / Math.tan(toRadians(angle + k * 180));
      break;
    case "*":
      answer =
        ((1 / Math.cos(toRadians(angle + k * 180))) * 1) /
        Math.sin(toRadians(angle + k * 180));
      break;
    case "/":
      answer =
        Math.sin(toRadians(angle + k * 180)) /
        Math.cos(toRadians(angle + k * 180));
      break;
  }

  // 返回题目和答案
  return {
    question,
    answer,
  };
}

// 示例使用
const question = generateSpecialAngleQuestion();

// 示例使用
// const question = generateTrigonometryQuestion();
console.log("Question:", question.question);
const userInput = prompt("请输入答案：");
if (userInput == question.answer) {
  console.log("right");
} else {
  console.log("no,the question's answer is", question.answer);
}
