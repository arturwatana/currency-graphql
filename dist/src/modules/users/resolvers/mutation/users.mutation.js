import { User } from "../../model/user.model.js";
export const createUser = async (_, { data }, ctx) => {
    const user = User.create(data);
    user.password = await ctx.BaseContext.passwordHash.hash(data.password);
    await ctx.BaseContext.userRepository.save(user);
    return user;
};
