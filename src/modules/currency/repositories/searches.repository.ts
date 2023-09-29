import { CurrencyType } from "../model/currency.model";

export interface ISearchesRepository {
  save(data: CurrencyType): Promise<any>;
  showAll(): Promise<any[]>;
}
