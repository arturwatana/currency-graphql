import { GraphQLError } from "graphql";
import { ContextProps } from "../../../../../index.js";
import { IInterest, Interest, TargetValueProps } from "../../../model/Interest.model.js";

interface UpdateInterestDTO {
    from?: string
    to?: string
    targetValue: TargetValueProps
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
    const userInterests = await ctx.BaseContext.usersRepository.getUserInterests(ctx.user)
    const interestInUser = userInterests.find(int => int.from === data.from && int.to === data.to)
    if(!data.targetValue.buy && data.targetValue.sell){
      interestInUser.targetValue.sell = data.targetValue.sell
    } else {
      interestInUser.targetValue.buy = data.targetValue.buy
    }
    const updatedUser = await ctx.BaseContext.usersRepository.updateUserInterests(ctx.user, interestInUser)
    return updatedUser
}