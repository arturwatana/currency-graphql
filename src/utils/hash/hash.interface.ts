


export interface IHashPassword {
    hash(userPassword: string): Promise<string>
    compare(passwordToCompare: string, userPassword: string): Promise<boolean>
}