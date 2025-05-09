import { ProductPlanPriceModel } from "./ProductPlanPriceModel";
import { SignalsGatewayPlanFeaturesModel } from "./SignalsGatewayPlanFeaturesModel";
import { SupportLevelModel } from "./SupportLevelModel";

export interface SignalsGatewayPlanOptionModel {
  type: string;
  label: string;
  price: ProductPlanPriceModel;
  support: SupportLevelModel;
  description: string;
  features: SignalsGatewayPlanFeaturesModel;
}
