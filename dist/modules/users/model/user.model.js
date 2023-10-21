import { randomUUID } from "node:crypto";
export class User {
    constructor({ email, username, password }) {
        if (!email || !username || !password) {
            throw new Error("Ops, faltaram informacoes");
        }
        this.id = randomUUID();
        this.username = username.toLowerCase();
        this.email = email.toLowerCase();
        this.createdAt = new Date();
        this.password = password;
        this.searches = [];
        this.interests = [];
    }
    static create(data) {
        const user = new User(data);
        return user;
    }
}
