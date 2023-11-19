export class Notification {
    constructor({ description, name, userId, type }) {
        this.name = name;
        this.description = description;
        this.read = false;
        this.userId = userId;
        this.type = type;
        this.createAt = new Date();
    }
    static create(data) {
        const notification = new Notification(data);
        return notification;
    }
}
