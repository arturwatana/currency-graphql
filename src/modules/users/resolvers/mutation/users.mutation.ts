import { usesrRepository } from "../../../../index.js";
import { IUser, User } from "../../model/user.model.js";

type CreateUserReq = {
  data: IUser;
};

export const createUser = (_, { data }: CreateUserReq) => {
  const user = User.create(data);
  usesrRepository.save(user);
  return user;
};
