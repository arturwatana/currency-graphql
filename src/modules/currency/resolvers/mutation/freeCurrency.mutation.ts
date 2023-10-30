import axios from "axios";
import { GraphQLError } from "graphql";
import { ContextProps } from "../../../../index.js";
import { Currency, ICurrency } from "../../model/currency.model.js";
import { Interest } from "../../../Interest/model/Interest.model.js";
import { formatUnixDate } from "../../../../utils/formatTimestamp/index.js";
import { CurrencyMemoryRepository } from "../../repositories/currency.implementation.repository.js";

type CurrencyRequest = {
  data: {
    from: string;
    to?: string
  };
};

export const createFreeCurrency = async (_, {data}: CurrencyRequest, ctx: ContextProps) => {
  try {
    const res = await axios.get(
      `https://economia.awesomeapi.com.br/json/last/${data.from}-${data.to || "BRL"}`
    );
    const key: string[] = Object.keys(res.data);
    const currencyData: ICurrency =  {
      ...res.data[key[0]],
      queryDate: res.data[key[0]].create_date,
      userId: "",
    };
    currencyData.timestamp = formatUnixDate(+currencyData.timestamp)
    const currency: Currency = Currency.create(currencyData)
    return currency;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
