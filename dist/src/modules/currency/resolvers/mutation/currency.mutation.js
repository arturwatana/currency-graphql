import axios from "axios";
import { GraphQLError } from "graphql";
import { Currency } from "../../model/currency.model.js";
export const createCurrency = async (_, { data }, ctx) => {
    if (!ctx.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    try {
        const res = await axios.get(`${process.env.BINANCE_CURRENCY_URL}${data.from}${data.to}`);
        console.log(res.data);
        const user = ctx.user;
        const currencyData = {
            ...res.data,
            to: data.to,
            from: data.from,
            userId: user.id,
        };
        const currency = Currency.create(currencyData);
        user.searches.push(currency);
        await ctx.BaseContext.usersRepository.updateUserSearches(user);
        return currency;
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
};
