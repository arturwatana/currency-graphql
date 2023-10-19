import { User } from "../../users/model/user.model";
import { Interest } from "../model/Interest.model";


export interface IInterestRepository {
  updateUserInterests(user: User, interest: Interest): Promise<User>;
  updateInterestTargetValue(userId: string, interestName: string, targetValue: number): Promise<Interest>
}