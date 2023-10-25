import { ContextProps } from "../../../../index.js";

export const users = async (_, data ,ctx : ContextProps) => {
  return await ctx.BaseContext.usersRepository.showAll();
};
