import { usersRepository } from "../../../../index.js";
import bcrypt from "bcrypt";
import { authService } from "../../../../utils/auth/index.js";

type LoginDTO = {
  username: string;
  password: string;
};

type LoginReq = {
  data: LoginDTO;
};

export const login = async (_, { data }: LoginReq) => {
  const user = await usersRepository.getUserByUsername(data.username);
  if (!user) {
    throw new Error("Usuário ou senha incorretos");
  }
  const passwordAreEqual = await bcrypt.compareSync(
    data.password,
    user.password
  );

  if (!passwordAreEqual) {
    throw new Error("Usuário ou senha incorretos");
  }
  const token = authService.sign(user);
  return {
    id: user.id,
    username: user.username,
    token,
  };
};
