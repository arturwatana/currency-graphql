import axios from "axios";
import { GraphQLError } from "graphql";
import { randomUUID } from "node:crypto";
export const createCurrency = async (_, data, ctx) => {
    if (!ctx.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    try {
        const res = await axios.get(`https://economia.awesomeapi.com.br/json/last/${data.data.name}`);
        const key = Object.keys(res.data);
        const user = ctx.user;
        const currency = {
            ...res.data[key[0]],
            queryDate: res.data[key[0]].create_date,
            create_date: new Date().toDateString(),
            userId: user.id,
            id: randomUUID()
        };
        user.searches.push(currency);
        await ctx.BaseContext.userRepository.updateUser(user);
        return currency;
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
};
