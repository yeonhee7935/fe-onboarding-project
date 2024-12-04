import { describe, it, expect, vi, beforeEach } from "vitest";
import { listToDictionary, loadProducts } from "../src";

describe("listToDictionary()", () => {
  const products = [
    { id: "1", name: "콜라", price: 1500 },
    { id: "2", name: "사이다", price: 1300 },
  ];
  const productsWithOutId = [
    { name: "콜라", price: 1500 },
    { name: "사이다", price: 1300 },
  ];

  it("리스트의 각 요소가 id 필드를 갖는 경우, 리스트를 딕셔너리로 변환한다.", () => {
    const dictionary = listToDictionary(products);

    expect(dictionary).toEqual({
      1: { id: "1", name: "콜라", price: 1500 },
      2: { id: "2", name: "사이다", price: 1300 },
    });
  });

  it("빈 배열인 경우, 빈 객체를 반환한다.", () => {
    const dictionary = listToDictionary([]);
    expect(dictionary).toEqual({});
  });

  it("id가 없는 요소가 포함된 경우, 예외가 발생한다.", () => {
    expect(() => listToDictionary(productsWithOutId)).toThrowError();
  });
});
