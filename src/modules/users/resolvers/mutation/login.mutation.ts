import { ContextProps } from "../../../../index.js";
import { authService } from "../../../../utils/auth/authService.js";
import { passwordHash } from "../../../../utils/hash/index.js";

type LoginDTO = {
  email: string;
  password: string;
};

type LoginReq = {
  data: LoginDTO;
}


export const login = async (_, { data }: LoginReq, ctx: ContextProps) => {
  const user = await ctx.BaseContext.usersRepository.getUserByEmail(data.email.toLowerCase());
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
    email: user.email,
    token,
  };
};
