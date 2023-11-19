import { GraphQLError } from "graphql";
export const deleteCurrency = async (_, data, ctx) => {
    if (!ctx.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    const updatedUser = await ctx.BaseContext.usersRepository.deleteCurrency(data.currencyId, ctx.user.id);
    return updatedUser;
};
