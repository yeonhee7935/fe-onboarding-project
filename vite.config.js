import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true, // 글로벌 API를 사용하기 위해 설정
    environment: "jsdom", // jsdom 환경을 설정 (DOM 테스트를 위해 필요)
  },
});
