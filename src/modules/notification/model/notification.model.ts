
import { randomUUID } from "node:crypto";

export interface INotification {
    name: string
    description: string
    userId: string
    type: "buy" | "sell"
}

export class Notification{
    name: string
    description: string
    userId: string
    read: boolean
    type: "buy" | "sell"
    createAt: Date

    private constructor({description,name, userId, type}: INotification){
        this.name = name
        this.description = description
        this.read = false
        this.userId = userId
        this.type = type
        this.createAt = new Date()
    }

    static create(data: INotification): Notification {
        const notification = new Notification(data);
        return notification;
      }
}