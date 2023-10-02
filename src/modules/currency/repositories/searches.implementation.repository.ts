import { usersRepository } from "../../..";
import { CurrencyType } from "../model/currency.model";
import { ISearchesRepository } from "./searches.repository";

export class SearchesMemoryRepository implements ISearchesRepository {
  items: CurrencyType[] = [];

  async save(data: CurrencyType): Promise<any> {
    this.items.push(data);
    return data;
  }
  async showAll(): Promise<any[]> {
    return this.items;
  }
}
