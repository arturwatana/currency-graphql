import axios from "axios";
import { ContextProps } from "../../../../index.js";
import { Currency, ICurrency } from "../../model/currency.model.js";

type CurrencyRequest = {
  data: {
    from: string;
    to?: string
  };
};

export const createFreeCurrency = async (_, {data}: CurrencyRequest, ctx: ContextProps) => {
  try {
    const res = await axios.get(
      `${process.env.BINANCE_CURRENCY_URL}${data.from}${data.to}`
    );
      const currencyData: ICurrency =  {
        ...res.data,
        to: data.to,
        from: data.from,
      };
      const currency: Currency = Currency.create(currencyData)
      return currency;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
