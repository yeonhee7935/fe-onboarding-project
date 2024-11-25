import { VendingMachine } from "./models/VendingMachine";
import { UIManager } from "./ui/UIManager";
document.addEventListener("DOMContentLoaded", () => {
  // 자판기 인스턴스 생성
  const vendingMachine = new VendingMachine();

  // 제품 추가
  vendingMachine.addProduct("콜라", 1500);
  vendingMachine.addProduct("속이사이다", 1500);
  vendingMachine.addProduct("판타지판타", 2000);
  vendingMachine.addProduct("오뎅국물", 1500);
  vendingMachine.addProduct("부장라떼", 2000);
  vendingMachine.addProduct("판타지판타", 2000);
  vendingMachine.addProduct("레드불", 2000);
  vendingMachine.addProduct("핫세븐", 2000);
  vendingMachine.addProduct("커피우유", 2000);

  // UIManager 인스턴스 생성
  const uiManager = new UIManager(vendingMachine);

  // UI 초기화
  uiManager.initializeUI();
});
