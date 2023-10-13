import { Currency } from "../../currency/model/currency.model";
import { User } from "../model/user.model";

export interface IUserRepository {
  save(data: User): Promise<User>;
  showAll(): Promise<User[]>;
  getUserByToken(token: string): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteCurrency(userId: string, currencyId: string): Promise<User| null>
}
