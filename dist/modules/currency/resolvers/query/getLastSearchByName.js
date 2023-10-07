import { GraphQLError } from "graphql";
import { usersRepository } from "../../../../index.js";
export const getLastSearchByName = async (_, { name }, context) => {
    if (!context.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    const userSearches = (await usersRepository.getUserByUsername(context.user.username)).searches;
    const lastSearch = userSearches
        .reverse()
        .find((search) => search.code === name);
    if (!lastSearch)
        throw new Error("Not found last search");
    return lastSearch;
};
