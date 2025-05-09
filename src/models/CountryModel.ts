import { CountryTranslationModel } from "./ContryModel";

export interface CountryModel {
  translationStatuses: Record<string, boolean>;
  taxRequired: boolean;
  id: number;
  order: number;
  shortCode: string;
  longCode: string;
  numberCode: string;
  name: string;
  currency: string;
  phone: string;
  billingProvider: string;
  stateRequired: boolean;
  countryTranslations: CountryTranslationModel[];
}
