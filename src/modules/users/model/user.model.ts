import { randomUUID } from "node:crypto";
import { Currency } from "../../currency/model/currency.model.js";
import { Interest } from "../../Interest/model/Interest.model.js";
import { validateUserInfo } from "./validateUserInfo/index.js";
import { Notification } from "../../notification/model/notification.model.js";

export type IUser = {
  fullName: string;
  password: string;
  email: string;
};



export class User {
  id: string;
  fullName: string;
  password: string;
  email: string;
  searches: Currency[];
  createdAt: Date
  interests: Interest[]
  notifications: Notification[]

  private constructor({ email, fullName, password }: IUser) {
    validateUserInfo({email,fullName,password})

    this.id = randomUUID();
    this.fullName = fullName;
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
