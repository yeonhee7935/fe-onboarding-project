// 커스텀 에러 클래스 정의

class VendingMachineError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; // 에러 이름을 클래스 이름으로 설정
  }
}

class InvalidAmountError extends VendingMachineError {
  constructor() {
    super("금액은 반드시 0원보다 커야 합니다.");
  }
}

class NoBalanceToReturnError extends VendingMachineError {
  constructor() {
    super("반환할 금액이 없습니다.");
  }
}

class InsufficientAmountError extends VendingMachineError {
  constructor() {
    super("금액이 부족합니다.");
  }
}

export { InvalidAmountError, NoBalanceToReturnError, InsufficientAmountError };
