export class LogPanel {
  constructor() {
    this.logContainer = document.getElementById("log");
    this.logs = [];
  }

  // 로그 추가
  addLog(message) {
    this.logs.push(message);

    const logItem = document.createElement("div");
    logItem.textContent = message;
    this.logContainer.appendChild(logItem);

    this.logContainer.scrollTop = this.logContainer.scrollHeight; // 최신 로그로 자동 스크롤
  }
}
