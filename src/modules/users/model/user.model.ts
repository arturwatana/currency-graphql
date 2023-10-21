import { randomUUID } from "node:crypto";
import { Currency } from "../../currency/model/currency.model";
import { Interest } from "../../Interest/model/Interest.model";

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
  searches: Currency[];
  createdAt: Date
  interests: Interest[]

  private constructor({ email, username, password }: IUser) {
    if (!email || !username || !password) {
      throw new Error("Ops, faltaram informacoes");
    }

    this.id = randomUUID();
    this.username = username.toLowerCase();
    this.email = email.toLowerCase();
    this.createdAt = new Date()
    this.password = password;
    this.searches = [];
    this.interests = []
  }

  static create(data: IUser): User {
    const user = new User(data);
    return user;
  }
}
