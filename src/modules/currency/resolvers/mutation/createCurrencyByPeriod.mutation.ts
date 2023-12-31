// import axios from "axios";
// import { ContextProps } from "../../../..";
// import { GraphQLError } from "graphql";
// import { Interest } from "../../../Interest/model/Interest.model.js";
// import { Currency } from "../../model/currency.model.js";
// import { formatUnixDate } from "../../../../utils/formatTimestamp/index.js";

// interface CurrencyByPeriodReq {
//   data: {
//     startAt: string
//     endAt: string
//     from: string
//     to?: string
//   }
// }


// export const createCurrencyByPeriod = async (_, {data}: CurrencyByPeriodReq, ctx: ContextProps) => {
//     if (!ctx.user)
//     throw new GraphQLError("User is not authenticated", {
//       extensions: {
//         code: "UNAUTHENTICATED",
//         http: { status: 401 },
//       },
//     });
//     try {
//       const startAt = data.startAt.split("/").join()
//       const endAt = data.endAt.split("/").join()
//         const res = await axios.get(
//           `https://economia.awesomeapi.com.br/${data.from}-${data.to || "BRL"}/10?start_date=${startAt}&end_date=${endAt}`
//         );

//        const day = res.data.slice(0,1)[0]
//        const otherDays = res.data.slice(1, res.data.length)
//        const currencyAlredyInInterests = ctx.user.interests.find(interest => interest.from === day.code)
//        if(!currencyAlredyInInterests){
//          const interest = Interest.create({
//           from: day.code,
//           to: day.to
//          })
//          await ctx.BaseContext.usersRepository.updateUserInterests(ctx.user, interest)
//        }
//           const otherDaysWithUnixFormated = otherDays.map(day => {
//             return {
//                 ...day,
//                 timestamp: formatUnixDate(day.timestamp)
//               }
//           })
//           const dayWithProps = {
//             ...day,
//             userId: ctx.user.id
//           }
//           dayWithProps.timestamp =  formatUnixDate(day.timestamp)
//           const currency = Currency.create(dayWithProps)
//           const user = ctx.user
//           user.searches.push(currency)
//           await ctx.BaseContext.usersRepository.updateUserSearches(user)
//           const result = {
//             ...currency,
//             otherDays: otherDaysWithUnixFormated
//           }
//           console.log(result)
//           return result
//       } catch (err) {
//         throw new Error(err.response.data.message);
//       }
// }