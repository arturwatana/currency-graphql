import { Interest } from "../../Interest/model/Interest.model";
import { Notification } from "../../notification/model/notification.model";
import { User } from "../model/user.model";
import { ChangeInterestProps } from "./user.implementation.mongoose";

export interface IUserRepository {
  save(data: User): Promise<User>;
  showAll(): Promise<User[]>;
  getUserByToken(token: string): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  updateUserSearches(user: User): Promise<User>;
  updateUserInterests(user: User, interest: Interest): Promise<User>;
  updateUserNotifications(userId: string, notification: Notification): Promise<Notification>;
  updateInterestTargetValue(userId: string, interestName: ChangeInterestProps, targetValue: number): Promise<Interest>
  deleteCurrency(username: string, currencyId: string): Promise<User| null>
  deleteInterest(username: string, interestName: string): Promise<User| null>
  getUserInterests(user: User): Promise<Interest[]>
  getUsersTargets(): Promise<any[]>
}
