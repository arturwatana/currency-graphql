import { IHashPassword } from "./hash.interface";
import bcrypt from "bcrypt";



export class PasswordBcryptHash implements IHashPassword{
    async hash(userPassword: string): Promise<string> {
       const passwordHashed = await bcrypt.hash(userPassword, 10);
       return passwordHashed
    }
    async compare(passwordToCompare: string, userPassword: string): Promise<boolean> {
        const passwordAreEqual = await bcrypt.compareSync(
            passwordToCompare,
            userPassword
          );

          
          return passwordAreEqual
    }

}