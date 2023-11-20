import axios from "axios";
import { Currency } from "../../model/currency.model.js";
export const createFreeCurrency = async (_, { data }, ctx) => {
    try {
        const res = await axios.get(`${process.env.BINANCE_CURRENCY_URL}${data.from}${data.to}`);
        const currencyData = {
            ...res.data,
            to: data.to,
            from: data.from,
        };
        const currency = Currency.create(currencyData);
        return currency;
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
};
