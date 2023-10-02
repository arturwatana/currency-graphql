import { UserMongo } from "../model/user.schema.js";
export class UserMongooseRepository {
    async save(data) {
        const user = await UserMongo.create({
            email: data.email,
            id: data.id,
            password: data.password,
            username: data.username,
            searches: data.searches,
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
    async updateUser(user) {
        await UserMongo.updateOne({
            id: user.id,
        }, { searches: user.searches });
        const updatedUser = this.getUserByUsername(user.username);
        return updatedUser;
    }
}
