import axios from "axios";
import { ContextProps } from "../../../..";
import { GraphQLError } from "graphql";

type getInterestsDTO = {
    email: string;
  };
  
  type getInterestsReq = {
    data: getInterestsDTO;
  }

export const getUserLast15DaysFromInterests = async (_, data: getInterestsReq, ctx: ContextProps) => {
  if (!ctx.user)
    throw new GraphQLError("Ops, preciso que faca o login novamente", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    })
    const userInterests = await ctx.BaseContext.usersRepository.getUserInterests(ctx.user)
    try {
        const last15DaysFromInterests = await Promise.all(userInterests.map(async (interest) => {
            const res: any = await axios.get(
              `${process.env.BINANCE_CURRENCY_URL}${interest.from}${interest.to}`
            );
            const last15FromUniqueInterest = {
                ...res.data,
                targetValue: interest.targetValue,
                favorite:interest.favorite,
                from: interest.from,
                to: interest.to
            }
            return last15FromUniqueInterest
        }))
        return  last15DaysFromInterests
      } catch (err) {
        throw new Error(err.response.data.message);
      }
}