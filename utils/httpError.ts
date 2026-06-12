export class HTTPError extends Error {
  status: number;
  payload?: unknown;

  constructor(status: number, message?: string, payload?: unknown) {
    super(message ?? `HTTP ${status}`);
    this.name = "HTTPError";
    this.status = status;
    this.payload = payload;
    this.cause = message;

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}
