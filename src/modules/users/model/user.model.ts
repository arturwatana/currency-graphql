import { randomUUID } from "node:crypto";

export type IUser = {
  username: string;
  password: string;
  email: string;
};

export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  private constructor({ email, username, password }: IUser) {
    this.id = randomUUID();
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static create(data: IUser): User {
    const user = new User(data);
    return user;
  }
}
