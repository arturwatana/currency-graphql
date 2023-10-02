import axios from "axios";
import { searchesRepository, usersRepository } from "../../../../index.js";
import { GraphQLError } from "graphql";
import { CurrencyType } from "../../model/currency.model.js";

type CurrencyRequest = {
  name: string;
};

export const createCurrency = async (_, { name }: CurrencyRequest, context) => {
  if (!context.user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  try {
    const res = await axios.get(
      `https://economia.awesomeapi.com.br/json/last/${name}`
    );
    const key: string[] = Object.keys(res.data);
    const user = context.user;
    const currency: CurrencyType = {
      ...res.data[key[0]],
      userId: user.id,
    };
    user.searches.push(currency);
    await usersRepository.updateUser(user);
    return currency;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
