import { formatCurrency } from "./utils.js";

export function initializeDisplay(state) {
  const display = document.getElementById("display");

  const updateDisplay = (value) => {
    display.textContent = formatCurrency(value);
  };

  // 초기 표시값 설정
  updateDisplay(state.balance);

  // 외부에서 업데이트할 수 있도록 함수 노출
  state.updateDisplay = updateDisplay;
}
