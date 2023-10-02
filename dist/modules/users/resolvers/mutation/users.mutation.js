import { usersRepository } from "../../../../index.js";
import { User } from "../../model/user.model.js";
import bcrypt from "bcrypt";
export const createUser = async (_, { data }) => {
    const user = User.create(data);
    user.password = await bcrypt.hash(user.password, 10);
    await usersRepository.save(user);
    return user;
};
