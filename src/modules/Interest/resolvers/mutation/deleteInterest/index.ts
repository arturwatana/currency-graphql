import { GraphQLError } from "graphql";
import { ContextProps } from "../../../../..";

interface deleteInterestDTO {
    interestName: string
}

interface deleteInterestReq {
    data: deleteInterestDTO
}


export const deleteInterest = async (_,{data}: deleteInterestReq, ctx : ContextProps) => {
    if (!ctx.user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });

    const updatedUser = await ctx.BaseContext.usersRepository.deleteInterest(ctx.user.email, data.interestName)
    return updatedUser
}