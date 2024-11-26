export class VendingMachine {
  constructor(products) {
    this.balance = 0; // 금액
    this.products = products; // 제품 리스트
  }

  // 금액 투입
  addBalance(amount) {
    if (amount <= 0 || isNaN(amount)) {
      throw new Error("금액은 양수만 가능합니다.");
    }
    this.balance += amount;
  }

  // 금액 반환
  resetBalance() {
    if (this.balance < 0) {
      throw new Error("반환할 금액이 없습니다.");
    }

    this.balance = 0;
  }
  // 제품 구매
  purchaseProduct(product) {
    if (this.balance < product.price) {
      throw new Error("금액이 부족합니다.");
    }
    this.balance -= product.price;
  }

  // 금액과 로그 반환
  getBalance() {
    return this.balance;
  }

  getProducts() {
    return this.products;
  }
}
