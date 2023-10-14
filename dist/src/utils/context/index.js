import { usersRepository } from "../../modules/users/repository/index.js";
import { authService } from "../auth";
export async function getTokenAndSetUser(token) {
    console.log(token);
    const tokenWithoutBearer = await authService.extractTokenFromHeader(token);
    const tokenIsValid = authService.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    const user = await usersRepository.getUserByUsername(tokenIsValid);
    if (user)
        return user || null;
}
