import { ValidationContext } from "graphql";
import { User } from "../model/user.model.js";
import { UserMongo } from "../model/user.schema.js";
import { IUserRepository } from "./user.repository.js";

export class UserMongooseRepository implements IUserRepository {
  async save(data: User): Promise<User> {
    const user = await UserMongo.create({
      email: data.email,
      id: data.id,
      password: data.password,
      username: data.username,
      searches: data.searches,
    });

    return user;
  }
  async showAll(): Promise<User[]> {
    return await UserMongo.find();
  }
  async getUserByToken(token: string): Promise<User> {
    const user = await UserMongo.findOne({
      id: token,
    });
    return user;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await UserMongo.findOne({
      username,
    });
    return user || null;
  }
  async updateUser(user: User): Promise<User> {
    await UserMongo.updateOne(
      {
        id: user.id,
      },
      { searches: user.searches }
    );
    const updatedUser = this.getUserByUsername(user.username);
    return updatedUser;
  }
}
