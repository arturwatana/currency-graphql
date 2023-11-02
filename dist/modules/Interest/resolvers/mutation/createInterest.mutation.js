import { GraphQLError } from "graphql";
import { Interest } from "../../model/Interest.model.js";
export const createInterest = async (_, { data }, ctx) => {
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
            sell: data.sell,
        }
    });
    const user = await ctx.BaseContext.usersRepository.getUserByEmail(ctx.user.email);
    const interestAlreadyExist = user.interests.find(userInterest => {
        if (userInterest.from === interest.from && userInterest.to === interest.to) {
            return interest;
        }
    });
    if (!interestAlreadyExist) {
        const updatedUser = await ctx.BaseContext.usersRepository.updateUserInterests(ctx.user, interest);
        const interestUpdated = updatedUser.interests.find(int => int.from === interest.from && int.to === interest.to);
        return interestUpdated;
    }
    if (interest.targetValue.buy === 0) {
        if (interestAlreadyExist.targetValue.sell === interest.targetValue.sell) {
            throw new GraphQLError("Ops, esta conversao ja possui este target para venda");
        }
        interestAlreadyExist.targetValue.sell = interest.targetValue.sell;
    }
    if (interest.targetValue.sell === 0) {
        if (interestAlreadyExist.targetValue.buy === interest.targetValue.buy) {
            throw new GraphQLError("Ops, esta conversao ja possui este target para compra");
        }
        interestAlreadyExist.targetValue.buy = interest.targetValue.buy;
    }
    if (interest.targetValue.buy != 0 && interest.targetValue.sell != 0) {
        interestAlreadyExist.targetValue = interest.targetValue;
    }
    await ctx.BaseContext.usersRepository.updateInterestTargetValue(ctx.user.email, interestAlreadyExist);
    const updateUser = await ctx.BaseContext.usersRepository.getUserByEmail(ctx.user.email);
    const interestUpdated = updateUser.interests.find(int => int.from === interest.from && int.to === interest.to);
    return interestUpdated;
};
