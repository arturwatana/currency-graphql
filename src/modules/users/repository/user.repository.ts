import { User } from "../model/user.model";

export interface IUserRepository {
  save(data: User): Promise<User>;
  showAll(): Promise<User[]>;
}
