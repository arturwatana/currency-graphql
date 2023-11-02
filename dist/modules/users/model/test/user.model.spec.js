// import {describe, test, expect } from "vitest";
// import { IUser, User } from "../user.model";
// describe("User Unit Tests", ()=> {
//     test("Should be able to create a new User", ()=>{
//         const userMock: IUser = {
//             fullName: "Artur Test",
//             password: "123456",
//             email: "artur@test.com"
//         }
//         const user = User.create(userMock)
//         expect(user).toBeInstanceOf(User)
//     })
//     test("Should not be able to create a new User without a name", ()=>{
//         expect(()=>{
//             const userMock: IUser = {
//                 fullName: "",
//                 password: "123456",
//                 email: "artur@test.com"
//             }
//             const user = User.create(userMock)
//         }).toThrow("Ops, ficou faltando o seu nome")
//     })
//     test("Should not be able to create a new User if name length is less than 3 characters", ()=>{
//         expect(()=>{
//             const userMock: IUser = {
//                 fullName: "Ar",
//                 password: "123456",
//                 email: "artur@test.com"
//             }
//             const user = User.create(userMock)
//         }).toThrow("Seu nome precisa ter mais que 2 caracteres")
//     })
//     test("Should not be able to create a new User without a email", ()=>{
//         expect(()=>{
//             const userMock: IUser = {
//                 fullName: "Artur W",
//                 password: "123456",
//                 email: ""
//             }
//             const user = User.create(userMock)
//         }).toThrow("Ops, ficou faltando o email")
//     })
//     test("Should not be able to create a new User if name length is less than 4 characters", ()=>{
//         expect(()=>{
//             const userMock: IUser = {
//                 fullName: "Artur",
//                 password: "123456",
//                 email: "r@t"
//             }
//             const user = User.create(userMock)
//         }).toThrow("Ops, preciso de um email valido")
//     })
//     test("Should not be able to create a new User if email doest not have a @", ()=>{
//         expect(()=>{
//             const userMock: IUser = {
//                 fullName: "Artur",
//                 password: "123456",
//                 email: "arturwata"
//             }
//             const user = User.create(userMock)
//         }).toThrow("Ops, preciso de um email valido")
//     })
//     test("Should not be able to create a new User without a password", ()=>{
//         expect(()=>{
//             const userMock: IUser = {
//                 fullName: "Artur W",
//                 password: "",
//                 email: "artur@test.com"
//             }
//             const user = User.create(userMock)
//         }).toThrow("Ops, ficou faltando sua senha")
//     })
//     test("Should not be able to create a new User if name length is less than 4 characters", ()=>{
//         expect(()=>{
//             const userMock: IUser = {
//                 fullName: "Artur",
//                 password: "12345",
//                 email: "artur@test.com"
//             }
//             const user = User.create(userMock)
//         }).toThrow("Sua senha precisa ter pelo menos 6 caracteres")
//     })
// })
