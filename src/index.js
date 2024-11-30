import { VendingMachine } from "./models/VendingMachine";
import { VendingMachineUI } from "./ui/VendingMachineUI";

async function loadProducts() {
  try {
    const response = await fetch("/products.json");
    return response.json();
  } catch (e) {
    console.error("error while loading data");
    return [];
  }
}
const listToDictionary = (list) => {
  return list.reduce((dict, item) => {
    dict[item.id] = item;
    return dict;
  }, {});
};

document.addEventListener("DOMContentLoaded", async () => {
  const products = listToDictionary(await loadProducts());
  const vendingMachine = new VendingMachine(products);

  new VendingMachineUI(vendingMachine);
});
