

// import {describe, test, expect } from "vitest";
// import { IInterest, Interest } from "./Interest.model";

// describe("User Unit Tests", ()=> {
//     test("Should be able to create a new Interest", ()=>{
//         const interestMock: IInterest = {
//             from: "USD",
//             to: "BRL",
//             targetValue: {
//                 buy: 8,
//             },
//         }
//         const interest = Interest.create(interestMock)
//         expect(interest).toBeInstanceOf(Interest)
//     })
//     test("Should not be able to create a new Interest without a target value", ()=>{
//         expect(()=>{
//             const interestMock: IInterest = {
//                 from: "USD",
//                 to: "BRL",
//                 targetValue: {
//                     buy: 0,
//                     sell: 0
//                 },
//             }
//             const interest = Interest.create(interestMock)

//         }).toThrow("Ops, precisamos de um valor valido")
//     })
  
//     test("Should not be able to create a new Interest if target value is a negative value", ()=>{
//         expect(()=>{
//             const interestMock: IInterest = {
//                 from: "USD",
//                 to: "BRL",
//                 targetValue: {
//                     buy: -1,
//                     sell: 0
//                 },
//             }
//             const interest = Interest.create(interestMock)

//         }).toThrow("Ops, precisamos de um valor valido")
//     })
  
// })
