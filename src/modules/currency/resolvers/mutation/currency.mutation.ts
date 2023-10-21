import axios from "axios";
import { GraphQLError } from "graphql";
import { CurrencyType } from "../../model/currencyType.model.js";
import {randomUUID} from "node:crypto"
import { ContextProps } from "../../../../index.js";
import { Currency, ICurrency } from "../../model/currency.model.js";
import { Interest } from "../../../Interest/model/Interest.model.js";

type CurrencyRequest = {
  data: {
    name: string;
  };
};

export const createCurrency = async (_, data: CurrencyRequest, ctx: ContextProps) => {
  if (!ctx.user)
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  try {
    const res = await axios.get(
      `https://economia.awesomeapi.com.br/json/last/${data.data.name}`
    );
    const key: string[] = Object.keys(res.data);
    const user = ctx.user;
    const currencyData: ICurrency =  {
      ...res.data[key[0]],
      queryDate: res.data[key[0]].create_date,
      userId: user.id,
    };
    const currency: Currency = Currency.create(currencyData)
    const currencyAlredyInInterests = user.interests.find(interest => interest.name === currency.code)
    if(!currencyAlredyInInterests){
       const interest = Interest.create({
        name: currency.code
       })
       await ctx.BaseContext.usersRepository.updateUserInterests(user, interest)
    }
    user.searches.push(currency);
    await ctx.BaseContext.usersRepository.updateUserSearches(user)
    return currency;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
