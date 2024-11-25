export function initializeButtons(state) {
  const buttonsContainer = document.getElementById("buttons");

  // 상품 버튼 생성
  state.products.forEach((product) => {
    const button = document.createElement("button");
    button.className = "product";
    button.innerHTML = `<strong>${
      product.name
    }</strong><br /><small>${product.price.toLocaleString()}원</small>`;
    buttonsContainer.appendChild(button);

    // 클릭 이벤트
    button.addEventListener("click", () => {
      if (state.balance >= product.price) {
        state.balance -= product.price;
        state.updateDisplay(state.balance);
        state.addLog(
          `${
            product.name
          }(${product.price.toLocaleString()}원)을 구매했습니다.`,
        );
      } else {
        state.updateDisplay(product.price); // 잔액 부족시 가격 표시
        setTimeout(() => state.updateDisplay(state.balance), 1000); // 1초 후 원래 금액 복구
      }
    });
  });
}
