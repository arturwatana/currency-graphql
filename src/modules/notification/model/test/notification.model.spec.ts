import {describe, expect, it} from '@jest/globals'
import { INotification, Notification } from '../notification.model'
import { randomUUID } from "node:crypto";
describe("Notification Unit Tests", ()=> {
    it("Should be able to create a new User", ()=>{
        const notificationMock: INotification = {
        name: "USD/BRL",
        description: "Olá, sua conversao atingiu o valor target",
        userId: randomUUID(),
        type: "buy"
        }

        const notification = Notification.create(notificationMock)
        expect(notification).toBeInstanceOf(Notification)
    })

})



