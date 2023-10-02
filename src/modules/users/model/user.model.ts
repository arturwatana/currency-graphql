import { randomUUID } from "node:crypto";
import { CurrencyType } from "../../currency/model/currency.model";

export type IUser = {
  username: string;
  password: string;
  email: string;
};

export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  searches: CurrencyType[];
  private constructor({ email, username, password }: IUser) {
    this.id = randomUUID();
    this.username = username;
    this.email = email;
    this.password = password;
    this.searches = [];
  }

  static create(data: IUser): User {
    const user = new User(data);
    return user;
  }
}
