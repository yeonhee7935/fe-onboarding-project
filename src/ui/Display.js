import { formatString } from "../utils/format";

export class Display {
  constructor(displayElement) {
    this.display = displayElement;
  }
  update(balance) {
    this.display.textContent = formatString(balance);
  }
}
