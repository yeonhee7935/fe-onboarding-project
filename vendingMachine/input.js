export function initializeInput(state) {
  const moneyInput = document.getElementById("money-input");
  const insertButton = document.getElementById("insert-money");
  const returnButton = document.getElementById("return-money");
  insertButton.addEventListener("click", () => {
    const value = parseInt(moneyInput.value, 10);

    if (!isNaN(value) && value > 0) {
      state.balance += value;
      state.updateDisplay(state.balance);
      state.addLog(`${value.toLocaleString()}원을 투입했습니다.`);
    } else {
      alert("올바른 금액을 입력해주세요.");
    }

    moneyInput.value = ""; // 입력 필드 초기화
  });
  returnButton.addEventListener("click", () => {
    if (state.balance > 0) {
      state.addLog(`${state.balance}원을 반환합니다.`);
      state.balance = 0;
      state.updateDisplay(state.balance);
    }
    moneyInput.value = ""; // 입력 필드 초기화
  });
}
