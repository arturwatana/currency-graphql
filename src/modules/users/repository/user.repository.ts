import { Interest } from "../../Interest/model/Interest.model";
import { User } from "../model/user.model";

export interface IUserRepository {
  save(data: User): Promise<User>;
  showAll(): Promise<User[]>;
  getUserByToken(token: string): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  updateUserSearches(user: User): Promise<User>;
  updateUserInterests(user: User, interest: Interest): Promise<User>;
  updateInterestTargetValue(userId: string, interestName: string, targetValue: number): Promise<Interest>
  deleteCurrency(username: string, currencyId: string): Promise<User| null>

}
