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

  describe("addBalance()", () => {
    it("금액을 투입하면, 투입한 금액만큼 잔액이 증가한다.", () => {
      expect(vendingMachine.getBalance()).toBe(0);

      const money = 10000;
      vendingMachine.addBalance(money);
      expect(vendingMachine.getBalance()).toBe(money);
    });

    it("잘못된 금액(0, 음수, 빈 값)을 투입하면, 오류가 발생한다.", () => {
      expect(() => vendingMachine.addBalance(0)).toThrowError(
        InvalidAmountError,
      );
      expect(() => vendingMachine.addBalance(-500)).toThrowError(
        InvalidAmountError,
      );

      expect(() => vendingMachine.addBalance()).toThrowError(
        InvalidAmountError,
      );
    });
  });

  describe("resetBalance()", () => {
    it("금액을 반환하면, 잔액이 0으로 초기화된다.", () => {
      // 초기상태: 잔액 1000원
      vendingMachine.addBalance(1000);
      expect(vendingMachine.getBalance()).toBe(1000);

      // 금액을 반환하면, 잔액이 0원으로 초기화 된다.
      vendingMachine.resetBalance();
      expect(vendingMachine.getBalance()).toBe(0);
    });

    it("잔액이 0원이면, 예외가 발생한다.", () => {
      // 잔액이 0원이면,
      expect(vendingMachine.getBalance()).toBe(0);

      // 예외가 발생한다.
      expect(() => vendingMachine.resetBalance()).toThrowError(
        NoBalanceToReturnError,
      );
    });
  });

  describe("purchaseProduct()", () => {
    it("잔액이 제품의 금액보다 적으면, 잔액이 부족 예외가 발생한다..", () => {
      // 잔액: 제품1의 가격 -100원
      const balance = products[1].price - 100;
      vendingMachine.addBalance(balance);
      expect(vendingMachine.getBalance()).toBe(balance);

      // 잔액 부족 예외가 발생한다.
      expect(() => vendingMachine.purchaseProduct(products[1])).toThrowError(
        InsufficientAmountError,
      );
    });

    it("잔액이 제품의 금액보다 많으면, 제품을 구매할 수 있다", () => {
      const extraBalance = 100;
      const balance = products[1].price + extraBalance;

      // 잔액: 제품1의 금액 + 100원
      vendingMachine.addBalance(balance);
      expect(vendingMachine.getBalance()).toBe(balance);

      // 제품을 구매할 수 있다.
      vendingMachine.purchaseProduct(products[1]);

      // 구매 후 잔액: 100원
      expect(vendingMachine.getBalance()).toBe(extraBalance);
    });

    it("잔액이 제품의 금액과 같으면, 제품을 구매할 수 있다", () => {
      const balance = products[1].price;
      // 잔액이 제품의 금액과 같으면,
      vendingMachine.addBalance(balance);
      expect(vendingMachine.getBalance()).toBe(balance);

      // 제품을 구매할 수 있다.
      vendingMachine.purchaseProduct(products[1]);

      // 구매 후 잔액: 0원
      expect(vendingMachine.getBalance()).toBe(0);
    });
  });

  describe("getter()", () => {
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
