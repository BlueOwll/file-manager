export class InputError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "InputError";
  }
}

export class OperationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "OperationError";
  }
}