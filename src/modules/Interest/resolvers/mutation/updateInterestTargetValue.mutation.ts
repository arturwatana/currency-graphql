import { GraphQLError } from "graphql";
import { ContextProps } from "../../../../index.js";
import { IInterest, Interest, TargetValueProps } from "../../model/Interest.model.js";

interface UpdateInterestDTO {
    from: string
    to: string
    targetValue: TargetValueProps
}

interface UpdateInterestReq {
    data: UpdateInterestDTO
}

export const updateInterestTargetValue = async (_, {data}: UpdateInterestReq,  ctx: ContextProps) => {
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
    }
    const updateInterest = await ctx.BaseContext.usersRepository.updateInterestTargetValue(ctx.user.email, object , data.targetValue)
    return updateInterest
}