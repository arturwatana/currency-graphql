import { GraphQLError } from "graphql";
import { Interest } from "../../model/Interest.model.js";
export const updateInterest = async (_, { data }, ctx) => {
    if (!ctx.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    const interest = Interest.create(data);
    const updatedUser = await ctx.BaseContext.usersRepository.updateUserInterests(ctx.user, interest);
    return updatedUser;
};
