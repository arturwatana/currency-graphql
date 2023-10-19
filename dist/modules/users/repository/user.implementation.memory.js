export class UserMemoryRepository {
    constructor() {
        this.items = [];
    }
    getUserInterests(user) {
        throw new Error("Method not implemented.");
    }
    updateInterestTargetValue(userId, interestName, targetValue) {
        throw new Error("Method not implemented.");
    }
    updateUserInterests(user, interest) {
        throw new Error("Method not implemented.");
    }
    deleteCurrency(userId, currencyId) {
        throw new Error("Method not implemented.");
    }
    updateUserSearches(user) {
        throw new Error("Method not implemented.");
    }
    getUserByUsername(username) {
        throw new Error("Method not implemented.");
    }
    getUserByToken(token) {
        throw new Error("Method not implemented.");
    }
    async save(data) {
        this.items.push(data);
        return data;
    }
    async showAll() {
        return this.items;
    }
}
