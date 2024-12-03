import { beforeEach, describe, expect } from "vitest";
import { VendingMachine } from "../../src/models/VendingMachine";
import {
  InsufficientAmountError,
  InvalidAmountError,
  NoBalanceToReturnError,
} from "../../src/errors/VendingMachine";

const products = {
  1: { id: 1, name: "콜라", price: 1000 },
  2: { id: 2, name: "사이다", price: 1200 },
};

describe("VendingMachine", () => {
  let vendingMachine;

  beforeEach(() => {
    vendingMachine = new VendingMachine(products);
  });

  describe("addBalance", () => {
    it("금액을 투입하면 잔액이 증가한다", () => {
      const money = 10000;
      vendingMachine.addBalance(money);
      expect(vendingMachine.getBalance()).toBe(money);
    });

    it("잘못된 금액(0 또는 음수)을 투입하면 오류가 발생한다", () => {
      expect(() => vendingMachine.addBalance(0)).toThrowError(
        InvalidAmountError,
      );
      expect(() => vendingMachine.addBalance(-500)).toThrowError(
        InvalidAmountError,
      );
    });
  });

  describe("resetBalance", () => {
    it("금액을 반환하면 잔액이 0으로 초기화된다", () => {
      vendingMachine.addBalance(1000);
      vendingMachine.resetBalance();
      expect(vendingMachine.getBalance()).toBe(0);
    });

    it("잔액이 부족하면 금액을 반환할 수 없다", () => {
      expect(() => vendingMachine.resetBalance()).toThrowError(
        NoBalanceToReturnError,
      );
    });
  });

  describe("purchaseProduct", () => {
    it("금액이 부족하면 제품을 구매할 수 없다", () => {
      expect(() => vendingMachine.purchaseProduct(products[1])).toThrowError(
        InsufficientAmountError,
      );
    });

    it("금액이 충분하면 제품을 구매할 수 있다", () => {
      vendingMachine.addBalance(products[1].price);
      vendingMachine.purchaseProduct(products[1]);
      expect(vendingMachine.getBalance()).toBe(0); // 제품 가격만큼 차감됨
    });
  });

  describe("제품 조회", () => {
    it("제품 목록을 가져올 수 있다", () => {
      expect(vendingMachine.getAllProducts()).toEqual(products);
    });

    it("ID로 제품을 가져올 수 있다", () => {
      expect(vendingMachine.getProductById(1)).toEqual(products[1]);
    });

    it("유효하지 않은 ID로 제품을 요청하면 undefined를 반환한다", () => {
      expect(vendingMachine.getProductById(99)).toBeUndefined();
    });
  });
});
