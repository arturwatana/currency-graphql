import axios from "axios";
import { usersRepository } from "../../../../index.js";
import { GraphQLError } from "graphql";
export const createCurrency = async (_, { name }, context) => {
    if (!context.user)
        throw new GraphQLError("User is not authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    try {
        const res = await axios.get(`https://economia.awesomeapi.com.br/json/last/${name}`);
        const key = Object.keys(res.data);
        const user = context.user;
        const currency = {
            ...res.data[key[0]],
            userId: user.id,
        };
        user.searches.push(currency);
        await usersRepository.updateUser(user);
        return currency;
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
};
