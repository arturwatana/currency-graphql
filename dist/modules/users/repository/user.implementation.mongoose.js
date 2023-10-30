import { UserMongo } from "../model/user.schema.js";
export class UserMongooseRepository {
    async deleteInterest(email, interestName) {
        const user = await this.getUserByEmail(email);
        const interestFrom = interestName.split("-")[0];
        const interestTo = interestName.split("-")[1];
        const userInterestsWithouDeletedInterest = user.interests.filter(interest => {
            if (interest.from === interestFrom && interest.to === interestTo) {
                return;
            }
            return interest;
        });
        await UserMongo.updateOne({
            id: user.id,
        }, { interests: userInterestsWithouDeletedInterest });
        const updatedUser = await this.getUserByEmail(email);
        return updatedUser;
    }
    async save(data) {
        const user = await UserMongo.create({
            email: data.email,
            id: data.id,
            password: data.password,
            fullName: data.fullName,
            searches: data.searches,
            createdAt: data.createdAt,
            interests: data.interests
        });
        return user;
    }
    async showAll() {
        return await UserMongo.find();
    }
    async getUserByToken(token) {
        const user = await UserMongo.findOne({
            id: token,
        });
        return user;
    }
    async getUserByEmail(email) {
        const user = await UserMongo.findOne({
            email,
        });
        return user || null;
    }
    async updateUserSearches(user) {
        await UserMongo.updateOne({
            id: user.id,
        }, { searches: user.searches });
        const updatedUser = this.getUserByEmail(user.email);
        return updatedUser;
    }
    async deleteCurrency(currencyId, userId) {
        const user = await UserMongo.findOne({
            id: userId
        });
        if (!user) {
            return null;
        }
        const currency = user.searches.find(currency => currency.id === currencyId);
        if (!currency) {
            throw new Error("Ops, currency nao encontrada");
        }
        const currenciesWithoutDeletedCurrency = user.searches.filter(currency => {
            if (currency === currencyId)
                return;
            return currency;
        });
        await UserMongo.updateOne({
            id: userId
        }, {
            searches: currenciesWithoutDeletedCurrency
        });
        const updatedUser = await this.getUserByEmail(user.email);
        return updatedUser;
    }
    async updateUserInterests(user, interest) {
        user.interests.push(interest);
        await UserMongo.updateOne({
            id: user.id,
        }, { interests: user.interests });
        const updatedUser = await this.getUserByEmail(user.email);
        return updatedUser;
    }
    async updateInterestTargetValue(email, { from, to }, targetValue) {
        const user = await this.getUserByEmail(email);
        const interestIndex = user.interests.findIndex(interest => {
            if (interest.from.toLowerCase() === from.toLowerCase() && interest.to.toLowerCase() === to.toLowerCase()) {
                return interest;
            }
            return;
        });
        user.interests[interestIndex].targetValue = targetValue;
        await UserMongo.updateOne({
            id: user.id,
        }, { interests: user.interests });
        const updatedUser = await this.getUserByEmail(user.email);
        return updatedUser.interests[interestIndex];
    }
    async getUserInterests(user) {
        const updatedUser = await this.getUserByEmail(user.email);
        return updatedUser.interests;
    }
    async getUsersTargets() {
        const users = await UserMongo.find();
        const userInterests = users.map(user => {
            return {
                userId: user.id,
                interests: user.interests
            };
        });
        return userInterests;
    }
    async updateUserNotifications(userId, notification) {
        const user = await UserMongo.findOne({
            id: userId
        });
        const notificationAlreadyExists = user.notifications.find(notify => notify.name === notification.name);
        if (notificationAlreadyExists) {
            return notificationAlreadyExists;
        }
        user.notifications.push(notification);
        await UserMongo.updateOne({
            id: user.id,
        }, { notifications: user.notifications });
        const updatedUser = await this.getUserByEmail(user.email);
        const notificationUpdated = updatedUser.notifications.find(notify => notify.name === notification.name);
        return notificationUpdated;
    }
}
