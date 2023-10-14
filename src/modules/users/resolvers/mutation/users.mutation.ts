import { IUser, User } from "../../model/user.model.js";
import { usersRepository } from "../../../users/repository/index.js";
import { ContextProps } from "../../../../index.js";


type CreateUserReq = {
  data: IUser;
};

export const createUser = async (_, { data }: CreateUserReq, ctx: ContextProps) => {
  const user = User.create(data);
  user.password = await ctx.BaseContext.passwordHash.hash(data.password)
  await usersRepository.save(user);
  return user;
};
