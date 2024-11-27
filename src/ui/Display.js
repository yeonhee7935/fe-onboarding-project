export class Display {
  constructor() {
    this.display = document.getElementById("display");
  }
  update(balance) {
    this.display.textContent = balance.toLocaleString();
  }
}
