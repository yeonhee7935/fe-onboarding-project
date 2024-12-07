import { describe, it, expect, vi } from "vitest";
import { listToDictionary, loadProducts } from "../src";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const products = [
  { id: "1", name: "콜라", price: 1500 },
  { id: "2", name: "사이다", price: 1300 },
];
const productsWithOutId = [
  { name: "콜라", price: 1500 },
  { name: "사이다", price: 1300 },
];

const server = setupServer(
  http.get("/products.json", () => {
    return HttpResponse.json(products);
  }),
);

describe("loadProducts()", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("정상적인 응답을 받을 경우 제품 목록을 반환한다.", async () => {
    const result = await loadProducts();
    expect(result).toEqual(products);
  });

  it("서버 오류가 발생한 경우, 빈 배열을 반환한다.", async () => {
    // 서버 오류(500) 시뮬레이션
    server.use(
      http.get("/products.json", (req, res) => {
        return HttpResponse.error();
      }),
    );

    const result = await loadProducts();
    expect(result).toEqual([]); // 실패 시 빈 배열을 반환
  });
});

describe("listToDictionary()", () => {
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
