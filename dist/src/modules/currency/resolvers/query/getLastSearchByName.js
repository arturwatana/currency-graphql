import { GraphQLError } from "graphql";
export const getLastSearchByName = async (_, { name }, ctx) => {
    if (!ctx.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    const userSearches = (await ctx.BaseContext.userRepository.getUserByUsername(ctx.user.username)).searches;
    const lastSearch = userSearches
        .reverse()
        .find((search) => search.code === name);
    if (!lastSearch)
        throw new Error("Not found last search");
    return lastSearch;
};