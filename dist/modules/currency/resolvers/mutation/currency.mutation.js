import axios from "axios";
import { GraphQLError } from "graphql";
import { Currency } from "../../model/currency.model.js";
import { formatUnixDate } from "../../../../utils/formatTimestamp/index.js";
export const createCurrency = async (_, { data }, ctx) => {
    if (!ctx.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    try {
        const res = await axios.get(`https://economia.awesomeapi.com.br/json/last/${data.from}-${data.to || "BRL"}`);
        const key = Object.keys(res.data);
        const user = ctx.user;
        const currencyData = {
            ...res.data[key[0]],
            queryDate: res.data[key[0]].create_date,
            userId: user.id,
        };
        currencyData.timestamp = formatUnixDate(+currencyData.timestamp);
        const currency = Currency.create(currencyData);
        user.searches.push(currency);
        const userUpdated = await ctx.BaseContext.usersRepository.updateUserSearches(user);
        console.log(userUpdated);
        return currency;
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
};
