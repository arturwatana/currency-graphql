import { UserMongo } from "../model/user.schema.js";
export class UserMongooseRepository {
    async save(data) {
        const user = await UserMongo.create({
            email: data.email,
            id: data.id,
            password: data.password,
            username: data.username,
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
    async getUserByUsername(username) {
        const user = await UserMongo.findOne({
            username,
        });
        return user || null;
    }
    async updateUserSearches(user) {
        await UserMongo.updateOne({
            id: user.id,
        }, { searches: user.searches });
        const updatedUser = this.getUserByUsername(user.username);
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
        const updatedUser = await this.getUserByUsername(user.username);
        return updatedUser;
    }
    async updateUserInterests(user, interest) {
        const interestAlreadyExists = user.interests.find(savedInterest => savedInterest.name === interest.name);
        if (interestAlreadyExists) {
            if (interestAlreadyExists.targetValue != interest.targetValue) {
                const interestIndex = user.interests.findIndex(savedInterest => savedInterest.name === interestAlreadyExists.name);
                user.interests[interestIndex].targetValue = interest.targetValue;
            }
        }
        else {
            user.interests.push(interest);
        }
        await UserMongo.updateOne({
            id: user.id,
        }, { interests: user.interests });
        const updatedUser = await this.getUserByUsername(user.username);
        return updatedUser;
    }
    async updateInterestTargetValue(username, interestName, targetValue) {
        const user = await this.getUserByUsername(username);
        const interestIndex = user.interests.findIndex(interest => interest.name.toLowerCase() === interestName.toLowerCase());
        user.interests[interestIndex].targetValue = targetValue;
        await UserMongo.updateOne({
            id: user.id,
        }, { interests: user.interests });
        const updatedUser = await this.getUserByUsername(user.username);
        return updatedUser.interests[interestIndex];
    }
    async getUserInterests(user) {
        const updatedUser = await this.getUserByUsername(user.username);
        return updatedUser.interests;
    }
}
