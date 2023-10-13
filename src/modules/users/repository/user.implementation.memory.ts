import { IUser, User } from "../model/user.model.js";
import { IUserRepository } from "./user.repository.js";

export class UserMemoryRepository implements IUserRepository {
  deleteCurrency(userId: string, currencyId: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  updateUser(user: User): Promise<User> {
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
