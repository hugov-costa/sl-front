export class FormValidationHTTPError extends Error {
  cause: string | Array<string>;
  status: number;
  payload?: unknown;

  constructor(
    status: number,
    detail?: string,
    errors?: Array<string>,
    payload?: unknown,
  ) {
    super(detail ?? `HTTP ${status}`);
    this.cause = errors ?? detail ?? `HTTP ${status}`;
    this.payload = payload;
    this.status = status;

    Object.setPrototypeOf(this, FormValidationHTTPError.prototype);
  }
}
