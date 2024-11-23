import { initializeInput } from "./vendingMachine/input.js";
import { initializeLog } from "./vendingMachine/log.js";
import { initializeButtons } from "./vendingMachine/buttons.js";
import { initializeDisplay } from "./vendingMachine/display.js";
document.addEventListener("DOMContentLoaded", () => {
  const state = {
    balance: 0,
    log: [],
    products: [
      { name: "Cola", price: 1500 },
      { name: "Water", price: 1500 },
      { name: "Juice", price: 2000 },
    ],
  };
  initializeDisplay(state);
  initializeButtons(state);
  initializeInput(state);
  initializeLog(state);
});
