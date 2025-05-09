import { ProductPlanPriceModel } from "./ProductPlanPriceModel";
import { SupportLevelModel } from "./SupportLevelModel";

export interface StapeGatewayPlanOptionModel {
  type: string;
  label: string;
  price: ProductPlanPriceModel;
  support: SupportLevelModel;
  perDomain: boolean;
  features: {
    requestLimit: number;
    multiDomainLimit: number;
    cms: boolean;
    fastSetup: boolean;
    gtmConfigure: boolean;
  };
}
