<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // 动态加载p5.js库
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js";
  script.onload = initSketch;
  document.head.appendChild(script);

  function initSketch() {
    new p5((p) => {
      let digits = [];
      const digitSize = 16;
      const digitCount = 50;
      const fadeSpeed = 3;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0, 0);
        canvas.style("z-index", "-1");
        p.textSize(digitSize);
        p.textStyle(p.BOLD); // 加粗数字

        // 初始化数字
        for (let i = 0; i < digitCount; i++) {
          digits.push({
            x: p.random(p.width),
            y: p.random(-p.height, 0),
            speed: p.random(1, 5),
            value: Math.floor(p.random(0, 10)),
            alpha: p.random(100, 200), // 降低初始透明度
          });
        }
      };

      p.draw = () => {
        // 使用半透明填充创建拖尾效果
        p.background(255, 255, 255, 15); // 轻微白色覆盖，形成淡出效果

        // 绘制数字
        for (let i = 0; i < digits.length; i++) {
          const digit = digits[i];

          // 使用蓝色系数字，在白色背景上更清晰
          p.fill(30, 120, 200, digit.alpha);
          p.text(digit.value, digit.x, digit.y);

          // 更新位置
          digit.y += digit.speed;

          // 随机改变数字
          if (p.frameCount % 10 === 0) {
            digit.value = Math.floor(p.random(0, 10));
          }

          // 重置超出屏幕的数字
          if (digit.y > p.height) {
            digit.y = p.random(-100, -10);
            digit.x = p.random(p.width);
            digit.alpha = 200;
          }

          // 淡出效果
          digit.alpha = p.max(30, digit.alpha - fadeSpeed);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    }, document.body);
  }
});
</script>

<template>
  <div class="box">
    <h1>Calculation Game!</h1>
    <p>欢迎来到数学计算游戏</p>
    <p>本游戏专为学生进行数学计算训练而创</p>
    <p>请持续锻炼数学运算，保持数感</p>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.6rem;
  margin-top: 10vh;
  position: relative;
  z-index: 1;
  color: #333; /* 深灰色文字在白色背景上更清晰 */
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.8); /* 白色微光提升可读性 */
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
}

/* 重置body样式为白色背景 */
body {
  background-color: white;
  margin: 0;
  overflow-x: hidden;
  font-family: Arial, sans-serif;
  min-height: 100vh;
}
</style>
