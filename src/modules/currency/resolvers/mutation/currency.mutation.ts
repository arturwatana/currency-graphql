import axios from "axios";
import { searchesRepository } from "../../../../index.js";

type CurrencyRequest = {
  name: string;
};

export const createCurrency = async (_, { name }: CurrencyRequest) => {
  try {
    const res = await axios.get(
      `https://economia.awesomeapi.com.br/json/last/${name}`
    );
    const key: string[] = Object.keys(res.data);
    const currency = res.data[key[0]];
    searchesRepository.save(currency);
    return currency;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
