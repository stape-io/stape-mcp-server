import { ContainerUsageStatistics } from "./ContainerUsageStatistics";

export interface ContainerUsageStatisticsByDayModel {
  current: ContainerUsageStatistics[];
  previous: ContainerUsageStatistics[];
}
