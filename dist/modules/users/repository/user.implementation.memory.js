export class UserMemoryRepository {
    constructor() {
        this.items = [];
    }
    deleteCurrency(userId, currencyId) {
        throw new Error("Method not implemented.");
    }
    updateUser(user) {
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
