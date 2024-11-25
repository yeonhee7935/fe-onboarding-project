import { initializeInput } from "./vendingMachine/input";
import { initializeLog } from "./vendingMachine/log";
import { initializeButtons } from "./vendingMachine/buttons";
import { initializeDisplay } from "./vendingMachine/display";
document.addEventListener("DOMContentLoaded", () => {
  const state = {
    balance: 0,
    log: [],
    products: [
      { name: "콜라", price: 1500 },
      { name: "속이사이다", price: 1500 },
      { name: "판타지판타", price: 2000 },
      { name: "오뎅국물", price: 1500 },
      { name: "부장라떼", price: 2000 },
      { name: "판타지판타", price: 2000 },
      { name: "레드불", price: 2000 },
      { name: "핫세븐", price: 2000 },
      { name: "커피우유", price: 2000 },
    ],
  };
  initializeDisplay(state);
  initializeButtons(state);
  initializeInput(state);
  initializeLog(state);
});
