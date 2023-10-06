import { GraphQLError } from "graphql";
import { searchesRepository } from "../../../../index.js";

export const searches = (_, data, context) => {
  if (!context.user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });

  return context.user.searches;
};
