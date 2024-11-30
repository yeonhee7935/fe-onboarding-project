export class LogPanel {
  constructor(logContainerElement) {
    this.logContainer = logContainerElement;
  }

  // 로그 추가
  addLog(message) {
    const logItem = document.createElement("div");
    logItem.textContent = message;
    this.logContainer.appendChild(logItem);

    this.logContainer.scrollTop = this.logContainer.scrollHeight; // 최신 로그로 자동 스크롤
  }
}
