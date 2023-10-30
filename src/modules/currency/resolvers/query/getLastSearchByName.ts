import { GraphQLError } from "graphql";
import { ContextProps } from "../../../..";
import { Currency } from "../../model/currency.model";


export const getLastSearchByName = async (_, { name }, ctx: ContextProps) => {
  if (!ctx.user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  const userSearches = (
    await ctx.BaseContext.usersRepository.getUserByEmail(ctx.user.email)
  ).searches;

  const lastSearch = userSearches
    .reverse()
    .find((search: Currency) => search.from === name);

  if (!lastSearch) throw new Error("Not found last search");

  return lastSearch;
};
