export class SuccessMessage {
  // 성공 메시지를 관리하는 메서드
  static insertMoney(amount) {
    return `${amount}원을 투입했습니다.`;
  }

  static purchase(productName) {
    return `${productName}을 구매했습니다.`;
  }

  static returnMoney(amount) {
    return `${amount}원을 반환했습니다.`;
  }
}
