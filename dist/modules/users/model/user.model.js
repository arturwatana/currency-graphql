import { randomUUID } from "node:crypto";
import { validateUserInfo } from "./validateUserInfo.js";
export class User {
    constructor({ email, username, password }) {
        if (!email || !username || !password) {
            throw new Error("Ops, faltaram informacoes");
        }
        validateUserInfo({ email, username, password });
        this.id = randomUUID();
        this.username = username.toLowerCase();
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
