import axios from "axios";
import { ContextProps } from "../../../..";
import { GraphQLError } from "graphql";

type getInterestsDTO = {
    username: string;
  };
  
  type getInterestsReq = {
    data: getInterestsDTO;
  }

export const getUserLast15DaysFromInterests = async (_, data: getInterestsReq, ctx: ContextProps) => {
    if (!ctx.user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    })
    const userInterests = await ctx.BaseContext.usersRepository.getUserInterests(ctx.user)
    try {
        const last15DaysFromInterests = userInterests.map(async (interest) => {
            const res: any = await axios.get(
              `https://economia.awesomeapi.com.br/json/daily/${interest.name}-BRL/15`
            );
            const last14Days = await res.data.slice(1)
            const last15FromUniqueInterest = {
                ...res.data[0],
                lastDays: last14Days   
            }
            return last15FromUniqueInterest
        })

        console.log(last15DaysFromInterests)

        return last15DaysFromInterests
        
      } catch (err) {
        throw new Error(err.response.data.message);
      }
}