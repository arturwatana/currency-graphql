import { GraphQLError } from "graphql";
import { ContextProps } from "../../../../index.js";
import { IInterest, Interest, TargetValueProps } from "../../model/Interest.model.js";

interface FavoriteUpdateInterestDTO {
    from?: string
    to?: string
    favorite: boolean
}

interface FavoriteUpdateInterestReq {
    data: FavoriteUpdateInterestDTO
}

export const favoriteInterest = async (_, {data}: FavoriteUpdateInterestReq,  ctx: ContextProps) => {
    if (!ctx.user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
    const userInterests = await ctx.BaseContext.usersRepository.getUserInterests(ctx.user)
    const interestInUser = userInterests.find(int => int.from === data.from && int.to === data.to)
    interestInUser.favorite = data.favorite
    const updatedUser = await ctx.BaseContext.usersRepository.updateUserInterests(ctx.user, interestInUser)
    return updatedUser
} 