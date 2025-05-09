import { ContainerDomainModel } from "./ContainerDomainModel";

export interface ContainerScheduleModel {
  frequencyType: string;
  identifier: string;
  hour: number;
  minute: number;
  path: string;
  domain: ContainerDomainModel;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}
