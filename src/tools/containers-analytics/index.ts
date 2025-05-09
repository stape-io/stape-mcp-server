import { getContainerAnalyticsBrowsers } from "./getContainerAnalyticsBrowsers";
import { getContainerAnalyticsClients } from "./getContainerAnalyticsClients";
import { getContainerAnalyticsInfo } from "./getContainerAnalyticsInfo";
import { updateContainerAnalyticsEnable } from "./updateContainerAnalyticsEnable";

export const containersAnalyticsTools = [
  getContainerAnalyticsBrowsers,
  getContainerAnalyticsClients,
  getContainerAnalyticsInfo,
  updateContainerAnalyticsEnable,
];
