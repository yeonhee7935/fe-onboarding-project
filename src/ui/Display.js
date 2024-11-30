export class Display {
  constructor(displayElement) {
    this.display = displayElement;
  }
  update(balance) {
    this.display.textContent = this.#formatString(balance);
  }
  #formatString(str) {
    return str.toLocaleString("ko-KR");
  }
}
