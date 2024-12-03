export class VendingMachine {
  constructor(products) {
    this.balance = 0; // 금액
    this.products = products; // 제품 리스트
  }

  // 금액 투입
  addBalance(amount) {
    if (amount <= 0 || isNaN(amount)) {
      throw new Error("금액은 반드시 0원보다 커야 합니다.");
    }
    this.balance += amount;
  }

  // 금액 반환
  resetBalance() {
    if (this.balance <= 0) {
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

  getBalance() {
    return this.balance;
  }

  getAllProducts() {
    return this.products;
  }
  getProductById(id) {
    return this.products[id];
  }
}
