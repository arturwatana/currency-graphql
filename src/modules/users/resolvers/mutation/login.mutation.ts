import { ContextProps } from "../../../../index.js";
import { authService } from "../../../../utils/auth/authService.js";
import { passwordHash } from "../../../../utils/hash/index.js";
import validateSQLInjection from "../../../../utils/validateSQLInjection/index.js";
import { usersRepository } from "../../repository/index.js";

type LoginDTO = {
  username: string;
  password: string;
};

type LoginReq = {
  data: LoginDTO;
}


export const login = async (_, { data }: LoginReq, ctx: ContextProps) => {
  validateSQLInjection([data.username, data.password])
  const user = await ctx.BaseContext.usersRepository.getUserByUsername(data.username.toLowerCase());
  if (!user) {
    throw new Error("Usuário ou senha incorretos");
  }
  const passwordAreEqual = await passwordHash.compare(data.password, user.password)
  if(!passwordAreEqual){
    throw new Error("Usuário ou senha incorretos");
  }
  const token = authService.sign(user);
  return {
    id: user.id,
    username: user.username,
    token,
  };
};
