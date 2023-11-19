import { describe, expect, it } from '@jest/globals';
import { Notification } from '../notification.model';
import { randomUUID } from "node:crypto";
describe("Notification Unit Tests", () => {
    it("Should be able to create a new User", () => {
        const notificationMock = {
            name: "USD/BRL",
            description: "Olá, sua conversao atingiu o valor target",
            userId: randomUUID(),
            type: "buy"
        };
        const notification = Notification.create(notificationMock);
        expect(notification).toBeInstanceOf(Notification);
    });
});
