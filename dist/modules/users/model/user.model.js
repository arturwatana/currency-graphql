import { randomUUID } from "node:crypto";
import { validateUserInfo } from "./validateUserInfo.js";
export class User {
    constructor({ email, fullName, password }) {
        validateUserInfo({ email, fullName, password });
        this.id = randomUUID();
        this.fullName = fullName;
        this.email = email.toLowerCase();
        this.createdAt = new Date();
        this.password = password;
        this.searches = [];
        this.interests = [];
        this.notifications = [];
    }
    static create(data) {
        const user = new User(data);
        return user;
    }
}
