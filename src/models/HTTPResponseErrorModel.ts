import { Response } from "node-fetch";

export class HTTPResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`);
    this.response = response;
  }
}
