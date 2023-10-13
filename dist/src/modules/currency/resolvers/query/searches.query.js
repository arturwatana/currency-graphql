import { GraphQLError } from "graphql";
import { usersRepository } from "../../../../index.js";
export const searches = async (_, data, context) => {
    if (!context.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    const userSearches = (await usersRepository.getUserByUsername(context.user.username)).searches;
    return userSearches;
};
