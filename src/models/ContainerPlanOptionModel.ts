import { ContainerPlanFeaturesModel } from "./ContainerPlanFeaturesModel";
import { ProductPlanPriceModel } from "./ProductPlanPriceModel";
import { SupportLevelModel } from "./SupportLevelModel";

export interface ContainerPlanOptionModel {
  type: string;
  label: string;
  price: ProductPlanPriceModel;
  support: SupportLevelModel;
  description: string;
  features: ContainerPlanFeaturesModel;
}
