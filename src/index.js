import { VendingMachine } from "./models/VendingMachine";
import { VendingMachineUI } from "./ui/UIManager";

async function loadProducts() {
  try {
    const response = await fetch("/products.json");
    return response.json();
  } catch (e) {
    console.error("error while loading data");
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const products = await loadProducts();

  const vendingMachine = new VendingMachine(products);

  new VendingMachineUI(vendingMachine);
});
