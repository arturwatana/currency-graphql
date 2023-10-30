import { GraphQLError } from "graphql";
export const updateInterestTargetValue = async (_, { data }, ctx) => {
    if (!ctx.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    const object = {
        from: data.from,
        to: data.to
    };
    const updateInterest = await ctx.BaseContext.usersRepository.updateInterestTargetValue(ctx.user.email, object, data.targetValue);
    return updateInterest;
};
