import { IUser, User } from "../model/user.model";
import { IUserRepository } from "./user.repository";

export class UserMemoryRepository implements IUserRepository {
  items: User[] = [];

  async save(data: User): Promise<User> {
    this.items.push(data);
    return data;
  }
  async showAll(): Promise<User[]> {
    return this.items;
  }
}
