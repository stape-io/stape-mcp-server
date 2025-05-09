import { ContainerSubscriptionModel } from "./ContainerSubscriptionModel";
import { ContainerZoneOptionModel } from "./ContainerZoneOptionModel";
import { OptionModel } from "./OptionModel";
import { WarningModel } from "./WarningModel";

export interface ContainerPreviewModel {
  warnings: WarningModel[];
  status: OptionModel;
  zone: ContainerZoneOptionModel;
  adblockBypassDisabledAt: string;
  analyticsEnabledAt: string;
  createdAt: string;
  defaultEmailAlert: boolean;
  icon: string;
  id: number;
  identifier: string;
  limitCpu: string;
  limitMemory: string;
  maxReplicaCount: number;
  minReplicaCount: number;
  name: string;
  notDelete: boolean;
  notDeploy: boolean;
  notDisableAutomatically: boolean;
  notDisableBySmallUsage: boolean;
  requestCpu: string;
  requestMemory: string;
  requestsLimit: number;
  sGtmContainerId: string;
  subscription: ContainerSubscriptionModel;
  todayUsage: number;
  updatedAt: string;
}
