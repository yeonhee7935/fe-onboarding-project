export class DisplayManager {
  constructor() {
    this.display = document.getElementById("display");
  }
  updateDisplay(balance) {
    this.display.textContent = balance.toLocaleString();
  }
}
