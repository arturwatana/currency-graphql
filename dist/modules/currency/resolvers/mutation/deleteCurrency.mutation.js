import { GraphQLError } from "graphql";
import { usersRepository } from "../../../../index.js";
export const deleteCurrency = async (_, data, context) => {
    if (!context.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    const updatedUser = await usersRepository.deleteCurrency(data.currencyId, context.user.id);
    return updatedUser;
};
