import validateSQLInjection from "../../../utils/validateSQLInjection/index.js";
import { IUser } from "./user.model.js";



export function validateUserInfo({email,password,username}: IUser){
    validateSQLInjection([email,password,username])
    if(!username){
        throw new Error("Ops, ficou faltando o username")
    }
    if(username.length <= 3){
        throw new Error("Seu username precisa ter mais que 3 caracteres")
    }
    if(!email){
        throw new Error("Ops, ficou faltando o email")
    }
    if(email.length < 4){
        throw new Error("Ops, preciso de um email valido")
    }
    if(email.includes("@") === false){
        throw new Error("Ops, preciso de um email valido")
    }
    if(!password){
        throw new Error("Ops, ficou faltando sua senha")
    }
    if(password.length < 6){
        throw new Error("Sua senha precisa ter pelo menos 6 caracteres")
    }
}