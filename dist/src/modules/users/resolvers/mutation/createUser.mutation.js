import { User } from "../../model/user.model";
export const createUser = async (_, { data }, ctx) => {
    const user = User.create(data);
    const userAlreadyExists = await ctx.BaseContext.usersRepository.getUserByEmail(user.email);
    if (userAlreadyExists) {
        throw new Error("Email já cadastrado");
    }
    user.password = await ctx.BaseContext.passwordHash.hash(data.password);
    await ctx.BaseContext.usersRepository.save(user);
    return user;
};
