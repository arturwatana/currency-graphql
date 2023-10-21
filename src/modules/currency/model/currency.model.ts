import { randomUUID } from "node:crypto";

export type ICurrency = {
  code: string;
  name: string;
  high: string;
  low: string;
  userId: string;
  queryDate: Date;
  timestamp: Date
}

export class Currency {
  id: string;
  code: string;
  name: string;
  high: string;
  low: string;
  create_date: string;
  userId: string;
  queryDate: Date;
  timestamp: Date

  private constructor(data: ICurrency) {
    if (!data.userId) {
      throw new Error("Ops, user not found");
    }
    this.id = randomUUID();
    this.code = data.code;
    this.name = data.name;
    this.high = data.high;
    this.low = data.low;
    this.create_date = new Date().toDateString()
    this.userId = data.userId;
    this.queryDate = data.queryDate;
    this.timestamp = data.timestamp
  }

  static create(data: ICurrency): Currency {
    const currency = new Currency(data);
    return currency;
  }
}