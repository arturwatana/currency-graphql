export class Interest {
    constructor(data) {
        this.from = data.from;
        this.to = data.to || "BRL";
        this.targetValue = data.targetValue || 0;
        this.createdAt = new Date();
    }
    static create(data) {
        const interest = new Interest(data);
        return interest;
    }
}
