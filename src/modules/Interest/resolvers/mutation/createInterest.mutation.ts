import { GraphQLError } from "graphql";
import { ContextProps } from "../../../..";
import { Interest, TargetValueProps } from "../../model/Interest.model.js";

interface createInterestDTO {
    from: string
    to: string
    buy: number
    sell: number
}

interface deleteInterestReq {
    data: createInterestDTO
}


export const createInterest = async (_,{data}: deleteInterestReq, ctx : ContextProps) => {
    if (!ctx.user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
    const interest = Interest.create({
        from: data.from,
        to: data.to,
        targetValue: {
          buy: data.buy,
          sell: data.sell
        }
    })

    const user = await ctx.BaseContext.usersRepository.getUserByEmail(ctx.user.email)
    const interestAlreadyExist = user.interests.find(userInterest => {
        if(userInterest.from === interest.from && userInterest.to === interest.to && userInterest.targetValue.buy === interest.targetValue.buy && userInterest.targetValue.sell === interest.targetValue.sell){
          return interest
        }
      })
      if(interestAlreadyExist){
        throw new Error("Interesse já adicionado com esse target")
      }
    
      const interestAlreadyExistWithTargetChanged = user.interests.find(userInterest => {
        if(userInterest.from === interest.from && userInterest.to === interest.to && userInterest.targetValue.buy === interest.targetValue.buy || userInterest.targetValue.sell === interest.targetValue.sell){
          return interest
        }
      })
      if(interestAlreadyExistWithTargetChanged){
        await ctx.BaseContext.usersRepository.updateInterestTargetValue(ctx.user.email, {from: interest.from, to: interest.to}, interest.targetValue)
        const updateUser = await ctx.BaseContext.usersRepository.getUserByEmail(ctx.user.email)
        const interestUpdated = updateUser.interests.find(int => int.from === interest.from && int.to === interest.to)
        return interestUpdated
      }

    const updatedUser = await ctx.BaseContext.usersRepository.updateUserInterests(ctx.user, interest)
    const interestUpdated = updatedUser.interests.find(int => int.from === interest.from && int.to === interest.to)
    return interestUpdated
}