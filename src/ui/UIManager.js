import { Display } from "./Display";
import { LogPanel } from "./LogPanel";

export class VendingMachineUI {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.display = new Display(document.getElementById("display"));
    this.logPanel = new LogPanel(document.getElementById("log"));
    this.currentTimeoutId = null; // 현재 활성화된 타이머 ID를 저장
    this.#init();
  }

  #init() {
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
    const template = document.getElementById("product-button-template");

    products.forEach((product) => {
      const button = this.#createProductButton(template, product);
      buttonsContainer.appendChild(button);
    });

    buttonsContainer.addEventListener("click", (event) => {
      const button = event.target.closest(".product");
      if (button) {
        const productName = button.dataset.name;
        const product = products.find((p) => p.name === productName);
        if (product) {
          this.#handlePurchase(product);
        }
      }
    });
  }

  // 제품 버튼 생성
  #createProductButton(template, product) {
    const buttonElement = template.content.cloneNode(true);
    const button = buttonElement.querySelector(".product");

    button.dataset.name = product.name;
    button.querySelector(".product-name").textContent = product.name;
    button.querySelector(
      ".product-price",
    ).textContent = `${product.price.toLocaleString()}원`;
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
        // 이전 타이머가 있으면 취소
        if (this.currentTimeoutId) {
          clearTimeout(this.currentTimeoutId);
          this.currentTimeoutId = null;
        }

        // 구매 실패 시, 가격을 표시하고 1.5초 뒤 잔액을 다시 표시
        this.display.update(product.price);
        this.currentTimeoutId = setTimeout(() => {
          this.display.update(this.vendingMachine.getBalance());
          this.currentTimeoutId = null; // 타이머 완료 후 초기화
        }, 1500);
      },
    );
  }

  // 거래 처리 및 로깅
  #handleTransaction(transaction, successLogMessage, errorCallback = null) {
    try {
      transaction();
      this.display.update(this.vendingMachine.getBalance());
      this.logPanel.addLog(successLogMessage);
    } catch (e) {
      this.display.update(this.vendingMachine.getBalance());
      this.logPanel.addLog(e.message);

      errorCallback?.();
    }
  }
}
