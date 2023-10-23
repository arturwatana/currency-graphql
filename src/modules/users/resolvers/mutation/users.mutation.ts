import { IUser, User } from "../../model/user.model.js";
import { ContextProps } from "../../../../index.js";


type CreateUserReq = {
  data: IUser;
};

export const createUser = async (_, { data }: CreateUserReq, ctx: ContextProps) => {
  const user = User.create(data);
  const userAlreadyExists = await ctx.BaseContext.usersRepository.getUserByUsername(user.username)
  if(userAlreadyExists){
    throw new Error("Usuário já existe") 
  }
  user.password = await ctx.BaseContext.passwordHash.hash(data.password)
  await ctx.BaseContext.usersRepository.save(user);
  return user;
};
