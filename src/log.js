export function initializeLog(state) {
  const logContainer = document.getElementById("log");

  const addLog = (message) => {
    state.log.push(message);

    // 로그 출력
    const logEntry = document.createElement("div");
    logEntry.textContent = message;
    logContainer.appendChild(logEntry);

    // 자동 스크롤
    logContainer.scrollTop = logContainer.scrollHeight;
  };

  // 외부에서 사용할 수 있도록 함수 노출
  state.addLog = addLog;
}
