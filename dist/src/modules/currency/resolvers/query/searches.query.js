import { GraphQLError } from "graphql";
export const searches = async (_, data, ctx) => {
    if (!ctx.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    const userSearches = (await ctx.BaseContext.usersRepository.getUserByEmail(ctx.user.email)).searches;
    return userSearches;
};
