import axios from "axios";
import { GraphQLError } from "graphql";
import { Currency } from "../../model/currency.model.js";
import { Interest } from "../../../Interest/model/Interest.model.js";
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
        const currencyAlredyInInterests = user.interests.find(interest => {
            if (interest.from === currency.from && interest.to === currency.to) {
                return interest;
            }
        });
        if (!currencyAlredyInInterests) {
            const interest = Interest.create({
                from: currency.from,
                to: currency.to
            });
            await ctx.BaseContext.usersRepository.updateUserInterests(user, interest);
        }
        user.searches.push(currency);
        await ctx.BaseContext.usersRepository.updateUserSearches(user);
        return currency;
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
};
