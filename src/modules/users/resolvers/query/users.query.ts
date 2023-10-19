import { ContextProps } from "../../../../index.js";

export const users = (_, data ,ctx : ContextProps) => {
  return ctx.BaseContext.usersRepository.showAll();
};
