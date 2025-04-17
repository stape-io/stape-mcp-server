import axios, { AxiosError } from "axios";
import { loadEnv } from "./loadEnv";
import { log } from "./log";

export interface ContainerZone {
  label: string;
  type: string;
  ip: string;
  ipV6: string;
  defaultDomain: string;
  loadDomain: string;
  cdnAvailable: boolean;
}

export interface Container {
  id: string;
  name: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  zone: string;
}

export interface CreateContainerParams {
  name: string;
  type: string;
  zone: string;
  code?: string;
}

export class StapeClient {
  private readonly baseUrl: string;
  private readonly authKey: string;

  constructor(baseUrl: string = "https://api.app.stape.io/api/v2") {
    this.baseUrl = baseUrl;
    loadEnv();
    this.authKey = process.env.STAPE_AUTH_KEY || "";
    if (!this.authKey) {
      throw new Error("STAPE_AUTH_KEY environment variable is required");
    }
  }

  private getHeaders() {
    return {
      "X-AUTH-TOKEN": this.authKey,
      "Content-Type": "application/json",
    };
  }

  private handleApiError(error: unknown, operation: string): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const statusCode = axiosError.response?.status;
      const responseData = axiosError.response?.data;

      log(`API Error during ${operation}: Status ${statusCode}`, responseData);

      if (responseData && typeof responseData === "object") {
        throw new Error(
          `Failed to ${operation}: ${JSON.stringify(responseData)}`,
        );
      }

      throw new Error(`Failed to ${operation}: ${axiosError.message}`);
    }

    throw new Error(`Failed to ${operation}: ${String(error)}`);
  }

  async getContainerZones(): Promise<ContainerZone[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/resources/container-zones`,
        {
          headers: this.getHeaders(),
        },
      );
      return response.data.body;
    } catch (error) {
      this.handleApiError(error, "fetch container zones");
    }
  }

  async getContainers(): Promise<Container[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/containers`, {
        headers: this.getHeaders(),
      });
      return response.data.body.items;
    } catch (error) {
      this.handleApiError(error, "fetch containers");
    }
  }

  async createContainer(params: CreateContainerParams): Promise<Container> {
    try {
      const response = await axios.post(`${this.baseUrl}/containers`, params, {
        headers: this.getHeaders(),
      });
      return response.data.body;
    } catch (error) {
      this.handleApiError(error, "create container");
    }
  }

  async deleteContainer(containerId: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/containers/${containerId}`, {
        headers: this.getHeaders(),
      });
    } catch (error) {
      this.handleApiError(error, "delete container");
    }
  }
}
