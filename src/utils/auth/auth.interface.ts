import { User } from "../../modules/users/model/user.model";

export interface IAuth {
  sign(payload: User): string;
  verify(token: string, secret: string): string;
}
