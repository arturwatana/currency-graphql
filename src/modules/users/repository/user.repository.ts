import { User } from "../model/user.model";

export interface IUserRepository {
  save(data: User): Promise<User>;
  showAll(): Promise<User[]>;
  getUserByToken(token: string): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  updateUser(user: User): Promise<User>;
}
