import { ProductPlanPriceModel } from "./ProductPlanPriceModel";
import { SupportLevelModel } from "./SupportLevelModel";

export interface GatewayPlanOptionModel {
  type: string;
  label: string;
  price: ProductPlanPriceModel;
  support: SupportLevelModel;
  description: string;
  perPixel: boolean;
  features: {
    eventLimit: number;
    unlimited: boolean;
    allPlatforms: boolean;
    deduplication: boolean;
    fastSetup: boolean;
  };
}
