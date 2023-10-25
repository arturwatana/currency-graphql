export class Notification {
    constructor({ description, name, userId }) {
        this.name = name;
        this.description = description;
        this.read = false;
        this.userId = userId;
        this.createAt = new Date();
    }
    static create(data) {
        const notification = new Notification(data);
        return notification;
    }
}
