import axios from "axios";
import { GraphQLError } from "graphql";
export const getUserLast15DaysFromInterests = async (_, data, ctx) => {
    if (!ctx.user)
        throw new GraphQLError("Ops, preciso que faca o login novamente", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    const userInterests = await ctx.BaseContext.usersRepository.getUserInterests(ctx.user);
    try {
        const last15DaysFromInterests = await Promise.all(userInterests.map(async (interest) => {
            const res = await axios.get(`https://economia.awesomeapi.com.br/json/daily/${interest.from}-${interest.to}/15`);
            const last14Days = await res.data.slice(1);
            const last15FromUniqueInterest = {
                ...res.data[0],
                targetValue: interest.targetValue,
                lastDays: last14Days
            };
            return last15FromUniqueInterest;
        }));
        return last15DaysFromInterests;
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
};
