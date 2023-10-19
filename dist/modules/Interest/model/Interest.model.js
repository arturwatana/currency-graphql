export class Interest {
    constructor(data) {
        this.name = data.name;
        this.targetValue = data.targetValue || 0;
        this.createdAt = new Date();
    }
    static create(data) {
        const interest = new Interest(data);
        return interest;
    }
}
