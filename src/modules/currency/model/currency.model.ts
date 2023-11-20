import { randomUUID } from "node:crypto";

export type ICurrency = {
  symbol: string;
  priceChangePercent: string
  lastPrice: string;
  bidPrice: string;
  askPrice: string
  highPrice: string
  lowPrice: string;
  userId?: string;
  to: string
  from: string
}

export class Currency {
  id: string;
  from: string;
  code: string
  to: string
  varPrice: string
  high: string;
  low: string;
  create_date: string;
  userId?: string;
  buy: string
  sell: string
  lastPrice: string

  private constructor(data: ICurrency) {
    this.code = data.symbol
    this.id = randomUUID()
    this.from = data.from
    this.to = data.to
    this.high = data.highPrice
    this.low = data.lowPrice
    this.create_date = new Date().toDateString()
    this.userId = data.userId || ""
    this.buy = data.bidPrice
    this.sell = data.askPrice
    this.lastPrice = data.lastPrice
    this.varPrice = data.priceChangePercent
  }

  static create(data: ICurrency): Currency {
    const currency = new Currency(data);
    return currency;
  }
}