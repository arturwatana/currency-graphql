import { GraphQLError } from "graphql";
export const getUserByToken = async (_, { data }, ctx) => {
    if (!ctx.user)
        throw new GraphQLError("Ops, preciso que faca o login novamente", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    return {
        fullName: ctx.user.fullName,
        email: ctx.user.email,
        id: ctx.user.id,
    };
};
