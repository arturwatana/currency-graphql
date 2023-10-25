
import { randomUUID } from "node:crypto";

export interface INotification {
    name: string
    description: string
    userId: string
}

export class Notification{
    name: string
    description: string
    userId: string
    read: boolean
    createAt: Date

    private constructor({description,name, userId}: INotification){
        this.name = name
        this.description = description
        this.read = false
        this.userId = userId
        this.createAt = new Date()
    }

    static create(data: INotification): Notification {
        const notification = new Notification(data);
        return notification;
      }
}