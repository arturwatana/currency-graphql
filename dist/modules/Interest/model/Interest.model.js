import { randomUUID } from "node:crypto";
export class Interest {
    constructor(data) {
        this.id = randomUUID();
        this.from = data.from;
        this.to = data.to || "BRL";
        this.targetValue = data.targetValue || { buy: 0, sell: 0 };
        this.createdAt = new Date();
        this.favorite = false;
        this.notifyAttempts = 0;
    }
    static create(data) {
        const interest = new Interest(data);
        return interest;
    }
}
