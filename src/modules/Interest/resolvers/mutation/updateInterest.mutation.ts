import { GraphQLError } from "graphql";
import { ContextProps } from "../../../../index.js";
import { IInterest, Interest } from "../../model/Interest.model.js";

interface UpdateInterestDTO {
    from: string
    targetValue: number
}

interface UpdateInterestReq {
    data: UpdateInterestDTO
}

export const updateInterest = async (_, {data}: UpdateInterestReq,  ctx: ContextProps) => {
    if (!ctx.user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
    const interest = Interest.create(data)
    const updatedUser = await ctx.BaseContext.usersRepository.updateUserInterests(ctx.user, interest)
    return updatedUser
}