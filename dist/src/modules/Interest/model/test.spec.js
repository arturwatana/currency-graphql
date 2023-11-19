import { describe, it, expect } from "@jest/globals";
import { Interest } from "./Interest.model";
describe("User Unit Tests", () => {
    it("Should be able to create a new Interest", () => {
        const interestMock = {
            from: "USD",
            to: "BRL",
            targetValue: {
                buy: 8,
            },
        };
        const interest = Interest.create(interestMock);
        expect(interest).toBeInstanceOf(Interest);
    });
    it("Should not be able to create a new Interest without a target value", () => {
        expect(() => {
            const interestMock = {
                from: "USD",
                to: "BRL",
                targetValue: {
                    buy: 0,
                    sell: 0
                },
            };
            const interest = Interest.create(interestMock);
        }).toThrow("Ops, precisamos de um valor valido");
    });
    it("Should not be able to create a new Interest if target value is a negative value", () => {
        expect(() => {
            const interestMock = {
                from: "USD",
                to: "BRL",
                targetValue: {
                    buy: -1,
                    sell: 0
                },
            };
            const interest = Interest.create(interestMock);
        }).toThrow("Ops, precisamos de um valor valido");
    });
});
