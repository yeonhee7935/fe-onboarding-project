export function initializeInput(state) {
  const moneyInput = document.getElementById("money-input");
  const insertButton = document.getElementById("insert-money");

  insertButton.addEventListener("click", () => {
    const value = parseInt(moneyInput.value, 10);

    if (!isNaN(value) && value > 0) {
      state.balance += value;
      state.updateDisplay(state.balance);
      state.addLog(`금액 투입: +${value.toLocaleString()}원`);
    } else {
      alert("올바른 금액을 입력해주세요.");
    }

    moneyInput.value = ""; // 입력 필드 초기화
  });
}
