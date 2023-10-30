import { randomUUID } from "node:crypto";
export class Currency {
    constructor(data) {
        this.code = data.code;
        this.id = randomUUID();
        this.from = data.code;
        this.to = data.codein;
        this.name = data.name;
        this.high = data.high;
        this.low = data.low;
        this.create_date = new Date().toDateString();
        this.userId = data.userId || "";
        this.queryDate = data.queryDate;
        this.timestamp = data.timestamp;
    }
    static create(data) {
        const currency = new Currency(data);
        return currency;
    }
}
