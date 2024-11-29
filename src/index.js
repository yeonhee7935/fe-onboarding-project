import { VendingMachine } from "./models/VendingMachine";
import { VendingMachineUI } from "./ui/UIManager";

async function loadProducts() {
  const response = await fetch("/products.json");
  return await response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  const products = await loadProducts();

  const vendingMachine = new VendingMachine(products);

  new VendingMachineUI(vendingMachine);
});
