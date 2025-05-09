import { CountryModel } from "./CountryModel";

export interface TaxModel {
  id: number;
  code: string;
  name: string;
  example: string;
  country: CountryModel;
}
