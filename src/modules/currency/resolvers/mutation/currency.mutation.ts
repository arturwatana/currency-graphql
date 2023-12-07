import axios from "axios";
import { GraphQLError } from "graphql";
import { ContextProps } from "../../../../index.js";
import { Currency, ICurrency } from "../../model/currency.model.js";
import { formatUnixDate } from "../../../../utils/formatTimestamp/index.js";

type CurrencyRequest = {
  data: {
    from: string;
    to?: string
  };
};

export const createCurrency = async (_, {data}: CurrencyRequest, ctx: ContextProps) => {
  if (!ctx.user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  try {
    console.log(`${process.env.BINANCE_CURRENCY_URL}${data.from}${data.to}`)
    const res = await axios.get(
      `${process.env.BINANCE_CURRENCY_URL}${data.from}${data.to}`
    );
    const user = ctx.user;
    const currencyData: ICurrency =  {
      ...res.data,
      to: data.to,
      from: data.from,
      userId: user.id,
    };
    const currency: Currency = Currency.create(currencyData)
    user.searches.push(currency);
    await ctx.BaseContext.usersRepository.updateUserSearches(user)
    console.log(currency)
    return currency;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
