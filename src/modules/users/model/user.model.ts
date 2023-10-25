import { randomUUID } from "node:crypto";
import { Currency } from "../../currency/model/currency.model";
import { Interest } from "../../Interest/model/Interest.model";
import { validateUserInfo } from "./validateUserInfo.js";
import { Notification } from "../../notification/model/notification.model";

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
  notifications: Notification[]

  private constructor({ email, username, password }: IUser) {
    if (!email || !username || !password) {
      throw new Error("Ops, faltaram informacoes");
    }
    validateUserInfo({email,username,password})

    this.id = randomUUID();
    this.username = username.toLowerCase();
    this.email = email.toLowerCase();
    this.createdAt = new Date()
    this.password = password;
    this.searches = [];
    this.interests = []
    this.notifications = []
  }

  static create(data: IUser): User {
    const user = new User(data);
    return user;
  }
}
