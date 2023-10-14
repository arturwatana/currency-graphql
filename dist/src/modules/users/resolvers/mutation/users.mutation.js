import { User } from "../../model/user.model.js";
import { usersRepository } from "../../../users/repository/index.js";
export const createUser = async (_, { data }, ctx) => {
    const user = User.create(data);
    user.password = await ctx.BaseContext.passwordHash.hash(data.password);
    await usersRepository.save(user);
    return user;
};
