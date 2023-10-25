import { Interest } from "../../Interest/model/Interest.model.js";
import { Notification } from "../../notification/model/notification.model.js";
import { IUser, User } from "../model/user.model.js";
import { ChangeInterestProps } from "./user.implementation.mongoose.js";
import { IUserRepository } from "./user.repository.js";

export class UserMemoryRepository implements IUserRepository {
  updateUserNotifications(userId: string, notification: Notification): Promise<Notification> {
    throw new Error("Method not implemented.");
  }
  getUsersTargets(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }

  deleteInterest(username: string, interestName: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  getUserInterests(user: User): Promise<Interest[]> {
    throw new Error("Method not implemented.");
  }

  updateInterestTargetValue(userId: string, interestName: ChangeInterestProps, targetValue: number): Promise<Interest> {
    throw new Error("Method not implemented.");
  }
  updateUserInterests(user: User, interest: Interest): Promise<User> {
    throw new Error("Method not implemented.");
  }

  deleteCurrency(userId: string, currencyId: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  updateUserSearches(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUserByUsername(username: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  getUserByToken(token: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  items: User[] = [];

  async save(data: User): Promise<User> {
    this.items.push(data);
    return data;
  }
  async showAll(): Promise<User[]> {
    return this.items;
  }
}
