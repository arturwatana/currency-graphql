import axios from "axios";
import { GraphQLError } from "graphql";
import { ContextProps } from "../../../../index";
import { Currency, ICurrency } from "../../model/currency.model";
import { formatUnixDate } from "../../../../utils/formatTimestamp/index";

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
    const res = await axios.get(
      `https://economia.awesomeapi.com.br/json/last/${data.from}-${data.to || "BRL"}`
    );
    const key: string[] = Object.keys(res.data);
    const user = ctx.user;
    const currencyData: ICurrency =  {
      ...res.data[key[0]],
      queryDate: res.data[key[0]].create_date,
      userId: user.id,
    };
    currencyData.timestamp = formatUnixDate(+currencyData.timestamp)
    const currency: Currency = Currency.create(currencyData)
    user.searches.push(currency);
    const userUpdated = await ctx.BaseContext.usersRepository.updateUserSearches(user)
    return currency;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
