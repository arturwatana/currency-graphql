import { GraphQLError } from "graphql";
import { ContextProps } from "../../../../index.js";

export const searches = async (_, data, ctx: ContextProps) => {
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

  return userSearches;
};
