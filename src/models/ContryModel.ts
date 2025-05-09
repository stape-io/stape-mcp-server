export interface CountryTranslationModel {
  id: number;
  order: number;
  shortCode: string;
  longCode: string;
  numberCode: string;
  currency: string;
  phone: string;
  taxRequired: boolean;
  stateRequired: boolean;
  language: string;
  name: string;
  shortName: string;
}
