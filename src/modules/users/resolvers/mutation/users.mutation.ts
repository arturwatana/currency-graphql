import { usersRepository } from "../../../../index.js";
import { IUser, User } from "../../model/user.model.js";
import bcrypt from "bcrypt";

type CreateUserReq = {
  data: IUser;
};

export const createUser = async (_, { data }: CreateUserReq) => {
  const user = User.create(data);
  user.password = await bcrypt.hash(user.password, 10);
  await usersRepository.save(user);
  return user;
};
