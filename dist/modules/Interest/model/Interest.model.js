import { randomUUID } from "node:crypto";
export class Interest {
    constructor(data) {
        if (data.targetValue.buy === 0 && data.targetValue.sell === 0) {
            throw new Error("Ops, precisamos de um valor valido");
        }
        if (data.targetValue.buy < 0 || data.targetValue.sell < 0) {
            throw new Error("Ops, precisamos de um valor valido");
        }
        this.id = randomUUID();
        this.from = data.from;
        this.to = data.to || "BRL";
        this.targetValue = data.targetValue || { buy: data.targetValue.buy != 0 ? data.targetValue.buy : 0, sell: data.targetValue.sell != 0 ? data.targetValue.sell : 0 };
        this.createdAt = new Date();
        this.reached = {
            buy: false,
            sell: false
        };
        this.favorite = false;
    }
    static create(data) {
        const interest = new Interest(data);
        return interest;
    }
}
