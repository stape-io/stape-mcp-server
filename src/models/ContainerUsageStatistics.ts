export interface ContainerUsageStatisticsDataItem {
  type: string;
  label: string;
  value: number;
}

export interface ContainerUsageStatistics {
  billingPeriodStart: string;
  billingPeriodEnd: string;
  data: ContainerUsageStatisticsDataItem[];
}
