import axios from "axios";
import { Currency } from "../../model/currency.model.js";
import { formatUnixDate } from "../../../../utils/formatTimestamp/index.js";
export const createFreeCurrency = async (_, { data }, ctx) => {
    try {
        const res = await axios.get(`https://economia.awesomeapi.com.br/json/last/${data.from}-${data.to || "BRL"}`);
        const key = Object.keys(res.data);
        const currencyData = {
            ...res.data[key[0]],
            queryDate: res.data[key[0]].create_date,
            userId: "",
        };
        currencyData.timestamp = formatUnixDate(+currencyData.timestamp);
        const currency = Currency.create(currencyData);
        return currency;
    }
    catch (err) {
        throw new Error(err.response.data.message);
    }
};
