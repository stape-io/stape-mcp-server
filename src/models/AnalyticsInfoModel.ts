export interface RecoveredRequestsModel {
  count: number;
  adBlock: number;
  safari: number;
}

export interface SubscriptionUsageEventInfoModel {
  count: number;
  adBlock: number;
  safari: number;
}

export interface AnalyticsInfoModel {
  dataCollecting: unknown | null;
  trackingCanBeImproved: unknown | null;
  recoveredInfo: RecoveredRequestsModel | null;
  purchaseInfo: SubscriptionUsageEventInfoModel | null;
}
