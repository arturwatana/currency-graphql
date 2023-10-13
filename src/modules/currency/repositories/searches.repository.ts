import { CurrencyType } from "../model/currencyType.model";

export interface ISearchesRepository {
  save(data: CurrencyType): Promise<any>;
  showAll(): Promise<CurrencyType[]>;
}
