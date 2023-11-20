import { randomUUID } from "node:crypto";
export class Currency {
    constructor(data) {
        this.code = data.symbol;
        this.id = randomUUID();
        this.from = data.from;
        this.to = data.to;
        this.high = data.highPrice;
        this.low = data.lowPrice;
        this.create_date = new Date().toDateString();
        this.userId = data.userId || "";
        this.buy = data.bidPrice;
        this.sell = data.askPrice;
        this.lastPrice = data.lastPrice;
        this.varPrice = data.priceChangePercent;
    }
    static create(data) {
        const currency = new Currency(data);
        return currency;
    }
}
