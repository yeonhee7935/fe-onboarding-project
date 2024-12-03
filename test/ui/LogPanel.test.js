import { beforeEach, describe, expect, vi } from "vitest";
import { LogPanel } from "../../src/ui/LogPanel";

describe("LogPanel", () => {
  let logContainerElement;
  let logPanel;

  beforeEach(() => {
    logContainerElement = {
      appendChild: () => {},
      scrollTop: 0,
      scrollHeight: 0,
    };
    logPanel = new LogPanel(logContainerElement);
  });

  it("새로운 로그가 추가되면 logContainer에 추가된다", () => {
    const message = "로그메시지";
    const appendChildSpy = vi.spyOn(logContainerElement, "appendChild");
    logPanel.addLog(message);
    expect(appendChildSpy).toHaveBeenCalledTimes(1);
    expect(appendChildSpy).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("새로운 로그가 추가되면 logContainer가 최신 로그로 자동 스크롤 된다.", () => {
    logContainerElement.scrollHeight = 100;
    logContainerElement.scrollTop = 0;
    const scrollTopSpy = vi.spyOn(logContainerElement, "scrollTop", "set");

    logPanel.addLog("새 로그 메시지");

    expect(scrollTopSpy).toHaveBeenCalledWith(100);
  });

  it("여러 로그 메시지가 순차적으로 추가된다.", () => {
    const messages = ["첫 번째 로그", "두 번째 로그", "세 번째 로그"];

    // 로그 메시지 추가
    const appendChildSpy = vi.spyOn(logContainerElement, "appendChild");

    messages.forEach((message) => logPanel.addLog(message));

    // logContainer에 추가된 로그의 수 확인
    expect(appendChildSpy).toHaveBeenCalledTimes(messages.length);
  });
});
