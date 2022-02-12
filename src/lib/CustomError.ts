export default class CustomError extends Error {
  constructor(message: string, name: string, public httpCode: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.httpCode = httpCode;
  }
}
