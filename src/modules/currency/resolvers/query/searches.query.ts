import { GraphQLError } from "graphql";
import { ContextProps } from "../../../../index.js";

export const searches = async (_, data, ctx) => {
  if (!ctx.user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });

  const userSearches = (
    await ctx.userRepository.getUserByUsername(ctx.user.username)
  ).searches;

  return userSearches;
};
