import {describe, expect, it} from '@jest/globals'
import {randomUUID} from "node:crypto"
import { Currency, ICurrency } from '../currency.model'

describe("Currency Unit Tests", ()=> {
    it("Should be able to create a new Currency", ()=>{
        const currencyMock: ICurrency = {
            name: "Test",
            ask: "1.23",
            bid: "1.3",
            code: "USD",
            codein: "BRL",
            high: "2",
            low: "4",
            queryDate: new Date(),
            timestamp: new Date(),
            userId: randomUUID()
        }
        const currency = Currency.create(currencyMock)
        expect(currency).toBeInstanceOf(Currency)
    })
    it("Should be able to create a new Currency without userId", ()=>{
        const currencyMock: ICurrency = {
            name: "Test",
            ask: "1.23",
            bid: "1.3",
            code: "USD",
            codein: "BRL",
            high: "2",
            low: "4",
            queryDate: new Date(),
            timestamp: new Date(),
        }
        const currency = Currency.create(currencyMock)
        expect(currency).toBeInstanceOf(Currency)
    })
   
})



