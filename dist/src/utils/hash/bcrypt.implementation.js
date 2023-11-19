import bcrypt from "bcrypt";
export class PasswordBcryptHash {
    async hash(userPassword) {
        const passwordHashed = await bcrypt.hash(userPassword, 10);
        return passwordHashed;
    }
    async compare(passwordToCompare, userPassword) {
        const passwordAreEqual = await bcrypt.compareSync(passwordToCompare, userPassword);
        return passwordAreEqual;
    }
}
