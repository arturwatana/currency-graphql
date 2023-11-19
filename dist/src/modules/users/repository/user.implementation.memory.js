export class UserMemoryRepository {
    constructor() {
        this.items = [];
    }
    deleteALL() {
        throw new Error("Method not implemented.");
    }
    deleteUserExpiredNotifications(notifications) {
        throw new Error("Method not implemented.");
    }
    getUserByToken(token) {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email) {
        throw new Error("Method not implemented.");
    }
    updateUserSearches(user) {
        throw new Error("Method not implemented.");
    }
    updateUserInterests(user, interest) {
        throw new Error("Method not implemented.");
    }
    updateUserNotifications(userId, notification) {
        throw new Error("Method not implemented.");
    }
    updateInterestTargetValue(userId, interest) {
        throw new Error("Method not implemented.");
    }
    deleteCurrency(email, currencyId) {
        throw new Error("Method not implemented.");
    }
    deleteInterest(email, interestName) {
        throw new Error("Method not implemented.");
    }
    getUserInterests(user) {
        throw new Error("Method not implemented.");
    }
    getUsersTargets() {
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
