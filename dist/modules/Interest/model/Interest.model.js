import { randomUUID } from "node:crypto";
export class Interest {
    constructor(data) {
        this.id = randomUUID();
        this.from = data.from;
        this.to = data.to || "BRL";
        this.targetValue = data.targetValue || 0;
        this.reached = false;
        this.createdAt = new Date();
    }
    static create(data) {
        const interest = new Interest(data);
        return interest;
    }
}
