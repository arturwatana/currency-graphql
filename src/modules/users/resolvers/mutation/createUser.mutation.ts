import { IUser, User } from "../../model/user.model";
import { ContextProps } from "../../../../index";


type CreateUserReq = {
  data: IUser;
};

export const createUser = async (_, { data }: CreateUserReq, ctx: ContextProps) => {
  const user = User.create(data);
  const userAlreadyExists = await ctx.BaseContext.usersRepository.getUserByEmail(user.email)
  if(userAlreadyExists){
    throw new Error("Email já cadastrado") 
  }
  user.password = await ctx.BaseContext.passwordHash.hash(data.password)
  await ctx.BaseContext.usersRepository.save(user);
  return user;
};
