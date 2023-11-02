import { randomUUID } from "node:crypto";
import { Currency } from "../../currency/model/currency.model";
import { Interest } from "../../Interest/model/Interest.model";
import { validateUserInfo } from "./validateUserInfo.js";
import { Notification } from "../../notification/model/notification.model";

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
