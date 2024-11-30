export class Display {
  constructor(displayElement) {
    this.display = displayElement;
  }
  update(balance) {
    this.display.textContent = balance.toLocaleString();
  }
}
