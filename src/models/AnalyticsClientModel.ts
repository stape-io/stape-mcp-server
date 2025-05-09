export interface AnalyticsClientEventModel {
  name: string;
  count: number;
  adBlock: number;
  safari: number;
}

export interface AnalyticsClientModel {
  name: string;
  events: AnalyticsClientEventModel[];
}

export interface AnalyticsClientsByDateModel {
  date: number;
  clients: AnalyticsClientModel[];
}
