import { Display } from "./Display";
import { LogPanel } from "./LogPanel";

export class VendingMachineUI {
  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.display = new Display(document.getElementById("display"));
    this.logPanel = new LogPanel(document.getElementById("log"));
    this.#init();
  }

  #init() {
    this.#initProductButtons();
    this.#bindEventListener("insert-money", this.#onInsertMoney, "click");
    this.#bindEventListener("return-money", this.#onReturnMoney, "click");
    this.#bindEventListener("buttons", this.#onSelectProduct, "mousedown");
    this.#bindEventListener("buttons", this.#onResetBalance, "mouseup");
  }

  // 버튼 이벤트 등록
  #bindEventListener(buttonId, handler, event) {
    const button = document.getElementById(buttonId);
    if (button) button.addEventListener(event, handler.bind(this));
  }

  // 제품 구매 버튼 초기화 및 이벤트 등록
  #initProductButtons() {
    const buttonsContainer = document.getElementById("buttons");
    const products = this.vendingMachine.getAllProducts();
    const template = document.getElementById("product-button-template");

    // 버튼 생성
    const fragment = document.createDocumentFragment();
    Object.entries(products).forEach(([key, product]) => {
      const button = this.#createProductButton(template, product);
      fragment.appendChild(button);
    });
    buttonsContainer.appendChild(fragment);
  }

  // 제품 버튼 생성
  #createProductButton(template, product) {
    const buttonElement = template.content.cloneNode(true);
    const button = buttonElement.querySelector(".product");

    button.dataset.id = product.id;
    button.querySelector(".product-name").textContent = product.name;
    button.querySelector(
      ".product-price",
    ).textContent = `${product.price.toLocaleString()}원`;
    return button;
  }
  // 제품 구매 처리
  #onSelectProduct(event) {
    const button = event.target.closest(".product");
    if (!button) return;

    const productId = button.dataset.id;
    const product = this.vendingMachine.getProductById(productId);

    if (product.price > this.vendingMachine.getBalance()) {
      this.display.update(product.price);
    } else {
      this.#handleTransaction(
        () => this.vendingMachine.purchaseProduct(product),
        `${product.name}을 구매했습니다.`,
      );
    }
  }

  // 디스플레이 잔액 초기화
  #onResetBalance(event) {
    const button = event.target.closest(".product");
    if (!button) return;

    this.display.update(this.vendingMachine.getBalance());
  }

  // 금액 투입
  #onInsertMoney() {
    const moneyInput = document.getElementById("money-input");
    const money = parseInt(moneyInput.value, 10);

    this.#handleTransaction(
      () => this.vendingMachine.addBalance(money),
      `${money}원을 투입했습니다.`,
    );

    moneyInput.value = 0;
  }

  // 금액 반환
  #onReturnMoney() {
    const balance = this.vendingMachine.getBalance();

    this.#handleTransaction(
      () => this.vendingMachine.resetBalance(),
      `${balance}원을 반환했습니다.`,
    );
  }

  // 거래 처리 및 로깅
  #handleTransaction(transaction, successLogMessage) {
    try {
      transaction();
      this.display.update(this.vendingMachine.getBalance());
      this.logPanel.addLog(successLogMessage);
    } catch (e) {
      this.display.update(this.vendingMachine.getBalance());
      this.logPanel.addLog(e.message);
    }
  }
}
