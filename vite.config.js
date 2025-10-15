import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./", // 关键：用相对路径
});

// 空白 99% 是因为资源路径用了绝对根路径 /assets/...，
// 而本地我们是 file:// 协议直接双击打开，浏览器把 / 当成系统根目录，当然找不到 JS/CSS。
