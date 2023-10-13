import { usersRepository } from "../../../../index.js";
import { passwordHash } from "../../../../utils/hash/index.js";
import { IUser, User } from "../../model/user.model.js";

type CreateUserReq = {
  data: IUser;
};

export const createUser = async (_, { data }: CreateUserReq) => {
  const user = User.create(data);
  user.password = await passwordHash.hash(data.password)
  await usersRepository.save(user);
  return user;
};
