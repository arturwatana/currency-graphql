import { GraphQLError } from "graphql";
export const searches = async (_, data, ctx) => {
    if (!ctx.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    const userSearches = (await ctx.BaseContext.userRepository.getUserByUsername(ctx.user.username)).searches;
    return userSearches;
};
