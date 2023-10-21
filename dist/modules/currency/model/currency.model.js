import { randomUUID } from "node:crypto";
export class Currency {
    constructor(data) {
        if (!data.userId) {
            throw new Error("Ops, user not found");
        }
        this.id = randomUUID();
        this.code = data.code;
        this.name = data.name;
        this.high = data.high;
        this.low = data.low;
        this.create_date = new Date().toDateString();
        this.userId = data.userId;
        this.queryDate = data.queryDate;
        this.timestamp = data.timestamp;
    }
    static create(data) {
        const currency = new Currency(data);
        return currency;
    }
}
