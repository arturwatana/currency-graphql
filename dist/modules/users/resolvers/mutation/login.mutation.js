import { authService } from "../../../../utils/auth/authService.js";
import { passwordHash } from "../../../../utils/hash/index.js";
export const login = async (_, { data }, ctx) => {
    const user = await ctx.BaseContext.usersRepository.getUserByUsername(data.username);
    if (!user) {
        throw new Error("Usuário ou senha incorretos");
    }
    const passwordAreEqual = await passwordHash.compare(data.password, user.password);
    if (!passwordAreEqual) {
        throw new Error("Usuário ou senha incorretos");
    }
    const token = authService.sign(user);
    return {
        id: user.id,
        username: user.username,
        token,
    };
};
