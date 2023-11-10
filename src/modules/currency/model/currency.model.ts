import { randomUUID } from "node:crypto";

export type ICurrency = {
  code: string;
  codein: string
  name: string;
  high: string;
  bid: string
  ask: string
  low: string;
  userId: string;
  queryDate: Date;
  timestamp: Date
}

export class Currency {
  id: string;
  from: string;
  code: string
  to: string
  name: string;
  high: string;
  low: string;
  create_date: string;
  userId?: string;
  queryDate: Date;
  timestamp: Date
  buy: string
  sell: string

  private constructor(data: ICurrency) {
    this.code = data.code
    this.id = randomUUID()
    this.from = data.code
    this.to = data.codein
    this.name = data.name
    this.high = data.high
    this.low = data.low
    this.create_date = new Date().toDateString()
    this.userId = data.userId || ""
    this.queryDate = data.queryDate
    this.timestamp = data.timestamp
    this.buy = data.bid
    this.sell = data.ask
  }

  static create(data: ICurrency): Currency {
    const currency = new Currency(data);
    return currency;
  }
}