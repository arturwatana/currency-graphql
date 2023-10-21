import { GraphQLError } from "graphql";
export const deleteInterest = async (_, { data }, ctx) => {
    if (!ctx.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    const updatedUser = await ctx.BaseContext.usersRepository.deleteInterest(ctx.user.username, data.interestName);
    return updatedUser;
};
