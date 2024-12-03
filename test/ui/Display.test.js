import { describe } from "vitest";
import { Display } from "../../src/ui/Display";

describe("Display", () => {
  let displayElement;
  let display;

  beforeEach(() => {
    // 테스트를 위한 가상의 DOM 요소 생성
    displayElement = {
      textContent: "",
    };
    display = new Display(displayElement);
  });

  it("잔액이 0일 때 화면에 0이 표시된다.", () => {
    const balance = 0;
    display.update(balance);
    expect(displayElement.textContent).toBe("0");
  });

  it("잔액이 10,000원일 때 화면에 10,000이 표시된다.", () => {
    const balance = 10000;
    display.update(balance);
    expect(displayElement.textContent).toBe("10,000");
  });

  it("잔액이 1,000,000원일 때 화면에 1,000,000이 표시된다.", () => {
    const balance = 1000000;
    display.update(balance);
    expect(displayElement.textContent).toBe("1,000,000");
  });
});
