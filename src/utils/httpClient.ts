import fetch, { BodyInit, RequestInit, Response } from "node-fetch";
import { HTTPResponseError } from "../models/HTTPResponseErrorModel";

type OptionsModel = Omit<RequestInit, "method" | "body"> & {
  queryParams?: Record<string, string | number>;
};

class HttpClient {
  private baseURL = "";
  private baseHeaders: Record<string, string> = {};

  constructor(baseURL: string, baseHeaders: Record<string, string>) {
    this.baseURL = baseURL;
    this.baseHeaders = baseHeaders;
  }

  public post<T>(
    url: string,
    body: BodyInit | undefined,
    { queryParams, ...options }: OptionsModel = {},
  ): Promise<T> {
    return fetch(`${this.baseURL}${url}${this.getQueryParams(queryParams)}`, {
      ...options,
      method: "POST",
      body,
      headers: {
        ...this.baseHeaders,
        ...(options?.headers || {}),
      },
    }).then((response) => this.parseResponse<T>(response));
  }

  public get<T>(
    url: string,
    { queryParams, ...options }: OptionsModel = {},
  ): Promise<T> {
    return fetch(`${this.baseURL}${url}${this.getQueryParams(queryParams)}`, {
      ...options,
      method: "GET",
      headers: {
        ...this.baseHeaders,
        ...(options?.headers || {}),
      },
    }).then((response) => this.parseResponse<T>(response));
  }

  public delete<T>(
    url: string,
    { queryParams, ...options }: OptionsModel = {},
  ): Promise<T> {
    return fetch(`${this.baseURL}${url}${this.getQueryParams(queryParams)}`, {
      ...options,
      method: "DELETE",
      headers: {
        ...this.baseHeaders,
        ...(options?.headers || {}),
      },
    }).then((response) => this.parseResponse<T>(response));
  }

  public put<T>(
    url: string,
    body: BodyInit | undefined,
    { queryParams, ...options }: OptionsModel = {},
  ): Promise<T> {
    return fetch(`${this.baseURL}${url}${this.getQueryParams(queryParams)}`, {
      ...options,
      method: "PUT",
      body,
      headers: {
        ...this.baseHeaders,
        ...(options?.headers || {}),
      },
    }).then((response) => this.parseResponse<T>(response));
  }

  public patch<T>(
    url: string,
    body: BodyInit | undefined,
    { queryParams, ...options }: OptionsModel = {},
  ): Promise<T> {
    return fetch(`${this.baseURL}${url}${this.getQueryParams(queryParams)}`, {
      ...options,
      method: "PATCH",
      body,
      headers: {
        ...this.baseHeaders,
        ...(options?.headers || {}),
      },
    }).then((response) => this.parseResponse<T>(response));
  }

  private getQueryParams(
    queryParams?: Record<string, string | number>,
  ): string {
    if (
      queryParams &&
      typeof queryParams === "object" &&
      Object.keys(queryParams).length
    ) {
      const query = Object.keys(queryParams)
        .map((k) => {
          return (
            encodeURIComponent(k) + "=" + encodeURIComponent(queryParams[k])
          );
        })
        .join("&");

      return `?${query}`;
    }

    return "";
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      const data = await response.json();

      return data.body;
    }

    throw new HTTPResponseError(response);
  }
}

const httpClient = new HttpClient("https://api.app.stape.io/api/v2", {
  "Content-Type": "application/json",
  "X-AUTH-TOKEN": process.env.STAPE_AUTH_KEY || "",
});

export default httpClient;
