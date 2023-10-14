import { GraphQLError } from "graphql";
import { ContextProps } from "../../../../index.js";




export const deleteCurrency = async (_, data, ctx: ContextProps) => {
    if (!ctx.user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
    const updatedUser = await ctx.BaseContext.userRepository.deleteCurrency(data.currencyId, ctx.user.id)
    return updatedUser
}