import { DisplayManager } from "./DisplayManager";
import { LogManager } from "./LogManager";

export class UIManager {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.displayManager = new DisplayManager();
    this.logManager = new LogManager();
  }

  initializeUI() {
    this.#initButton("insert-money", this.#handleInsertMoney);
    this.#initButton("return-money", this.#handleReturnMoney);
    this.#initProductButtons();
  }

  // 버튼 이벤트 등록
  #initButton(buttonId, handler) {
    const button = document.getElementById(buttonId);
    if (button) button.addEventListener("click", handler.bind(this));
  }

  // 제품 구매 버튼 초기화 및 이벤트 등록
  #initProductButtons() {
    const buttonsContainer = document.getElementById("buttons");
    const products = this.vendingMachine.getProducts();

    products.forEach((product) => {
      const button = this.#createProductButton(product);
      buttonsContainer.appendChild(button);
    });
  }

  // 제품 버튼 생성
  #createProductButton(product) {
    const button = document.createElement("button");
    button.className = "product";
    button.innerHTML = `<strong>${
      product.name
    }</strong><br /><small>${product.price.toLocaleString()}원</small>`;
    button.addEventListener("click", () => this.#handlePurchase(product));
    return button;
  }

  // 금액 투입
  #handleInsertMoney() {
    const moneyInput = document.getElementById("money-input");
    const money = parseInt(moneyInput.value, 10);

    this.#handleTransaction(
      () => this.vendingMachine.addBalance(money),
      `${money}원을 투입했습니다.`,
    );

    moneyInput.value = 0;
  }

  // 금액 반환
  #handleReturnMoney() {
    const balance = this.vendingMachine.getBalance();

    this.#handleTransaction(
      () => this.vendingMachine.resetBalance(),
      `${balance}원을 반환했습니다.`,
    );
  }

  // 제품 구매
  #handlePurchase(product) {
    const balance = this.vendingMachine.getBalance();

    this.#handleTransaction(
      () => this.vendingMachine.purchaseProduct(product),
      `${product.name}을 구매했습니다.`,
      () => {
        // 구매가 실패하면, 가격을 보여주고 원래 잔액을 잠시 뒤에 다시 보여줌
        this.displayManager.updateDisplay(product.price);
        setTimeout(() => this.displayManager.updateDisplay(balance), 1500);
      },
    );
  }

  // 거래 처리 및 로깅
  #handleTransaction(transaction, successLogMessage, errorCallback = null) {
    try {
      transaction();
      this.displayManager.updateDisplay(this.vendingMachine.getBalance());
      this.logManager.addLog(successLogMessage);
    } catch (e) {
      this.displayManager.updateDisplay(this.vendingMachine.getBalance());
      this.logManager.addLog(e.message);

      // 호출된 에러 처리 함수가 있으면 실행
      if (errorCallback) {
        errorCallback();
      }
    }
  }
}
