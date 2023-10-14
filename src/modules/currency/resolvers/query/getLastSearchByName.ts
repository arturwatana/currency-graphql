import { GraphQLError } from "graphql";
import { CurrencyType } from "../../model/currencyType.model";
import { ContextProps } from "../../../..";


export const getLastSearchByName = async (_, { name }, ctx: ContextProps) => {
  if (!ctx.user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  const userSearches = (
    await ctx.BaseContext.userRepository.getUserByUsername(ctx.user.username)
  ).searches;

  const lastSearch = userSearches
    .reverse()
    .find((search: CurrencyType) => search.code === name);

  if (!lastSearch) throw new Error("Not found last search");

  return lastSearch;
};
