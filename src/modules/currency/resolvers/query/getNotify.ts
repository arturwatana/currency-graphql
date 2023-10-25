

import { GraphQLError } from "graphql";
import { ContextProps } from "../../../../index.js";
import { CurrencyMemoryRepository } from "../../repositories/currency.implementation.repository.js";

export const getNotify = async (_, data, ctx: ContextProps) => {
  const memory = new CurrencyMemoryRepository(ctx.BaseContext.usersRepository)
  const interestsToNotify = await memory.updateTargets()
  return interestsToNotify
};
