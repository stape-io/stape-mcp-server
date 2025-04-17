import axios from 'axios';

export interface ContainerZone {
  label: string;
  type: string;
  ip: string;
  ipV6: string;
  defaultDomain: string;
  loadDomain: string;
  cdnAvailable: boolean;
}

export class StapeClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://api.app.stape.io/api/v2') {
    this.baseUrl = baseUrl;
  }

  async getContainerZones(): Promise<ContainerZone[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/resources/container-zones`);
      return response.data.body;
    } catch (error) {
      throw new Error(`Failed to fetch container zones: ${error}`);
    }
  }
} 