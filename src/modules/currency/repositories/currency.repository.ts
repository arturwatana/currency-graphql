import { CurrencyType } from "../model/currencyType.model";

export interface ICurrencyRepository {
  save(data: CurrencyType): Promise<any>;
  showAll(): Promise<CurrencyType[]>;
  getNotificationsTarget(): any
}
