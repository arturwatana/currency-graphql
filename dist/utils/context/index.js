import { usersRepository } from "../../modules/users/repository/index.js";
import { authService } from "../auth/authService.js";
export async function getTokenAndSetUser(token) {
    const tokenWithoutBearer = await authService.extractTokenFromHeader(token);
    const tokenIsValid = authService.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    if (!tokenIsValid) {
        return null;
    }
    const user = await usersRepository.getUserByUsername(tokenIsValid);
    if (user)
        return user || null;
}
