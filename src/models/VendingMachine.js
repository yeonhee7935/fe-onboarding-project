import {
  InsufficientAmountError,
  InvalidAmountError,
  NoBalanceToReturnError,
} from "../errors/VendingMachine";

export class VendingMachine {
  constructor(products) {
    this.balance = 0; // 금액
    this.products = products; // 제품 리스트
  }

  // 금액 투입
  addBalance(amount) {
    if (amount <= 0 || isNaN(amount)) {
      throw new InvalidAmountError();
    }
    this.balance += amount;
  }

  // 금액 반환
  resetBalance() {
    if (this.balance <= 0) {
      throw new NoBalanceToReturnError();
    }

    this.balance = 0;
  }
  // 제품 구매
  purchaseProduct(product) {
    if (this.balance < product.price) {
      throw new InsufficientAmountError();
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
