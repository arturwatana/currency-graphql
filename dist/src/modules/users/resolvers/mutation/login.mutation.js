import { authService } from "../../../../utils/auth/authService";
import { passwordHash } from "../../../../utils/hash/index";
export const login = async (_, { data }, ctx) => {
    const user = await ctx.BaseContext.usersRepository.getUserByEmail(data.email.toLowerCase());
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
        email: user.email,
        token,
    };
};
