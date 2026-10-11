export class DomainException extends Error {
  public readonly errorCode: string;
  public readonly statusCode: number;

  constructor(message: string, errorCode: string, statusCode = 400) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
